import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private deleteTaskUrl = "/tasks/delete";


  constructor(private jwtTokenService: JwtTokenService, private http: HttpClient) { }

  //Don't type the task in the input because (view tasks component)
  updateTask(task): Observable<Task>{
    console.log(task);
    let url = environment.url.concat(this.updateTaskUrl);
    console.log(url);
    const token = this.jwtTokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
    });
    return this.http.put<Task>(url, task, {headers: headers});

  }

  deleteTask(task: Task) {
    console.log(task);
    let url = environment.url.concat(this.deleteTaskUrl).concat("/").concat(task.id.toString());
    console.log(url);
    const token = this.jwtTokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
    });
    return this.http.delete<void>(url, {headers: headers});
  }
}
