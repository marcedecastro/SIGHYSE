import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import {Usuario} from './../../_Modelos/Usuario';
import {  UsuariosService} from './../../_servicios/Usuarios.service';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.scss']
})
export class UsuariosListaComponent implements OnInit  {

  private selectedRow: number;
  modalRef: BsModalRef;

  constructor(public usuService: UsuariosService, private modalService: BsModalService, private mensajesService: ToastrService ) {

   this.usuService.listaVisible = true;
   this.usuService.datosVisible = false;
   this.usuService.rolesVisible = false;
   this.usuService.ambitoVisible = false;
    this.usuService.getLista();
  }

  ngOnInit() {

  }

  onDelete(usu: Usuario, template: TemplateRef<any>) {
    this.usuService.instancia =  Object.assign({}, usu);
    this.modalRef = this.modalService.show( template,
      Object.assign({}, { class: 'gray modal-sm' })
    );
  }

  setClickedRow (index) {
    this.selectedRow = index;
  }

  showForEdit(doc: Usuario) {
   // this.legajoService.edicion = true;
    this.usuService.listaVisible = false;
    this.usuService.datosVisible = true;
    this.usuService.instancia =  Object.assign({}, doc);
 }
 showRoles(doc: Usuario) {
  // this.legajoService.edicion = true;
   this.usuService.listaVisible = false;
   this.usuService.rolesVisible = true;
   this.usuService.instancia =  Object.assign({}, doc);
   this.usuService.getRolesUsuario();
}

  showAmbito(doc: Usuario) {
  // this.legajoService.edicion = true;
   this.usuService.listaVisible = false;
   this.usuService.ambitoVisible = true;
   this.usuService.instancia =  Object.assign({}, doc);
   this.usuService.getAmbitos();

}
  showNew() {
    this.usuService.listaVisible = false;
    this.usuService.datosVisible = true;
    this.usuService.nuevaInstancia();
  }

  confirm(): void {
   // this.message = 'Confirmed!';
    this.modalRef.hide();
    this.usuService.graba('GrabaBaja').subscribe(
      res => {
        if (JSON.parse(res).Status[0].Status  === 0) {
          this.mensajesService.success('Usuario eliminado sactifactoriamente');
          this.usuService.getLista();

        } else {
          this.mensajesService.error(JSON.parse(res).Status[0].Msg, 'Usuario');
          this.usuService._mostrarErrores(JSON.parse(res).Mensajes);
        }
       },
       error => { this.mensajesService.error(error); } );
  }

  decline(): void {

    this.modalRef.hide();
  }
}
