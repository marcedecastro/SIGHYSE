import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import {Matafuego} from './../../_Modelos/Matafuego';
import {  MatafuegosService} from './../../_servicios/matafuegos.service';
@Component({
  selector: 'app-matafuegos-lista',
  templateUrl: './matafuegos-lista.component.html',
  styleUrls: ['./matafuegos-lista.component.scss']
})
export class MatafuegosListaComponent implements OnInit {
  private selectedRow: number;
  private titulos: String[];
  private campos;
  modalRef: BsModalRef;
  constructor(public matService: MatafuegosService, private modalService: BsModalService, private mensajesService: ToastrService ) {

   this.matService.listaVisible = true;
   this.matService.datosVisible = false;
   // this.getTitulos([ 7, 9, 10, 11, 12, 13, 14, 15, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
  }

  ngOnInit() {

  }

  onDelete(mat: Matafuego, template: TemplateRef<any>) {
    this.matService.instancia =  Object.assign({}, mat);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  setClickedRow (index) {
    this.selectedRow = index;
  }

  showForEdit(doc: Matafuego) {
   // this.legajoService.edicion = true;
    this.matService.listaVisible = false;
    this.matService.datosVisible = true;
    this.matService.instancia =  Object.assign({}, doc);
 }
  showNew() {
    this.matService.listaVisible = false;
    this.matService.datosVisible = true;
    this.matService.nuevaInstancia();
  }

  confirm(): void {
   // this.message = 'Confirmed!';
    this.modalRef.hide();
    this.matService.graba('GrabaBaja').subscribe(
      res => {
        if (JSON.parse(res).Status[0].Status  === 0) {
          this.mensajesService.success('Matafuego eliminado sactifactoriamente');
          this.matService.getLista();

        } else {
          this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Matafuego');
          this.matService._mostrarErrores(JSON.parse(res).Mensajes);
        }
       },
       error => { this.mensajesService.error(error); } );
  }

  decline(): void {
// this.message = 'Declined!';
    this.modalRef.hide();
  }
}
