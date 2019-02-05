// librerias de angular
import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
// Servicio que provee datos desde la API
import { DatosService } from '../_servicios/datos.service';
// Modelos
import { Legajo } from '../_Modelos/legajo';
import { TipoDoc } from '../_Modelos/TipoDoc';
import {Documento} from '../_Modelos/Documento';


@Injectable({
  providedIn: 'root'
})

export class LegajoService {

  public listaTitulos: String[];
  public titulos: String[];
  public campos;
  private tipoDoc;
  public legajo;
   private doc;
   private rubroNombre: string;
  public instancia;
  public edicion: boolean;
  public formulario: number;
  public listaVisible: boolean;
  public documentoVisible: boolean;
  public archivosVisible: boolean;
  public matafuegosVisible: boolean;


  // el servicio emite un evento  con nombre EtipoDoc cada vez que cambia tipoDoc
  // lo utiliza el form el modulo de legajos para cargar el formulario (se puede revisar)
   @Output() EtipoDoc: EventEmitter<TipoDoc> = new EventEmitter();

  constructor(private datosService: DatosService, private mensajesService: ToastrService ) {
    this.legajo = new Legajo();
    this.instancia = new Documento();
   // this.edicion = false;
 //  this.habilitaPaneles('Lista');
  }

    getEdificioId(): number {return this.datosService.edificioId; }

   getLegajo() {

    this.datosService.getDatos('LegajoRubros', undefined).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        this.legajo = JSON.parse(ped).Datos;
      } else  {
        this.mensajesService.error('Error al obtener Legajo : ' + JSON.parse(ped).Status[0].Msg);
      }
    },
    error => this.mensajesService.error('oops', error));
   }



    habilitaPaneles(panel: string) {
      this.listaVisible = false;
      this.documentoVisible  = false;
      this.archivosVisible = false;
      this.matafuegosVisible = false;

      switch (panel) {
        case  'Lista': {  this.listaVisible = true; }
        break;
        case  'Documento': {  this.documentoVisible = true; }
        break;
        case  'Matafuegos': {  this.matafuegosVisible = true; }
        break;
      }

    }
    resetlegajo(rollback: boolean) {
      if (rollback) {
        this.instancia = this.doc;

      } else {
        this.instancia = new Documento();
        this.instancia.LegajoId = this.tipoDoc.LegajoId;
        this.instancia.TipoDoc = this.tipoDoc.TipoDocDefinicion[0].TipoDoc;
        this.instancia.RubroId = this.tipoDoc.RubroId;

      }

    }

    grabaArchivo(datos: any, opcion: string) {
    return  this.datosService.grabaDatos('LegajoArchivo', opcion, 'LegajoActualizacion', 1, datos);
    }

    grabaCabecera(datos: any, opcion: string) {
      this.datosService.grabaDatos('Legajo', opcion, 'Legajo', 1, datos).subscribe(
        res => {
          if (JSON.parse(res).Status[0].Status  === 0) {
            this.getDocumentos('Lista');
            switch (opcion) {
              case 'Grababaja':
                this.mensajesService.success('documento ha sido eliminado eliminado');
              break;
              default: this.mensajesService.success('Cabecera de Documento ha sido guardada ');
            }
            this.habilitaPaneles('Lista');
          } else {
            this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Cabecera de Documento');
          }
         },
         error => { this.mensajesService.error(error); } );
      }

    setDatosTipoDoc(tipoDoc: TipoDoc, rubroNombre: string) {
      this.tipoDoc = tipoDoc;
      this.formulario = tipoDoc.TipoDocDefinicion[0].Form;
      this.rubroNombre = rubroNombre;
      this.getDocumentos('Lista');

     }

    getDocumentos(panel: string) {
      let titulos;
      const columnas = [20, 21, 22, 25, 32, 33, 34, 35];
      const Datos = [{'LegajoId': this.tipoDoc.LegajoId,
      'EdificioId': this.tipoDoc.EdificioId,
      'RubroId': this.tipoDoc.RubroId,
      'TipoDoc': this.tipoDoc.TipoDocDefinicion[0].TipoDoc }];
      this.datosService.getDatos('LegajoRubrosTipoDoc', Datos ).subscribe( ped => {
        if (JSON.parse(ped).Status[0].Status  === 0) {
          this.tipoDoc = JSON.parse(ped).Datos;
          this.EtipoDoc.emit(this.tipoDoc);
          titulos = this.datosService.getTitulos( JSON.parse(ped).Titulos, columnas);
          this.titulos = titulos.titulos;
          this.campos = titulos.campos;
          this.habilitaPaneles(panel);
        } else {
            this.tipoDoc.Documentos = [];
            this.EtipoDoc.emit(this.tipoDoc);
            this.edicion = true; }
      },
      error => { this.mensajesService.error(error); });
    }

    downloadArchivo(arch: any) {
      const Datos = [{'LegajoId': this.tipoDoc.LegajoId,
      'EdificioId': this.tipoDoc.EdificioId,
      'RubroId': this.tipoDoc.RubroId,
      'TipoDoc': this.tipoDoc.TipoDocDefinicion[0].TipoDoc,
      'DocumentoId' : arch.DocumentoId}];
      this.datosService.getDatos('archivoDownload', Datos ).subscribe(
        ped => {
          if (JSON.parse(ped).Status[0].Status  === 0) {
            this._downloadArchivo(this.str2ab(JSON.parse(ped).Datos[0].DocumentoVarChar),
            JSON.parse(ped).Datos[0].TipoArchivo, JSON.parse(ped).Datos[0].NombreArchivo);
          } else {
            this.mensajesService.error('Error al obtener archivo : ' + JSON.parse(ped).Status[0].Msg);
          }
        },
        error => { this.mensajesService.error(error); });
    }

    getTipoDoc(): TipoDoc {
      return this.tipoDoc;
    }

    setDocumento(doc: Documento) {
      this.doc = this.instancia;
      this.instancia = doc;

       }

    getDocumento(): Documento {
      return this.instancia;
    }

    _downloadArchivo(data: any, tipo: string, nombre: string) {
      const blob = new Blob([data], { type: tipo });
      saveAs(blob, nombre);
    }

    str2ab(str ) {
      const arr = str.split(',');
      const view = new Uint8Array(arr);
      return view.buffer;
    }

}
