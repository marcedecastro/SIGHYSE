import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { ToastrService} from 'ngx-toastr';
import { DatosService } from '../../_servicios/datos.service';
import {Provincia } from '../../_Modelos/provincia';
import {Region } from '../../_Modelos/Region';
import {EdificioPropiedades} from '../../_Modelos/EdificioPropiedades';
import { EdificioService } from '../../_servicios/edificio.service';

@Component({
  selector: 'app-edificio',
  templateUrl: './edificio.component.html',
  styleUrls: ['./edificio.component.scss']
})
export class EdificioComponent implements OnInit {
  // variables para comobo de provincia
  public provincias: Provincia[];
  public edificioPropiedades: EdificioPropiedades[];
  public  regiones: Region[];
  constructor(public edificioService: EdificioService, private  ds: DatosService , private mensajesService: ToastrService ) { }

  ngOnInit() {
    this.ds.getDatos('provincias').subscribe(res =>
       this.provincias = JSON.parse(res).Datos);
    this.ds.getDatos('Regiones').subscribe(res =>
        this.regiones = JSON.parse(res).Datos);
    this.ds.getDatos('EdificioPropiedades').subscribe(res =>
          this.edificioPropiedades = JSON.parse(res).Datos);
          
       // this.resetForm();
  }


  resetForm(form?: NgForm) {
    this.edificioService.nuevaInstancia();
    this.edificioService.listaVisible = true;
    this.edificioService.datosVisible = false;
    if (form != null) {
      form.reset();
    }
  }


  onSubmit(form: NgForm) {
    this.edificioService.graba('Graba').subscribe(
      res => {
        if (JSON.parse(res).Status[0].Status  === 0) {
          this.mensajesService.success('Edificio guardado sactifactoriamente');
          this.edificioService.nuevaInstancia();
          this.edificioService.getLista();
          form.resetForm();
          this.edificioService.listaVisible = true;
          this.edificioService.datosVisible = false;

        } else {
          this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Edificio');
          this.edificioService._mostrarErrores(JSON.parse(res).Mensajes);
        }
       },
       error => { this.mensajesService.error(error); } );

    }

  }

