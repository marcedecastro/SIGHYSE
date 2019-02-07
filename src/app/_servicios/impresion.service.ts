import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {
  isPrinting = false;
  public encabezado: string;
  public pieDepagina: string;

  constructor(private router: Router) {
    this.encabezado = '';
    this.pieDepagina = '';
   }

  printDocument(documentName: string, datos: string) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, datos]
      }}]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
}
