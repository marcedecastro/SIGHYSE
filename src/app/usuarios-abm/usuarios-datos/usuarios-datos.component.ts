import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
import { Edificio } from '../../_Modelos/Edificio';
import {Provincia } from '../../_Modelos/provincia';
import { DatosService } from '../../_servicios/datos.service';
import { UsuariosService } from '../../_servicios/Usuarios.service';


@Component({
  selector: 'app-usuarios-datos',
  templateUrl: './usuarios-datos.component.html',
  styleUrls: ['./usuarios-datos.component.scss']
})
export class UsuariosDatosComponent implements OnInit {
  private provincias: Provincia[];
  private edificios: Edificio[];
  constructor(public usuService: UsuariosService, private  ds: DatosService , private mensajesService: ToastrService ) { }

  ngOnInit() {
    this.ds.getDatos('provincias').subscribe(res =>
      this.provincias = JSON.parse(res).Datos);
      this.ds.getDatos('Edificios').subscribe(res =>
        this.edificios = JSON.parse(res).Datos);
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
       this.usuService.graba('Graba').subscribe(
        res => {
          if (JSON.parse(res).Status[0].Status  === 0) {
            this.mensajesService.success('Usuario guardado sactifactoriamente');
            this.usuService.nuevaInstancia();
            this.usuService.getLista();
            form.resetForm();
            this.usuService.listaVisible = true;
            this.usuService.datosVisible = false;
            this.usuService.rolesVisible = false;
            this.usuService.ambitoVisible = false;
          } else {
            this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Usuario');
            this.usuService._mostrarErrores(JSON.parse(res).Mensajes);
          }
         },
         error => { this.mensajesService.error(error); } );
  
      }

   }
