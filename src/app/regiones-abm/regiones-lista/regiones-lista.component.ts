import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService} from 'ngx-toastr';
import { Region} from './../../_Modelos/Region';
import {RegionesService} from './../../_servicios/regiones.service';

@Component({
  selector: 'app-regiones-lista',
  templateUrl: './regiones-lista.component.html',
  styleUrls: ['./regiones-lista.component.scss']
})
export class RegionesListaComponent implements OnInit {

  private modalRef: BsModalRef;
  constructor( public regionService: RegionesService,  private modalService: BsModalService, private mensajesService: ToastrService) { }

  ngOnInit() {
    this.regionService.listaVisible = true;
    this.regionService.datosVisible = false;
    this.regionService.getLista();
  }

  showNew() {
    this.regionService.listaVisible = false;
    this.regionService.datosVisible = true;
    this.regionService.nuevaInstancia();
  }

  showForEdit(Reg: Region) {
    this.regionService.listaVisible = false;
    this.regionService.datosVisible = true;
    this.regionService.instancia = Object.assign({}, Reg);
  }

 /* onDelete(Reg: Region) {
    this.regionService.instancia = Object.assign({}, Reg);
    this.regionService.borra();
  }*/
  onDelete(region: Region, template: TemplateRef<any>) {
    this.regionService.instancia =  Object.assign({}, region);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  confirm(): void {
    // this.message = 'Confirmed!';
     this.modalRef.hide();
     this.regionService.graba('GrabaBaja').subscribe(
       res => {
         if (JSON.parse(res).Status[0].Status  === 0) {
           this.mensajesService.success('Region eliminada sactifactoriamente');
           this.regionService.getLista();

         } else {
           this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Regiones');
           this.regionService._mostrarErrores(JSON.parse(res).Mensajes);
         }
        },
        error => { this.mensajesService.error(error); } );
   }

   decline(): void {
 // this.message = 'Declined!';
     this.modalRef.hide();
   }
}
