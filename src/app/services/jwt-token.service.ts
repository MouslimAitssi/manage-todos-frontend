import { Injectable } from '@angular/core';
import { LoginResponse } from '../response/LoginResponse';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  setToken(value: string) {
    sessionStorage.setItem("jwtToken", value);
  }

  getToken() {
    return sessionStorage.getItem("jwtToken");
  }

  removeToken() {
    sessionStorage.removeItem("jwtToken");
  }

  getDecodedToken(): LoginResponse {
    if(this.getToken()) {
      let decodedToken: LoginResponse = jwt_decode(this.getToken());
      return decodedToken;
    }
  }
}
