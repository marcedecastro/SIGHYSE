import { Injectable } from '@angular/core';
import { DatosService } from './datos.service';
import { LegajoService } from './../legajo/legajo.service';
import {Matafuego, CargaMatafuego, PresionMatafuego, TipoMatafuego} from './../_Modelos/Matafuego';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class MatafuegosService {
  public lista: Matafuego[];
  public campos;
  public titulos;
  public instancia: Matafuego;
  public tipos: TipoMatafuego[];
  public cargas: CargaMatafuego[];
  public presiones: PresionMatafuego[];
  public listaVisible: boolean;
  public datosVisible: boolean;

  constructor(private ds: DatosService, private ls: LegajoService, private mensajesService: ToastrService) {
  /* ["LegajoId" 0, "Edificio" 1, "RubroId" 2, "RubroDesc" 3, "TipoDoc" 4, "TipoDocDesc" 5, "Tipo" 6
    , "TipoDesc" 7, "Carga" 8, "CargaDesc" 9, "NroSerie" 10, "InventarioMTEySS" 11, "InventarioSeguridad" 12,
    "InventarioOtro" 13, "Piso" 14, "Puesto" 15, "Estado", 16 "EstadoDesc" 17, "Presion" 18, "PresionDesc" 19,
    "FechaFabricacion" 20, "FechaPruebaHidraulica" 21, "FechaRecarga" 22, "FechaVencimiento" 23,
    "FechaRelevamiento" 24, "IntervinoNombre" 25, "IntervinoDNI" 26, "IntervinoCUIL" 27, "Nota" 28]
   */
   // campos  que muestra la grilla
    this.getLista([ 7, 9, 10, 11, 12, 13, 14, 15, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
    this.getTipos();
    this.getCargas();
    this.getPresiones();
    this.nuevaInstancia();
   }

   nuevaInstancia() {
    this.instancia = new Matafuego();

    this.instancia.LegajoId = this.ls.getTipoDoc().LegajoId;
    this.instancia.RubroId = this.ls.getTipoDoc().RubroId;
    this.instancia.Tipodoc = this.ls.getTipoDoc().TipoDoc;
   }
   getTipos() {
    this.ds.getDatos('MatafuegoTipos', undefined).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        this.tipos = JSON.parse(ped).Datos;
      } else  {
        this.mensajesService.error( JSON.parse(ped).Status[0].Msg, 'Carga de tipos de matafuegos');
      }
    },
    error => this.mensajesService.error('oops', error));
  }

  getCargas() {
    this.ds.getDatos('MatafuegoCargas', undefined).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        this.cargas = JSON.parse(ped).Datos;
      } else {
        this.mensajesService.error( JSON.parse(ped).Status[0].Msg, 'Carga de Matafuegos');
      }
    },
    error => this.mensajesService.error('oops', error));
  }

  getPresiones() {
    this.ds.getDatos('MatafuegoPresiones', undefined).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        this.presiones = JSON.parse(ped).Datos;
      } else {
        this.mensajesService.error('Error al obtener Legajo : ' + JSON.parse(ped).Status[0].Msg);
      }
    },
    error => this.mensajesService.error('oops', error) );
  }

  getLista(columnas?: number[]|any) {

    const xDatos = [{'EdificioId': this.ds.edificioId, 'RubroId': this.ls.getTipoDoc().RubroId}];
    let titulos;
    this.ds.getDatos('MatafuegoLista', xDatos).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {

        this.lista = JSON.parse(ped).Datos;
        titulos = this.ds.getTitulos( JSON.parse(ped).Titulos, columnas);
        this.titulos = titulos.titulos;
        this.campos = titulos.campos;
      } else {
        this.mensajesService.error('Error al obtener Matafuegos : ' + JSON.parse(ped).Status[0].Msg);
      }
    },
    error => this.mensajesService.error('Lista de matafuegos', error));
  }

  graba(Opcion: string ) {

    return this.ds.grabaDatos('Matafuegos', Opcion, 'Matafuegos', this.ds.edificioId, this.instancia);
  }

  _mostrarErrores(errores: any[]) {
    if (errores !== undefined) {
    for (let i = 1 ; i < errores.length; i++) {
      this.mensajesService.error(errores[i].Campo + ' [' + errores[i].CodError + '] ' + errores[i].Msg); }
    }
  }
}
