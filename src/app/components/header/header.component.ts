import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private jwtTokenService: JwtTokenService, private router: Router) { }

  ngOnInit(): void {
  }
  openLoginForm() {
    this.dialog.open(LoginComponent);
  }

  logout() {
    this.jwtTokenService.removeToken();
    window.location.reload();
    //this.router.navigateByUrl('home');
  }

  openRegisterForm() {
    this.dialog.open(RegisterComponent);
  }

  getJwtTokenService() {
    return this.jwtTokenService;
  }

}
