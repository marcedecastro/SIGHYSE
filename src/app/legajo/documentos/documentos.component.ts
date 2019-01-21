// librerias de angular
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// control DatePicker de libreria ngx-bootstrap
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {LegajoService} from './../legajo.service';
import { Documento } from '../../_Modelos/Documento';
// import { saveAs } from 'file-saver';


@Component({
  selector: 'app-legajo-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {
  dpkConf: Partial<BsDatepickerConfig>;
  selectedFile: File;
  // xbinaryString: string;
  tipoDoc;

  constructor(public legajoService: LegajoService, private bsLs: BsLocaleService) {
    // configuracion de los controles DatePicker para estilo y lenguaje
    this.dpkConf = Object.assign({}, {containerClass: 'theme-default', showWeekNumbers: false, dateInputFormat: 'DD/MM/YYYY'});
    this.bsLs.use('es');
  }

  ngOnInit() {
    this.legajoService.EtipoDoc.subscribe(
      tipoDoc => {this.tipoDoc = tipoDoc; this.nuevoDoc(); });
  }

  nuevoDoc() {
    const doc =  new Documento();
    doc.LegajoId = this.tipoDoc.LegajoId;
    doc.RubroId = this.tipoDoc.RubroId;
    doc.TipoDoc = this.tipoDoc.TipoDocDefinicion[0].TipoDoc;
    this.legajoService.instancia = doc;
  }

  onSubmit(form: NgForm) {

    if (this.legajoService.instancia.Renglon === undefined) {
      this.legajoService.instancia.Renglon = this.tipoDoc.Documentos.length + 1;
      this.legajoService.instancia.FechaDesde = this.legajoService.instancia.FechaDesde.toLocaleDateString();
      this.legajoService.instancia.FechaHasta = this.legajoService.instancia.FechaHasta.toLocaleDateString();
    } else {
      this.legajoService.instancia.FechaDesde = this.legajoService.instancia.FechaDesde.toLocaleString();
      this.legajoService.instancia.FechaHasta = this.legajoService.instancia.FechaHasta.toLocaleString();
    }
    this.legajoService.grabaCabecera( this.legajoService.instancia, 'Graba');
  }

  resetForm(rollback: boolean) {
    this.legajoService.resetlegajo(rollback);
    this.legajoService.habilitaPaneles('Lista');

  }
}
