import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginRequest } from 'src/app/request/LoginRequest';
import { LoginResponse } from 'src/app/response/LoginResponse';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: ''/*, remember: false*/};

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private loginService: LoginService, private jwtTokenService: JwtTokenService) { }

  ngOnInit() {}

  onSubmit() {
    console.log('User: ', this.user);
    this.loginService.login(new LoginRequest(this.user.username, this.user.password))
    .subscribe((response) => {
      console.log(response)
      this.jwtTokenService.setToken(response.jwt);
      this.dialogRef.close();
    });
  }
}
