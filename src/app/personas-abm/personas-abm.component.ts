import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DatosService} from './../_servicios/datos.service';
import {LegajoService} from './../legajo/legajo.service';
import { ToastrService } from 'ngx-toastr';
import {getTitulos} from './../_funciones/funciones';

@Component({
  selector: 'app-personas-abm',
  templateUrl: './personas-abm.component.html',
  styleUrls: ['./personas-abm.component.scss']
})
export class PersonasAbmComponent implements OnInit {


  public titulo = 'Personas';
  public datos;
  public titulos;
  constructor(private ds: DatosService, private ls: LegajoService, private mensajesService: ToastrService) { }

  ngOnInit() {
    const xDatos = [
      {'EdificioId': this.ds.edificioId,
      'RubroId': this.ls.getTipoDoc().RubroId,
      'LegajoId': this.ls.getTipoDoc().LegajoId,
      'Tipodoc': this.ls.getTipoDoc().TipoDoc }];
    this.ds.getDatos('PersonasRubrosLista', xDatos).subscribe(ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {

        this.datos = JSON.parse(ped).Datos;
        this.titulos = getTitulos(JSON.parse(ped).Datos[0], JSON.parse(ped).Titulos[0],[]);

      } else {
        this.mensajesService.error('Error al obtener Personas  : ' + JSON.parse(ped).Status[0].Msg);
      }
    },
    error => this.mensajesService.error('Lista de Personas', error));
  }



}
