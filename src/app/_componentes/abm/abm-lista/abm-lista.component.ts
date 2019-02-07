import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abm-lista',
  templateUrl: './abm-lista.component.html',
  styleUrls: ['./abm-lista.component.scss']
})
export class AbmListaComponent implements OnInit {

    @Input() public lista: any;
    @Input() public titulos: any;
    @Input() public editar: Function;
  constructor() { }

  ngOnInit() {
  }

}
