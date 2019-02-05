import { Component, OnInit, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {DatosService} from './../../_servicios/datos.service';
import {ExcelService} from './../../_servicios/excel.service';
import {ImpresionService} from './../../_servicios/impresion.service';
@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.scss']
})
export class GrillaComponent implements OnInit, OnChanges {

  @Input() public datos: any;
  @Input() public titulos: any;
  @Input() public titulosSaltos: any;
  private modalRef: BsModalRef;
  public detalleMostrar = {'datos': [], 'titulos': [], titulosGlobales: []};

  constructor( private excelService: ExcelService,
    private impService: ImpresionService,
    private modalService: BsModalService,
    private ds: DatosService ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {}

  getTitulosNivel(nivel, titulos?) {
    if (!titulos) {titulos = this.titulos; }

    nivel.titulos = this.getTitulos(nivel[0], titulos);
    return nivel.titulos.titulos.length > 0;
  }

  setNivel2(elemento: any) {
        const xTit = this.getColumnasSaltos(this.titulosSaltos);

       if (!elemento.subnivel) {
        const subnivel = Object.entries(elemento).filter(function(x) {
          return Array.isArray(x[1] && xTit.indexOf( x[0]) === -1);
         });
         if (subnivel.length > 0) {
            elemento.subnivel = subnivel[0][1];
           for (let i = 0; i >  elemento.subnivel.length; i++) {  elemento.subnivel.detalle = true; }
         }
      }
    return elemento.subnivel;
  }

  getColumnasSaltos(saltos): string[] {
    let titulos: string[];
    titulos = [];
    for (let i = 0; i < saltos.length; i++) {
      titulos.push(saltos[i].Lista);
    }

    return titulos;
  }
  setDetalle(elemento: any, subnivel: any) {
    elemento.detalle = !elemento.detalle;
  }

  getTitulos( objeto: any, titulos: string[]): any {
    const xTitulos = [];
    const xCampos = [];
    const xxTitulos = Object.entries(titulos);
    const xxCampos = Object.entries(objeto);
    const xTit = this.getColumnasSaltos(this.titulosSaltos);
    let indiceCampo: number;
    let campos = [];

    campos = Object.keys(objeto);
 

    for (let i = 0; i < xxTitulos.length; i++) {
      indiceCampo = campos.indexOf(xxTitulos[i][0]);
        if ( indiceCampo >= 0 && ! Array.isArray(xxCampos[indiceCampo][1]))  {
          xTitulos.push(xxTitulos[i][1]);
          xCampos.push({'nombre': campos[indiceCampo], 
          'detalle': this.titulosSaltos.filter(x => x.Columna === campos[indiceCampo])});
        }
      }



    return  {'titulos': xTitulos, 'campos': xCampos};

  }

    mostrarDetalle(elemento: any, detalle: any, titulo: string, template: TemplateRef<any>) {
      this.ds.getDatosDet(detalle[0].Entidad,
        detalle[0].Accion,
        'LegajoConsulta', [{'Lista': Object.entries(elemento).filter(x => x[0] === detalle[0].Lista)[0][1]}
      ]).subscribe(
        res => { this.detalleMostrar.datos =  JSON.parse(res).Datos;
        this.detalleMostrar.titulosGlobales = JSON.parse(res).Titulos[0] ;
        this.modalRef = this.modalService.show( template,  Object.assign({}, { class: 'modal-dialog modal-lg' })); }
      );

    }
    cerrarDetalle() {
       this.detalleMostrar = {'datos': [], 'titulos': [], 'titulosGlobales': []};
      this.modalRef.hide();
    }
  Imprimir(): void {
    this.getTitulosNivel(this.datos);
    this.impService.encabezado = 'legajoResumen';
    this.impService.printDocument('impresiongrilla', JSON.stringify({'datos': this.datos, 'titulos': this.datos.titulos}));
  }

  ExportarExcel(): void {
    this.excelService.exportAsExcelFile(this.datos, 'Legajo Resumen');
  }
}
