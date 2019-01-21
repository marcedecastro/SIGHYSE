import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import {RubrosService} from './../../_servicios/rubros.service';
import { RubroDefinicion } from '../../_Modelos/Rubro';

@Component({
  selector: 'app-rubro-lista',
  templateUrl: './rubro-lista.component.html',
  styleUrls: ['./rubro-lista.component.scss']
})
export class RubroListaComponent implements OnInit {
  private modalRef: BsModalRef;
  private selectedRow: number;

  constructor(public rubroService: RubrosService, private modalService: BsModalService, private mensajesService: ToastrService ) {
    this.rubroService.listaVisible = true;
    this.rubroService.datosVisible = false;
    this.rubroService.getLista([1, 2, 3, 5]);
  }

  ngOnInit() {
  }
  setClickedRow (index) {
    this.selectedRow = index;
  }

  showNew() {
    this.rubroService.listaVisible = false;
    this.rubroService.datosVisible = true;
    this.rubroService.nuevaInstancia();
  }
  showForEdit(rubro: RubroDefinicion) {

     this.rubroService.listaVisible = false;
     this.rubroService.datosVisible = true;
     this.rubroService.instancia =  Object.assign({}, rubro);
  }

  showtipoDoc(rubro: RubroDefinicion) {
    // this.legajoService.edicion = true;
     this.rubroService.listaVisible = false;
     this.rubroService.tipoDocVisible = true;
     this.rubroService.instancia =  Object.assign({}, rubro);
     this.rubroService.getTipoDoc();
  }

  onDelete(usu: RubroDefinicion, template: TemplateRef<any>) {
    this.rubroService.instancia =  Object.assign({}, usu);
    this.modalRef = this.modalService.show( template,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  confirm(): void {
    // this.message = 'Confirmed!';
     this.modalRef.hide();
     this.rubroService.graba('GrabaBaja').subscribe(
       res => {
         if (JSON.parse(res).Status[0].Status  === 0) {
           this.mensajesService.success('Usuario eliminado sactifactoriamente');
           this.rubroService.getLista();

         } else {
           this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Usuario');
           this.rubroService._mostrarErrores(JSON.parse(res).Mensajes);
         }
        },
        error => { this.mensajesService.error(error); } );
   }

   decline(): void {
 // this.message = 'Declined!';
     this.modalRef.hide();
   }

}
