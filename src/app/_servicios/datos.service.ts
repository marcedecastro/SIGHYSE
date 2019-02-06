import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private usuario = '';
  public  edificioId;
  public instancia;
  public usuarioId;

  constructor(private http: HttpClient  ) {
    this.inicializar();
   }

   inicializar() {

    this.edificioId = localStorage.getItem('edificioId');
    this.usuario = localStorage.getItem('userName');
    this.usuarioId = localStorage.getItem('userUsuarioId');

   }

   setUsuarioId(id: string) { this.usuarioId = id; }
   getUsuarioId(): string { return this.usuarioId; }

   setUsuario(username: string) { this.usuario = username; }
   getUsuario(): string { return this.usuario; }

   getConfig(): Observable<any> {
    return this.http.get('../../assets/config.json');
   }

   getMenu(): Observable<any> {
     this.inicializar();
     return this._post( 'Menu', 'Lee', '', this.edificioId, [] );
   }

   userAuthentication(userName, password) {

    const xurl = localStorage.getItem('apiUrl');

     httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET');
    httpOptions.headers = httpOptions.headers.set('Accept', 'application/json');
    httpOptions.headers = httpOptions.headers.set('content-type', 'application/json');

    const body = {
      username: userName,
      password: password
    };

    return this.http.post<string>(xurl + 'login/authenticate', body, httpOptions).pipe(catchError(this.handleError));
  }


  getDatos(opcion: string, Datos?: any[]|undefined): Observable<any> {

    switch (opcion) {
      case 'Edificios': {
        return this._post( 'Edificios', 'ListaTodos', 'Edificios', 1, null );
      }
      case 'Regiones': {
        return this._post( 'Regiones', 'Lista', 'AdminLegajo', 1, null );
      }
      case 'EdificiosAmbito': {
        return this._post( 'Edificios', 'ListaAmbito', 'Edificios', this.edificioId, Datos );
      }

      case 'EdificioPropiedades': {
        return this._post( 'EdificioPropiedades', 'Lista', 'Edificios', this.edificioId, Datos );
      }
      
      case 'Legajos':   {
        return this._post( 'Legajo', 'LeeCompleto', 'LegajoConsulta', this.edificioId, Datos );
      }
      case 'LegajoRubros': {
        if (Datos === undefined) {
          Datos = [{'EdificioId': this.edificioId}];
        }
        return this._post( 'Legajo', 'LeeRubros', 'LegajoConsulta', this.edificioId, Datos );
      }
      case 'LegajoRubrosTipoDoc': {
        return this._post( 'Legajo', 'LeeCabecerasTipoDoc', 'LegajoConsulta', this.edificioId, Datos );
      }
      case 'archivoDownload': {
        return this._post( 'LegajoArchivo', 'Lee', 'LegajoConsulta', this.edificioId, Datos );
      }

      case 'provincias': {
        return this._post( 'Provincias', 'Lista', 'Edificios', this.edificioId, [] );
      }

      case 'MatafuegoTipos': {
        return this._post( 'MatafuegoTipos', 'Lista', 'AdminLegajo', this.edificioId, [] );
      }

      case 'MatafuegoCargas': {
        return this._post( 'MatafuegoCargas', 'Lista', 'AdminLegajo', this.edificioId, [] );
      }
      case 'MatafuegoLista': {
        return this._post( 'Matafuegos', 'ListaRubro', 'AdminLegajo', this.edificioId, Datos);
      }

      case 'MatafuegoPresiones': {
        return this._post( 'MatafuegoPresiones', 'Lista', 'AdminLegajo', this.edificioId, [] );
      }

      case 'UsuariosLista': {
        return this._post( 'Usuarios', 'Lista', 'Usuarios', this.edificioId, []);
      }
      case 'UsuarioAmbitos': {
        return this._post( 'UsuarioAmbitos', 'Lista', 'UsuarioAmbitos', this.edificioId, Datos);
      }
      case 'UsuariosRolesLista': {
        return this._post( 'UsuariosRoles', 'Lista', 'UsuariosRoles', this.edificioId, Datos);
      }

      case 'RubrosLista': {
        return this._post( 'Rubros', 'Lista', 'Rubros', this.edificioId, Datos);
      }

      case 'RubrosTipoDocLista': {
        return this._post( 'RubroTipoDocs', 'Lista', 'RubroTipoDocs', this.edificioId, Datos);
      }
      case 'legajoInforme': {

          return this._post( 'LegajosResumen', 'Emite', 'Infolegajo', this.edificioId, Datos);
       }
       case 'PersonasRubrosLista': {

        return this._post( 'Personas', 'ListaRubro', 'Administracion', this.edificioId, Datos);
     }


      }
    }
  
  grabaDatos(entidad: string, accion: string, menuItem: string, edificioId: number , Datos: any) {
    return this._post( entidad, accion, menuItem, this.edificioId, Datos );
  }

  getDatosDet(entidad: string, accion: string, menuItem: string, datos: Object[]) {

    return this._post( entidad, accion, menuItem, this.edificioId, datos );

  }

   private _post(entidad: string, accion: string, menuItem: string, edificioId: number , datos: Object[]): Observable<string> {
    const xurl = localStorage.getItem('apiUrl');

    const  pedidoMenu = {
      Pedido: [{Entidad: entidad, Accion: accion}],
      Datos: datos,
      ContextoUser: [{UsuarioId: this.usuarioId , MenuItem: menuItem, EdificioId: edificioId}],
      ContextoWeb: []
     };

    const strPedido =  '\'' + JSON.stringify(pedidoMenu) + '\'';

    const token = localStorage.getItem('userToken');
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      httpOptions.headers = httpOptions.headers.set('Accept', 'application/json');
      httpOptions.headers = httpOptions.headers.set('content-type', 'application/json');
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + token );

    return this.http.post<string>(xurl + 'Datos',  strPedido, httpOptions).pipe(catchError(this.handleError));

   }

   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
       return throwError('Servicio de Datos:' + error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
     /* console.error(
        `Error de Backend ${error.status}, ` +
        `viene de : ${error.error}`);*/
        return throwError('Servicio de Datos:' + error.message);

    }

    // return throwError('Error inesperado intente mas tarde.');
  }



  getTitulos( listaTitulos: any, columnas?: number[]|any): any {
    let titulos: string[];
    let campos: string[];

    const xCampos = Object.keys(listaTitulos[0]);
    titulos = [];

    if (columnas === undefined || columnas.length === 0) {
      campos = xCampos;
      for ( let i = 0; i < campos.length; i++ ) {
        titulos.push(listaTitulos[0][campos[i]]);
      }
    } else {
      campos = [];
      for ( let i = 0; i < columnas.length; i++) {
        titulos.push(listaTitulos[0][xCampos[columnas[i]]]);
        campos.push(xCampos[columnas[i]]);
      }
    }
    return  {'titulos': titulos, 'campos': campos};

  }
}
