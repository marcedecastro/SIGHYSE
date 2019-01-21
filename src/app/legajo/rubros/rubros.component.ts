import { Component, OnInit } from '@angular/core';
// import {Rubro} from '../../_Modelos/Rubro';
import {LegajoService} from './../legajo.service';


@Component({
  selector: 'app-legajo-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {
  constructor( public legajoService: LegajoService) { }
  ngOnInit( ) {}
}
