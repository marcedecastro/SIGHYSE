import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {  MatafuegosService} from './../../_servicios/matafuegos.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-matafuegos-datos',
  templateUrl: './matafuegos-datos.component.html',
  styleUrls: ['./matafuegos-datos.component.scss']
})
export class MatafuegosDatosComponent implements OnInit {
  dpkConf: Partial<BsDatepickerConfig>;
  constructor(public matService: MatafuegosService, private bsLs: BsLocaleService, private mensajesService: ToastrService ) {
    this.dpkConf = Object.assign({}, {containerClass: 'theme-default', showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY'});
    this.bsLs.use('es');
  }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
// transforma las fecha a formato string
    if (typeof this.matService.instancia.FechaRelevamiento === 'object') {
      this.matService.instancia.FechaRelevamiento =  this.matService.instancia.FechaRelevamiento.toLocaleDateString();
    } else  {
      this.matService.instancia.FechaRelevamiento = this.matService.instancia.FechaRelevamiento.toLocaleString(); }

    if (typeof this.matService.instancia.FechaVencimiento === 'object') {
      this.matService.instancia.FechaVencimiento = this.matService.instancia.FechaVencimiento.toLocaleDateString();
    } else  {
      this.matService.instancia.FechaVencimiento = this.matService.instancia.FechaVencimiento.toLocaleString(); }

    if (typeof this.matService.instancia.FechaRecarga === 'object') {
      this.matService.instancia.FechaRecarga = this.matService.instancia.FechaRecarga.toLocaleDateString();
    } else  {
    this.matService.instancia.FechaRecarga = this.matService.instancia.FechaRecarga.toLocaleString(); }

    if (typeof this.matService.instancia.FechaPruebaHidraulica === 'object') {
      this.matService.instancia.FechaPruebaHidraulica = this.matService.instancia.FechaPruebaHidraulica.toLocaleDateString();
    } else  {
      this.matService.instancia.FechaPruebaHidraulica = this.matService.instancia.FechaPruebaHidraulica.toLocaleString(); }

    if (typeof this.matService.instancia.FechaFabricacion === 'object') {
        this.matService.instancia.FechaFabricacion = this.matService.instancia.FechaFabricacion.toLocaleDateString();
      } else  {
        this.matService.instancia.FechaFabricacion = this.matService.instancia.FechaFabricacion.toLocaleString(); }

  this.matService.instancia.MatafuegoEstado = 1;
    this.matService.graba('Graba').subscribe(
      res => {
        if (JSON.parse(res).Status[0].Status  === 0) {
          this.mensajesService.success('Matafuego guardado sactifactoriamente');
          this.matService.nuevaInstancia();
          this.matService.getLista();
          form.resetForm();
          this.matService.listaVisible = true;
          this.matService.datosVisible = false;

        } else {
          this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Matafuego');
          this.matService._mostrarErrores(JSON.parse(res).Mensajes);
        }
       },
       error => { this.mensajesService.error(error); } );

  }
    resetForm(frm: NgForm) {
       this.matService.nuevaInstancia();
      frm.resetForm();
      this.matService.listaVisible = true;
      this.matService.datosVisible = false;

    }
}
