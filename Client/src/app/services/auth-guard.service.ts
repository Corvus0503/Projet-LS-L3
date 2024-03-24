import { Injectable } from '@angular/core';
import {  RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  act = this._authService.getUserDetails()

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.getUserDetails() && this.act[0].ACTIVATION == "Activé"){
      return true
    }
    this._router.navigate(['/login'])

    return false
  }
}
