import { Component, OnInit } from '@angular/core';
import {RegionesService} from './../../_servicios/regiones.service'
@Component({
  selector: 'app-region-datos',
  templateUrl: './region-datos.component.html',
  styleUrls: ['./region-datos.component.scss']
})
export class RegionDatosComponent implements OnInit {

  constructor(public regionService: RegionesService) { }

  ngOnInit() {
  }

}
