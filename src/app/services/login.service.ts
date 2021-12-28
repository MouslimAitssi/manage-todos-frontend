import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../request/LoginRequest';
import { LoginResponse } from '../response/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginPath: string = "/login";

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  login(request: LoginRequest) {
    console.log(request);
    let url = environment.url.concat(this.loginPath);
    console.log(url);
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  })
    return this.http.post<LoginResponse>(url, request, {headers: headers}).pipe(tap((response)=>{
      console.log(response);
      this.snackBar.open('Logged in successfully!!')._dismissAfter(2000);
    }));
  }

}
