import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrls: ['./abm.component.scss']
})
export class AbmComponent implements OnInit {

  @Input() public titulo: string;
  @Input() public titulos: any;
  @Input() public lista: any;
  @Input() public config: any;
  constructor() { }

  ngOnInit() {

  }

}
