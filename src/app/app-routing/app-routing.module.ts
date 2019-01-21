import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TipoDocumentoComponent} from '../tipo-documento/tipo-documento.component';
import {LegajoComponent} from '../legajo/legajo.component';
import {DocumentosComponent} from '../legajo/documentos/documentos.component';
import {EdificiosComponent} from '../edificios/edificios.component';
import {LoginComponent} from '../usuario/login/login.component';
import { AuthGuard } from '../auth.guard';
import {HomeComponent} from './../home/home.component';
import {RolAbmComponent} from '../rol-abm/rol-abm.component';
import {UsuariosAbmComponent} from '../usuarios-abm/usuarios-abm.component';
import {RegionesAbmComponent} from '../regiones-abm/regiones-abm.component';
import {RubrosAbmComponent} from '../rubros-abm/rubros-abm.component';
import {LegajoConsultasComponent} from '../legajo-consultas/legajo-consultas.component';
import {LegajoInformeComponent} from '../legajo-informe/legajo-informe.component';

import {AppComponent} from '../app.component';

const routes: Routes = [
  { path: 'InfoLegajoVence', component: LegajoInformeComponent, canActivate: [AuthGuard] },
  { path: 'InfoLegajoVencio', component: LegajoInformeComponent, canActivate: [AuthGuard] },
  { path: 'InfoLegajoFaltante', component: LegajoInformeComponent, canActivate: [AuthGuard] },
  { path: 'LegajoConsulta', component: LegajoConsultasComponent, canActivate: [AuthGuard] },
  { path: 'Regiones', component: RegionesAbmComponent, canActivate: [AuthGuard] },
  { path: 'Usuarios', component: UsuariosAbmComponent, canActivate: [AuthGuard] },
  { path: 'Rubros', component: RubrosAbmComponent, canActivate: [AuthGuard] },
  { path: 'Roles-Abm', component: RolAbmComponent, canActivate: [AuthGuard] },
  { path: 'tipoDoc', component: TipoDocumentoComponent, canActivate: [AuthGuard] },
  { path: 'LegajoActualizacion', component: LegajoComponent, canActivate: [AuthGuard] },
  { path: 'legajoDocumentos', component: DocumentosComponent, canActivate: [AuthGuard] },
  { path: 'Edificios', component: EdificiosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }


];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
