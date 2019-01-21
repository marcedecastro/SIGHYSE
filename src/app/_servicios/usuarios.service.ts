
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
// import { NgxCheckboxModule } from 'ngx-checkbox';

import { DatosService } from './datos.service';
import { ToastrService } from 'ngx-toastr';
import {Usuario} from './../_Modelos/Usuario';
import {Edificio} from './../_Modelos/Edificio';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public lista: Usuario[];
  public titulos: String[];
  public campos;
  public edificios: Edificio[];
  public xedificios: Edificio[];
  public edificiosAmbito;
  public roles = [];
  public rolesUsuario = [];
  public instancia: Usuario;
  public listaVisible: boolean;
  public datosVisible: boolean;
  public rolesVisible: boolean;
  public ambitoVisible: boolean;
  constructor(private ds: DatosService, private mensajesService: ToastrService) {

    this.getEdificios();

    this.roles.push({'rol': 'Administrador', 'descripcion': 'Administra el sistema	', 'estado': 0});
    this.roles.push({'rol': 'CargaLegajos', 'descripcion': 'Actualiza Legajos Técnicos', 'estado': 0});
    this.roles.push({'rol': 'Consultas', 'descripcion': 'Consultas	Consultas del sistema	', 'estado': 0});
   }

   nuevaInstancia() {
     this.instancia = new Usuario();
   //    this.getAmbitos();
   }

   getLista(columnas?: number[]|any) {
    let titulos;
    this.ds.getDatos('UsuariosLista', undefined).subscribe( ped => {
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

  getRolesUsuario() {
    /*
        const xDatos = [{'EdificioId': this.ds.edificioId, 'RubroId': this.ls.getTipoDoc().RubroId}];
    */
        const Datos = [{UsuarioId: this.instancia.UsuarioId}];
        this.ds.getDatos('UsuariosRolesLista', Datos).subscribe( ped => {
          if (JSON.parse(ped).Status[0].Status  === 0) {
             this.rolesUsuario = JSON.parse(ped).Datos;
             this.marcaRoles();
          } else {
            this.mensajesService.error('Error al obtener Roles del usuario : ' + JSON.parse(ped).Status[0].Msg);
          }
        },
        error => this.mensajesService.error('Lista de Roles de Usuario', error) );
      }

       marcaRoles() {
        for ( let i = 0; i < this.roles.length; i++) {
          const rol = this.roles[i].rol;
          const x = this.rolesUsuario.filter(function(r) {
            return r.Rol ===  rol; });
          if ( x.length > 0 ) {
            this.roles[i].estado = 1;
          }
        }

      }

      getAmbitos() {
        const Datos = [{UsuarioId: this.instancia.UsuarioId}];
        this.ds.getDatos('UsuarioAmbitos', Datos).subscribe( ped => {
          if (JSON.parse(ped).Status[0].Status  === 0) {
             this.edificiosAmbito = JSON.parse(ped).Datos;
             this.getEdificiosDisponibles();
          } else {
            this.mensajesService.error('Error al obtener Roles del usuario : ' + JSON.parse(ped).Status[0].Msg);
          }
        },
        error => this.mensajesService.error('Lista de Roles de Usuario', error) );

          }

  getEdificios() {
    this.ds.getDatos('Edificios').subscribe(res => {
      this.xedificios = JSON.parse(res).Datos;

    } );


  }

    private getEdificiosDisponibles() {

    this.edificios = this.xedificios;


      for ( let i = 0; i < this.edificiosAmbito.length; i++) {
        const edificio = this.edificiosAmbito[i].EdificioId;
        this.edificios = this.edificios.filter(function(edi) { return edi.EdificioId !==  edificio; });
      }


  }
  graba(Opcion: string ) {

    return this.ds.grabaDatos('Usuarios', Opcion, 'Usuarios', this.ds.edificioId, this.instancia);
  }
  grabaAmbito( ) {
    const Datos = [];
    for (let i = 0 ; i < this.edificiosAmbito.length; i++) {
      Datos.push({'usuarioId': this.instancia.UsuarioId, 'EdificioId': this.edificiosAmbito[i].EdificioId});
    }
    return this.ds.grabaDatos('UsuarioAmbitos', 'Graba', 'UsuariosAmbitos', this.ds.edificioId, Datos);
  }

  grabaRoles( ) {
    const Datos = [];
    for (let i = 0 ; i < this.roles.length; i++) {
      if (this.roles[i].estado === 1) {
        Datos.push({'usuarioId': this.instancia.UsuarioId, 'rol': this.roles[i].rol});
      }
    }
    return this.ds.grabaDatos('UsuariosRoles', 'Graba', 'UsuariosRoles', this.ds.edificioId, Datos);
  }
  _mostrarErrores(errores: any[]) {
    if (errores !== undefined) {
    for (let i = 1 ; i < errores.length; i++) {
      this.mensajesService.error(errores[i].Campo + ' [' + errores[i].CodError + '] ' + errores[i].Msg); }
    }
  }

}
