import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService} from 'ngx-toastr';
import {LegajoService} from './../legajo.service';
import {TipoDoc} from './../../_Modelos/TipoDoc';
import {Documento} from './../../_Modelos/Documento';

@Component({
  selector: 'app-documento-list',
  templateUrl: './documento-list.component.html',
  styleUrls: ['./documento-list.component.scss']
})
export class DocumentoListComponent implements OnInit {

  private  tipoDoc: TipoDoc;
  private selectedRow: number;
  private modalRef: BsModalRef;

  constructor(public legajoService: LegajoService,  private modalService: BsModalService, private mensajesService: ToastrService) { }

  ngOnInit() {
   this.tipoDoc = new TipoDoc();
   this.legajoService.EtipoDoc.subscribe(tipoDoc => this.tipoDoc = tipoDoc);
  }

  showForEdit(doc: Documento) {
    this.legajoService.edicion = true;
    this.legajoService.setDocumento( Object.assign({}, doc));
    this.legajoService.habilitaPaneles('Documento');
 }

 showNew() {
  this.legajoService.edicion = true;
  this.legajoService.resetlegajo(false);
  this.legajoService.habilitaPaneles('Documento');
}



onDelete(doc: Documento, template: TemplateRef<any>) {
  this.legajoService.instancia =  Object.assign({}, doc);
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-sm' })
  );
}

confirm(): void {
  // this.message = 'Confirmed!';
   this.modalRef.hide();
   this.legajoService.grabaCabecera(this.legajoService.instancia, 'GrabaBaja');
 }

 decline(): void {
// this.message = 'Declined!';
   this.modalRef.hide();
 }



setClickedRow (index) {
  this.selectedRow = index;
}
}
