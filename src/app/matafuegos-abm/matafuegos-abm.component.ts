import { Component, OnInit } from '@angular/core';
import {  MatafuegosService} from './../_servicios/matafuegos.service';

@Component({
  selector: 'app-matafuegos-abm',
  templateUrl: './matafuegos-abm.component.html',
  styleUrls: ['./matafuegos-abm.component.scss']
})
export class MatafuegosAbmComponent implements OnInit {

  constructor(private matService: MatafuegosService) { }

  ngOnInit() {
  }

}
