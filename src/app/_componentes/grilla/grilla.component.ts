import { Component, OnInit, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {DatosService} from './../../_servicios/datos.service';
import {ExcelService} from './../../_servicios/excel.service';
import {ImpresionService} from './../../_servicios/impresion.service';
import {getTitulos, getColumnasSaltos} from './../../_funciones/funciones';
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
    public impService: ImpresionService,
    private modalService: BsModalService,
    private ds: DatosService ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {}

  getTitulosNivel(nivel, titulos?) {
    if (!titulos) {titulos = this.titulos; }

    nivel.titulos = getTitulos(nivel[0], titulos, this.titulosSaltos);
    return nivel.titulos.titulos.length > 0;
  }

  setNivel2(elemento: any) {
        const xTit = getColumnasSaltos(this.titulosSaltos);

       if (!elemento.subnivel) {
        const subnivel = Object.entries(elemento).filter(function(x) {
          return (xTit.indexOf( x[0]) === -1) &&  Array.isArray(x[1]);
         });
         if (subnivel.length > 0) {
            elemento.subnivel = subnivel[0][1];
           for (let i = 0; i >  elemento.subnivel.length; i++) {  elemento.subnivel.detalle = true; }
         }
      }
    return elemento.subnivel;
  }
  setDetalle(elemento: any, subnivel: any) {
    elemento.detalle = !elemento.detalle;
  }
    mostrarDetalle(elemento: any, detalle: any, xTitulo: string, template: TemplateRef<any>) {
      const initialState = {titulo: xTitulo};
      this.ds.getDatosDet(detalle[0].Entidad,
        detalle[0].Accion,
        'LegajoConsulta', [{'Lista': Object.entries(elemento).filter(x => x[0] === detalle[0].Lista)[0][1]}
      ]).subscribe(
        res => { this.detalleMostrar.datos =  JSON.parse(res).Datos;
        this.detalleMostrar.titulosGlobales = JSON.parse(res).Titulos[0] ;
        this.modalRef = this.modalService.show( template, Object.assign({}, { class: 'modal-dialog modal-lg', initialState })); }
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
