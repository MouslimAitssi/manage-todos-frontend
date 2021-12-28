import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtTokenService } from '../services/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtTokenService: JwtTokenService,
    private snackBar: MatSnackBar
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.jwtTokenService.getDecodedToken()) {
          // authorised so return true
          return true;
      }
      this.snackBar.open('Please login')._dismissAfter(2000);
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/home']);
      return false;
  }
}
