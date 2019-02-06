import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService} from 'ngx-toastr';
import { Edificio} from './../../_Modelos/Edificio';
import {EdificioService} from './../../_servicios/edificio.service';

@Component({
  selector: 'app-edificio-list',
  templateUrl: './edificio-list.component.html',
  styleUrls: ['./edificio-list.component.scss']
})
export class EdificioListComponent implements OnInit {
  private edificios: Edificio[];
  private edificio: Edificio;
  private modalRef: BsModalRef;


  constructor(public edificioService: EdificioService,  private modalService: BsModalService, private mensajesService: ToastrService) { }

  ngOnInit() {
    this.edificioService.listaVisible = true;
    this.edificioService.datosVisible = false;
    this.edificioService.getLista();
  }
  showNew() {
    this.edificioService.listaVisible = false;
    this.edificioService.datosVisible = true;
    this.edificioService.nuevaInstancia();
  }

  showForEdit(edif: Edificio) {
    this.edificioService.listaVisible = false;
    this.edificioService.datosVisible = true;
    this.edificioService.instancia = Object.assign({}, edif);
  }

 /* onDelete(edif: Edificio) {
    this.edificioService.instancia = Object.assign({}, edif);
    this.edificioService.borra();
  }*/
  onDelete(edificio: Edificio, template: TemplateRef<any>) {
    this.edificioService.instancia =  Object.assign({}, edificio);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  confirm(): void {
    // this.message = 'Confirmed!';
     this.modalRef.hide();
     this.edificioService.graba('GrabaBaja').subscribe(
       res => {
         if (JSON.parse(res).Status[0].Status  === 0) {
           this.mensajesService.success('Edificio eliminado sactifactoriamente');
           this.edificioService.getLista();

         } else {
           this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Edificio');
           this.edificioService._mostrarErrores(JSON.parse(res).Mensajes);
         }
        },
        error => { this.mensajesService.error(error); } );
   }

   decline(): void {
 // this.message = 'Declined!';
     this.modalRef.hide();
   }
}
