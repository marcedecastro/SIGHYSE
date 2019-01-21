import { Component, OnInit } from '@angular/core';
import {RubrosService} from './../_servicios/rubros.service';

@Component({
  selector: 'app-rubros-abm',
  templateUrl: './rubros-abm.component.html',
  styleUrls: ['./rubros-abm.component.scss']
})
export class RubrosAbmComponent implements OnInit {

  constructor(public rubroService: RubrosService) { }

  ngOnInit() {
  }

}
