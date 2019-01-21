import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {RubroDefinicion} from './../_Modelos/Rubro';
import {DatosService} from './datos.service';
import { TipoDocDefinicion } from '../_Modelos/TipoDoc';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {
  public lista: RubroDefinicion[];
  public titulos: String[];
  public tiposDoc: { Datos: RubroDefinicion[], titulos: string[] , campos: string[]};
  public campos;
  public instancia: RubroDefinicion;
  public listaVisible: Boolean;
  public datosVisible: Boolean;
  public tipoDocVisible: Boolean;

  constructor(private ds: DatosService, private mensajesService: ToastrService) {
   this.tiposDoc = {'Datos': [], 'titulos': [], 'campos': []};

   }

  nuevaInstancia() {
    this.instancia = new RubroDefinicion();

  }
  getLista(columnas?: number[]|any) {
    let titulos;
    this.ds.getDatos('RubrosLista', undefined).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
         this.lista = JSON.parse(ped).Datos;
         titulos = this.ds.getTitulos( JSON.parse(ped).Titulos, columnas);
         this.titulos = titulos.titulos;
         this.campos = titulos.campos;

      } else {
        this.mensajesService.error('Error al obtener Usuarioes : ' + JSON.parse(ped).Status[0].Msg);
      }
    },
    error => this.mensajesService.error('Lista de Usuarios', error) );
  }

  getTipoDoc() {
     let xtitulos;
    const Datos = [{'RubroId': this.instancia.RubroId}];
    this.ds.getDatos('RubrosTipoDocLista', Datos).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
         this.tiposDoc.Datos = JSON.parse(ped).Datos;
        xtitulos = this.ds.getTitulos( JSON.parse(ped).Titulos, [4, 5, 7, 10]);
         this.tiposDoc.titulos = xtitulos.titulos;
         this.tiposDoc.campos = xtitulos.campos;
      } else {
        this.mensajesService.error('Error al obtener Documentos : ' + JSON.parse(ped).Status[0].Msg);
      }
    },
    error => this.mensajesService.error('Lista de Documentos', error) );
  }


  graba(Opcion: string) {

     return this.ds.grabaDatos('Rubros', Opcion, 'Rubros', 1, this.instancia);
  }

  grabaTipoDoc(Opcion: string, doc: TipoDocDefinicion) {
    doc.Descripcion = doc.TipoDocDescripcion;
    doc.DescripcionLarga = doc.TipoDocDescripcionLarga;

    return this.ds.grabaDatos('RubroTipodocs', Opcion, 'Rubros', 1, doc);
  }

  _mostrarErrores(errores: any[]) {
    if (errores !== undefined) {
    for (let i = 0 ; i < errores.length; i++) {
      this.mensajesService.error(errores[i].Campo + ' [' + errores[i].CodError + '] ' + errores[i].Msg); }
    }
  }

}
