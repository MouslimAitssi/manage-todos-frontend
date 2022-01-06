import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../model/Task';
import { User } from '../model/User';
import { UserTaskRequest } from '../request/UserTaskRequest';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = "/users";
  addUserUrl = "/users/create";
  addTaskUrl = "/task/add"
  constructor(
    private jwtTokenService: JwtTokenService,
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  getAllUsers(): Observable<User[]> {
    let url = environment.url.concat(this.usersUrl).concat("/get");
    console.log(url);
    const token = this.jwtTokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
    });
    return this.http.get<User[]>(url, {headers: headers}).pipe(tap((users)=>{console.log(users)}));
  }

  getUser(username: string): Observable<User[]> {
    let url = environment.url.concat(this.usersUrl).concat(username);
    console.log(url);
    const token = this.jwtTokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
    });
    return this.http.get<User[]>(url, {headers: headers}).pipe(tap((user)=>{console.log(user)}));
  }

  createUser(user: User): Observable<User> {
    let url = environment.url.concat(this.addUserUrl);
    console.log(url);
    return this.http.post<User>(url, user).pipe(tap((response)=>{
      this.snackBar.open('Registered successfully!')._dismissAfter(2000);
    }));
  }

  getTasks(username: string): Observable<Task[]> {
    let url = environment.url.concat(this.usersUrl).concat("/task/get/").concat(username);
    console.log(url);
    const token = this.jwtTokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
    });
    return this.http.get<Task[]>(url, {headers: headers}).pipe(tap((tasks)=>{console.log(tasks)}));
  }

  addTask(userTaskRequest: UserTaskRequest): Observable<User>{
    console.log(userTaskRequest);
    let url = environment.url.concat(this.usersUrl).concat(this.addTaskUrl);
    console.log(url);
    const token = this.jwtTokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
    });
    return this.http.put<User>(url, userTaskRequest, {headers: headers}).pipe(tap((user)=>{console.log(user)}));
  }

}
