import { Component, OnInit, OnDestroy } from '@angular/core';
import {LegajoService} from './legajo.service';
import { Legajo } from '../_Modelos/legajo';


@Component({
  selector: 'app-legajo',
  templateUrl: './legajo.component.html',
  styleUrls: ['./legajo.component.scss']
})
export class LegajoComponent implements OnInit {

  editar = true;
  constructor(public legajoService: LegajoService) { }

  ngOnInit() {

    this.legajoService.getLegajo();
    // if (! this.legajoService.legajo.LegajoId){ this.editar = false;}
  }

 

}
