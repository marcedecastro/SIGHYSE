import { Component, OnInit } from '@angular/core';
import {  UsuariosService} from './../_servicios/Usuarios.service';
@Component({
  selector: 'app-usuarios-abm',
  templateUrl: './usuarios-abm.component.html',
  styleUrls: ['./usuarios-abm.component.scss']
})
export class UsuariosAbmComponent implements OnInit {

  constructor(private usuService: UsuariosService) { }

  ngOnInit() {
  }

}
