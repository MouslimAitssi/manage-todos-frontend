import { Injectable } from '@angular/core';
import { LoginResponse } from '../response/LoginResponse';
import jwt_decode from 'jwt-decode';
import { Roles } from '../enums/Role.enum';

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

  getDecodedToken() {
    if(this.getToken()) {
      let decodedToken = jwt_decode<{sub: string; exp: number; role: Roles}>(this.getToken());
      return decodedToken;
    }
  }
}
