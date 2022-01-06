import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Roles } from 'src/app/enums/Role.enum';
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
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '300px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.router.navigateByUrl('tasks');
      }
    })
  }

  logout() {
    this.jwtTokenService.removeToken();
    window.location.reload();
    //this.router.navigateByUrl('home');
  }

  openRegisterForm() {
    this.dialog.open(RegisterComponent, {
      height: '500px',
      width: '500px',
    });
  }

  getJwtTokenService() {
    return this.jwtTokenService;
  }

  isAdmin() {
    if(this.getJwtTokenService().getDecodedToken()) {
      return (this.getJwtTokenService().getDecodedToken().role===Roles.ADMIN);
    }
  }

  isNormalUser() {
    /* if(this.getJwtTokenService().getDecodedToken()) {
      return (this.getJwtTokenService().getDecodedToken().role===Roles.NORMAL_USER || this.getJwtTokenService().getDecodedToken().role===Roles.ADMIN);
    } */
    return (this.getJwtTokenService().getDecodedToken());
  }

}
