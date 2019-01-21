import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
import {  UsuariosService} from './../../_servicios/Usuarios.service';
import {  DatosService} from './../../_servicios/datos.service';
import { Edificio } from '../../_Modelos/Edificio';
@Component({
  selector: 'app-usuarios-ambito',
  templateUrl: './usuarios-ambito.component.html',
  styleUrls: ['./usuarios-ambito.component.scss']
})
export class UsuariosAmbitoComponent implements OnInit {

  constructor(public usuService: UsuariosService, private ds: DatosService,  private mensajesService: ToastrService ) {

  }

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

   clickAmbito(item: any) {
    const edificio = new Edificio();

    edificio.EdificioId = item.EdificioId;
    edificio.Nombre = item.eNombre;
     this.usuService.edificios.push(edificio);
     this.usuService.edificiosAmbito  = this.usuService.edificiosAmbito .filter(function( obj ) {
      return obj.eNombre !== item.eNombre; });
   }

   clickEdificio(item: any) {

    this.usuService.edificiosAmbito .push({'EdificioId': item.EdificioId, 'eNombre': item.Nombre});
    this.usuService.edificios = this.usuService.edificios.filter(function( obj ) {
     return obj.Nombre !== item.Nombre; });
  }

  clickAmbitoTodos() {
    for (let i = 0; i < this.usuService.edificiosAmbito.length; i++) {
      const edificio = new Edificio();
      const item = this.usuService.edificiosAmbito[i];
      edificio.EdificioId = item.EdificioId;
      edificio.Nombre = item.eNombre;
       this.usuService.edificios.push(edificio);
    }
    this.usuService.edificiosAmbito = [];
  }


  clickEdificiosTodos() {
    for (let i = 0; i < this.usuService.edificios.length; i++) {
      const item = this.usuService.edificios[i];
      this.usuService.edificiosAmbito .push({'EdificioId': item.EdificioId, 'eNombre': item.Nombre});
    }
    this.usuService.edificios = [];
  }

  onSubmit(form: NgForm) {
    this.usuService.grabaAmbito().subscribe(
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
