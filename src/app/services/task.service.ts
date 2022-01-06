import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../model/Task';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private updateTaskUrl = "/tasks/update";
  private getAllTasksUrl = "/tasks/get";
  private getTaskByIdUrl = "/tasks/";
  private createTaskUrl = "/tasks/create";

  constructor(private jwtTokenService: JwtTokenService, private http: HttpClient) { }

  //Don't type this input because (view tasks component)
  updateTask(task): Observable<Task>{
    console.log(task);
    let url = environment.url.concat(this.updateTaskUrl);
    console.log(url);
    const token = this.jwtTokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
    });
    return this.http.put<Task>(url, task, {headers: headers}).pipe(tap((user)=>{console.log(user)}));
  }

}
