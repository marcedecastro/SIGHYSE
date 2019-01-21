import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {DatosService} from './../_servicios/datos.service';
@Component({
  selector: 'app-legajo-informe',
  templateUrl: './legajo-informe.component.html',
  styleUrls: ['./legajo-informe.component.scss']
})
export class LegajoInformeComponent implements OnInit {
  public nivel1;
  public  titulos1;
  public  campos1;

  constructor(public ds: DatosService, private mensajesService: ToastrService) { }

  ngOnInit() {
    this.getNivel1();

  }

  getNivel1( ) {
    let titulos;
    this.ds.getDatos('LegajoRubros', undefined).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        this.nivel1 = JSON.parse(ped).Datos;
        titulos = this.ds.getTitulos( JSON.parse(ped).Datos, []);
        this.titulos1 = titulos.titulos;
        this.campos1 = titulos.campos;
      } else  {
        this.mensajesService.error('Error al obtener Legajo : ' + JSON.parse(ped).Status[0].Msg);
      }
    },
    error => this.mensajesService.error('oops', error));
  }

  setClickedRow(i: number) {


  }

  getTitulos( listaTitulos: any, columnas?: number[]|any): any {
    let titulos: string[];
    let campos: string[];

    const xCampos = Object.keys(listaTitulos[0]);
    titulos = [];

    if (columnas === undefined || columnas.length === 0) {
      campos = xCampos;
      for ( let i = 0; i < campos.length; i++ ) {
        titulos.push(listaTitulos[0][campos[i]]);
      }
    } else {
      campos = [];
      for ( let i = 0; i < columnas.length; i++) {
        titulos.push(listaTitulos[0][xCampos[columnas[i]]]);
        campos.push(xCampos[columnas[i]]);
      }
    }
    return  {'titulos': titulos, 'campos': campos};

  }
}
