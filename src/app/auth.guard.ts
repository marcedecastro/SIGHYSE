
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatosService } from './_servicios/datos.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private ds: DatosService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') != null) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}
