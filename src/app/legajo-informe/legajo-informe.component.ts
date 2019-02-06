import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';

import {DatosService} from './../_servicios/datos.service';


@Component({
  selector: 'app-legajo-informe',
  templateUrl: './legajo-informe.component.html',
  styleUrls: ['./legajo-informe.component.scss']
})
export class LegajoInformeComponent implements OnInit {
  public titulos;
  public titulosSaltos;
  public datos;
  public edificios;
  public edificiosSeleccionados;
  public rubros;
  public rubrosSeleccionados;
  public fechaDesde;
  public fechaHasta;
  public filtros: boolean;
  public grilla: boolean;
  dpkConf: Partial<BsDatepickerConfig>;

  constructor(public ds: DatosService, private mensajesService: ToastrService,  private bsLs: BsLocaleService) {
    const config =  {
      containerClass: 'theme-default',
      showWeekNumbers: false,
      bsValue: new Date(),
      dateInputFormat: 'DD/MM/YYYY'};
    this.dpkConf = Object.assign({}, config);
    this.bsLs.use('es');
  }

  ngOnInit() {
    this.filtros = true;
    this.grilla = false;
    this.fechaDesde = new Date();
    this.edificiosSeleccionados = [];
    this.rubrosSeleccionados = [];
    this.cargaEdificios();
    this.cargaRubros();

  }

  cargaEdificios() {
    this.ds.getDatos('UsuarioAmbitos').subscribe(res => {
      if (JSON.parse(res).Status[0].Status  === 0) {
      this.edificios = JSON.parse(res).Datos;
      for (let i = 0; i < this.edificios.length; i++) {
        this.edificios[i].Todos = 'Todos';
      }
      } else  {
            this.mensajesService.error('Error al obtener edificios : ' + JSON.parse(res).Status[0].Msg);
        }
      },
        error => this.mensajesService.error('oops', error)
      );

  }

  cargaRubros() {
    this.ds.getDatos('RubrosLista').subscribe(res => {
      if (JSON.parse(res).Status[0].Status  === 0) {
      this.rubros = JSON.parse(res).Datos;
      for (let i = 0; i < this.rubros.length; i++) {
        this.rubros[i].Todos = 'Todos';
      }
      } else  {
            this.mensajesService.error('Error al obtener rubros : ' + JSON.parse(res).Status[0].Msg);
        }
      },
        error => this.mensajesService.error('oops', error)
      );

  }
  ejecutarConsulta() {
    this.getDatos();
  }

  getDatos( ) {
    const  Datos = [{'FormatoSalida': 0, 'Edificios':  this.edificiosSeleccionados.length === 0 ? 'Todos' : this.edificiosSeleccionados,
                  'Rubros':   this.rubrosSeleccionados.length === 0 ? 'Todos' : this.rubrosSeleccionados,
                  'FechaDesde':  this.fechaDesde ? this.fechaDesde.toLocaleDateString() : '01/01/1950',
                  'FechaHasta': this.fechaHasta ? this.fechaHasta.toLocaleDateString() : '31/12/2050'
                }];
    this.ds.getDatos('legajoInforme', Datos).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        this.datos = JSON.parse(ped).Datos;
         this.titulos = JSON.parse(ped).Titulos[0];
         this.titulosSaltos = JSON.parse(ped).TitulosSaltos;
         this.filtros = false;
         this.grilla = true;
      } else  {
        this.mensajesService.error('Error al obtener Legajo : ' + JSON.parse(ped).Status[0].Msg);
      }
    },
    error => this.mensajesService.error('oops', error));
  }

}
