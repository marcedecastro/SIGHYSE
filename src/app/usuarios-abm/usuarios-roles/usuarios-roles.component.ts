import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
import {  UsuariosService} from './../../_servicios/Usuarios.service';

@Component({
  selector: 'app-usuarios-roles',
  templateUrl: './usuarios-roles.component.html',
  styleUrls: ['./usuarios-roles.component.scss']
})
export class UsuariosRolesComponent implements OnInit {
 // private roles Rol[];
 itemStringsLeft = [
  'Adminstrador',
  'Carga de Legajos',
  'Consultas'

];

items = [];
  constructor(public usuService: UsuariosService, private mensajesService: ToastrService) { }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    this.usuService.nuevaInstancia();
    this.usuService.listaVisible = true;
    this.usuService.datosVisible = false;
    this.usuService.rolesVisible = false;
    this.usuService.ambitoVisible = false;
    if (form != null) {
      form.reset();
    }
   }
   onSubmit(form: NgForm) {
    this.usuService.grabaRoles().subscribe(
      res => {
        if (JSON.parse(res).Status[0].Status  === 0) {
          this.mensajesService.success('Ambitos del usuario guardados correctamente,');
          this.usuService.nuevaInstancia();
          this.usuService.getLista();
          form.resetForm();
          this.usuService.listaVisible = true;
          this.usuService.datosVisible = false;
          this.usuService.rolesVisible = false;
          this.usuService.ambitoVisible = false;
        } else {
          this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Ambitos');
          this.usuService._mostrarErrores(JSON.parse(res).Mensajes);
        }
       },
       error => { this.mensajesService.error(error); } );

    }
   }

