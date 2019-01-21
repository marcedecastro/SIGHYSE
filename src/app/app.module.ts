import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
 import { NgModule } from '@angular/core';

 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { ToastrModule } from 'ngx-toastr';
 import { ModalModule } from 'ngx-bootstrap';
 /// import del bootstrap para angular
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
 import { defineLocale } from 'ngx-bootstrap/chronos';
 import { esLocale } from 'ngx-bootstrap/locale';
 import { SortableModule } from 'ngx-bootstrap';
// ag grid
import { AgGridModule } from 'ag-grid-angular';
 
 // funcionalidades de ruteo
 
 import { AppRoutingModule } from './app-routing/app-routing.module';
 import { HttpClientModule } from '@angular/common/http';
  import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { FooterComponent } from './footer/footer.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { LegajoComponent } from './legajo/legajo.component';
import { DocumentosComponent } from './legajo/documentos/documentos.component';
import { EdificiosComponent} from './edificios/edificios.component';
import { EdificioComponent } from './edificios/edificio/edificio.component';
import { EdificioListComponent } from './edificios/edificio-list/edificio-list.component';
import {AuthGuard } from './auth.guard';

// import { RouterModule, routes} from './app-routing/app-routing.module';


import { GrillaComponent } from './_componentes/grilla/grilla.component';
import { RubrosComponent } from './legajo/rubros/rubros.component';
import { DocumentoListComponent } from './legajo/documento-list/documento-list.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './usuario/login/login.component';
import { HomeComponent } from './home/home.component';
import { RolAbmComponent } from './rol-abm/rol-abm.component';
import {RolesListaComponent} from './rol-abm/roles-lista/roles-lista.component';
import { RolDatosComponent } from './rol-abm/rol-datos/rol-datos.component';
import { DocumentoArchivoComponent } from './legajo/documento-archivo/documento-archivo.component';
import { MatafuegosAbmComponent } from './matafuegos-abm/matafuegos-abm.component';
import { MatafuegosDatosComponent } from './matafuegos-abm/matafuegos-datos/matafuegos-datos.component';
import { MatafuegosListaComponent } from './matafuegos-abm/matafuegos-lista/matafuegos-lista.component';
import { PAGER_CONTROL_VALUE_ACCESSOR } from 'ngx-bootstrap/pagination/pager.component';
import { UsuariosAbmComponent } from './usuarios-abm/usuarios-abm.component';
import { UsuariosListaComponent } from './usuarios-abm/usuarios-lista/usuarios-lista.component';
import { UsuariosDatosComponent } from './usuarios-abm/usuarios-datos/usuarios-datos.component';
import { UsuariosRolesComponent } from './usuarios-abm/usuarios-roles/usuarios-roles.component';
import { UsuariosAmbitoComponent } from './usuarios-abm/usuarios-ambito/usuarios-ambito.component';
import { RubrosAbmComponent } from './rubros-abm/rubros-abm.component';
import { RubroDatosComponent } from './rubros-abm/rubro-datos/rubro-datos.component';
import { RubroListaComponent } from './rubros-abm/rubro-lista/rubro-lista.component';
import { RubroTipoDocsComponent } from './rubros-abm/rubro-tipo-docs/rubro-tipo-docs.component';
import { LegajoConsultasComponent } from './legajo-consultas/legajo-consultas.component';
import { LegajoInformeComponent } from './legajo-informe/legajo-informe.component';
import { RegionesAbmComponent } from './regiones-abm/regiones-abm.component';
import { RegionesListaComponent } from './regiones-abm/regiones-lista/regiones-lista.component';
import { RegionDatosComponent } from './regiones-abm/region-datos/region-datos.component';





defineLocale('es', esLocale);

@NgModule({
  declarations: [

    AppComponent,
    NavComponent,
    SidebarComponent,
    MainViewComponent,
    FooterComponent,
    TipoDocumentoComponent,
    LegajoComponent,
    DocumentosComponent,
    GrillaComponent,
    RubrosComponent,
    EdificiosComponent,
    EdificioComponent,
    EdificioListComponent,
    DocumentoListComponent,
    UsuarioComponent,
    LoginComponent,
    HomeComponent,
    RolAbmComponent,
    RolesListaComponent,
    RolDatosComponent,
    DocumentoArchivoComponent,
    MatafuegosAbmComponent,
    MatafuegosDatosComponent,
    MatafuegosListaComponent,
    UsuariosAbmComponent,
    UsuariosListaComponent,
    UsuariosDatosComponent,
    UsuariosRolesComponent,
    UsuariosAmbitoComponent,
    RubrosAbmComponent,
    RubroDatosComponent,
    RubroListaComponent,
    RubroTipoDocsComponent,
    LegajoConsultasComponent,
    LegajoInformeComponent,
    RegionesAbmComponent,
    RegionesListaComponent,
    RegionDatosComponent,

  ],
  imports: [
    HttpClientModule,
    NgbModule,
    BsDatepickerModule.forRoot(), // para usar Date Pickers
    ModalModule.forRoot(), // formularios modals
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({disableTimeOut: PAGER_CONTROL_VALUE_ACCESSOR}),
    SortableModule.forRoot(),
    AgGridModule.withComponents([]),
    FormsModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
 