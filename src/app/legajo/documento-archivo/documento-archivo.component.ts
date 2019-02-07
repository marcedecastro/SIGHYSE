import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService} from 'ngx-toastr';
import {LegajoService} from './../legajo.service';
import {Archivo} from '../../_Modelos/Archivo';


@Component({
  selector: 'app-documento-archivo',
  templateUrl: './documento-archivo.component.html',
  styleUrls: ['./documento-archivo.component.scss']
})
export class DocumentoArchivoComponent implements OnInit {

  archivo = new Archivo();
  archivos: Archivo[] = [];
  archivosStr = '';
  archivoIndice: number;
  private modalRef: BsModalRef;
constructor(public legajoService: LegajoService,  private modalService: BsModalService, private mensajesService: ToastrService ) { }

ngOnInit() {
}

onFileChanged(files: FileList ) {
  let i: number;
  let reader: FileReader;
  for ( i = 0; i <= (files.length - 1); i++) {
    console.log ('valor de indice' + i);
    this.archivo.NombreArchivo =  files.item(i).name;
    this.archivo.TipoArchivo = files.item(i).type;
    this.archivo.ArchivoVarChar = '';
    reader = new FileReader();
    reader.readAsArrayBuffer(files.item(i));
    reader.onload = ( event: any) => {
      this.archivo.ArchivoVarChar =  this.ab2str(event.target.result);
      this.archivos.push(this.archivo); this.archivosStr += this.archivo.NombreArchivo + ';'; };
  }
}


onDelete(archivo: Archivo, indice: number, template: TemplateRef<any>) {

  this.archivo = archivo;
  this.archivoIndice = indice;
 //  this.legajoService.instancia.DocumentoId = archivo;
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-sm' }) 
  );
}

confirm(): void {

   this.modalRef.hide();
   this.archivo.LegajoId = this.legajoService.instancia.LegajoId;
   this.archivo.RubroId = this.legajoService.instancia.RubroId;
   this.archivo.TipoDoc = this.legajoService.instancia.TipoDoc;
   this.archivo.Renglon = this.legajoService.instancia.Renglon;
 //  this.archivo.DocumentoId = this.legajoService.instancia.DocumentoId;
   this.legajoService.grabaArchivo (this.archivo, 'GrabaBaja').subscribe( ped => {
    if (JSON.parse(ped).Status[0].Status  === 0) {
     // alert(this.legajoService.instancia.LegajoId);
      this.legajoService.instancia.DocumentosArchivos.splice(this.archivoIndice, 1);
       this.mensajesService.success('archivo ' + this.archivo.NombreArchivo + ' eliminado sactifactoriamente');
      // this.getDocumentos('Documento');
      } else {
         this.mensajesService.error('Error al obtener archivo : ' + JSON.parse(ped).Status[0].Msg);
      }
    });

 }


 decline(): void {
// this.message = 'Declined!';
   this.modalRef.hide();
 }


onDownload(DocumentoId: number) {
  this.legajoService.downloadArchivo(DocumentoId);

}

GrabaArchivos() {

  let i: number;
  let archivo: string;
  let tipo: string;
  for ( i = 0; i < this.archivos.length; i++) {
    this.archivos[i].LegajoId = this.legajoService.instancia.LegajoId;
    this.archivos[i].RubroId = this.legajoService.instancia.RubroId;
    this.archivos[i].TipoDoc = this.legajoService.instancia.TipoDoc;
    this.archivos[i].Renglon = this.legajoService.instancia.Renglon;
    this.archivos[i].DocumentoId = this.legajoService.instancia.DocumentoId;
    archivo = this.archivos[i].NombreArchivo;
    tipo = this.archivos[i].TipoArchivo;
    this.legajoService.grabaArchivo (this.archivos[i], 'Graba').subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
         this.mensajesService.success('archivo' + archivo +  'guardado sactifactoriamente');
         this.archivos = [] ;
         this.archivosStr = '';
         this.legajoService.instancia.DocumentosArchivos.push(
            {DocumentoId: JSON.parse(ped).Datos[0].DocumentoId,
              NombreArchivo: archivo, TipoArchivo: tipo});
        //  this.legajoService.getDocumentos('Documento');
        } else {
           this.mensajesService.error('Error al obtener archivo : ' + JSON.parse(ped).Status[0].Msg);
        }
      });
  }

}

ab2str(buf: any): string {
  const view = new Uint8Array( buf );
  return Array.prototype.join.call(view, ',');
}



}
