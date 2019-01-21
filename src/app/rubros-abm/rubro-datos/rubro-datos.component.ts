import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';


import { ToastrService} from 'ngx-toastr';

import {RubrosService} from './../../_servicios/rubros.service';

@Component({
  selector: 'app-rubro-datos',
  templateUrl: './rubro-datos.component.html',
  styleUrls: ['./rubro-datos.component.scss']
})
export class RubroDatosComponent implements OnInit {

  constructor(public rubroService: RubrosService, private mensajesService: ToastrService ) { }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    this.rubroService.nuevaInstancia();
    this.rubroService.listaVisible = true;
    this.rubroService.datosVisible = false;
    if (form != null) {
      form.reset();
    }
  }

  onSubmit(form: NgForm) {

   this.rubroService.graba('Graba').subscribe(
      res => {
        if (JSON.parse(res).Status[0].Status  === 0) {
          this.mensajesService.success('Rubro guardado sactifactoriamente');
          this.rubroService.nuevaInstancia();
          this.rubroService.getLista();
          form.resetForm();
          this.rubroService.listaVisible = true;
          this.rubroService.datosVisible = false;

        } else {
          this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'rubro');
          this.rubroService._mostrarErrores(JSON.parse(res).Mensajes);
        }
       },
       error => { this.mensajesService.error(error); } );

    }



}
