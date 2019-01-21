import { Component, OnInit } from '@angular/core';
// import {EdificioService} from './shared/edificio.service'
import {EdificioService} from './../_servicios/edificio.service';

@Component({
  selector: 'app-edificios',
  templateUrl: './edificios.component.html',
  styleUrls: ['./edificios.component.scss']
})
export class EdificiosComponent implements OnInit {

  constructor(private edificioService: EdificioService) { }

  ngOnInit() {
  }

}
