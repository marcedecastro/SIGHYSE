import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import {RubrosService} from './../../_servicios/rubros.service';
import { TipoDocDefinicion } from '../../_Modelos/TipoDoc';


@Component({
  selector: 'app-rubro-tipo-docs',
  templateUrl: './rubro-tipo-docs.component.html',
  styleUrls: ['./rubro-tipo-docs.component.scss']
})
export class RubroTipoDocsComponent implements OnInit {
  private periodicidades;
  private formularios;
  private documento: TipoDocDefinicion;
  private modalRef: BsModalRef;
  constructor(public rubroService: RubrosService, private modalService: BsModalService, private mensajesService: ToastrService) {
    this.documento = new TipoDocDefinicion();
  }

  ngOnInit() {
    this.periodicidades = [{'Periodicidad': 1, 'Descripcion': 'Anual'},
    {'Perioicidad': 2, 'Descripcion': 'Semestral'},
    {'Perioicidad': 3, 'Descripcion': 'Trimestral'},
    {'Perioicidad': 4, 'Descripcion': 'Mensual'},
    {'Perioicidad': 10, 'Descripcion': 'Indefinido'}
  ];

    this.formularios = [
      {'Form': '1', 'Descripcion': 'Formulario simple	'},
      {'Form': '2', 'Descripcion': 'Botiquines'},
      {'Form': '3', 'Descripcion': 'Personas'},
      {'Form': '4', 'Descripcion': 'Material de seguridad'},
      {'Form': '5', 'Descripcion': 'Matafuegos'},
    ];

  }

  Volver() {
    this.rubroService.datosVisible = false;
    this.rubroService.listaVisible = true;
    this.rubroService.tipoDocVisible = false;
  }
  showForEdit(doc: TipoDocDefinicion) {

   this.documento =  Object.assign({}, doc);
 }

 resetForm(form?: NgForm) {

  this.documento =  new TipoDocDefinicion();
  if (form != null) {
    form.reset();
  }
}

onSubmit(form: NgForm) {

 this.rubroService.grabaTipoDoc('Graba', this.documento).subscribe(
    res => {
      if (JSON.parse(res).Status[0].Status  === 0) {
        this.mensajesService.success('Tipo de documento guardado sactifactoriamente');

        this.rubroService.getTipoDoc();
        form.resetForm();
      } else {
        this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Tipo de Documento');
      }
     },
     error => { this.mensajesService.error(error); } );

  }

}
