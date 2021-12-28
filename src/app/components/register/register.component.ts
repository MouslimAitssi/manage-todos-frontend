import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {}

  onSubmit() {
    this.user.role = "USER";
    this.userService.createUser(this.user)
    .subscribe((response: User) => {
      this.dialogRef.close();
    });
  }

}
