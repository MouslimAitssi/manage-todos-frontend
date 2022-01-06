import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { UserService } from 'src/app/services/user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { UserTaskRequest } from 'src/app/request/UserTaskRequest';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private taskService: TaskService,
    private jwtTokenService: JwtTokenService,
    private router: Router) {
    this.username = this.jwtTokenService.getDecodedToken().sub
  }
  tasks: Task[];
  todoTasks: Task[] = [];
  username: string;
  doneTasks: Task[] = [];
  isSubmitting: boolean = false;
  ngOnInit(): void {
    this.userService.getTasks(this.username).subscribe((resp: Task[])=> {
      this.tasks = resp;
      for(let task of this.tasks) {
        if(task.done) {
          this.doneTasks.push(task);
        }
        else {
          this.todoTasks.push(task);
        }
      }
    });
  }

  getJwtTokenService() {
    return this.jwtTokenService;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.toggleTask(event.container.data[event.currentIndex])
      this.isSubmitting = true;
      this.taskService.updateTask(event.container.data[event.currentIndex]).subscribe((resp) => {
        if(resp) {
          this.isSubmitting = false;
          //location.reload();
          console.log(resp);
        }
      });
    }
  }

  toggleTask(task) {
    task.done = !task.done;
  }

  addTask() {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        height: '450px',
        width: '400px',
      });
      let instance = dialogRef.componentInstance;
      instance.mode = "CREATE";
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.isSubmitting = true;
          this.userService.addTask(new UserTaskRequest(this.username, result.taskToAdd)).subscribe((response: User) => {
            console.log(response);
            this.isSubmitting = false;
            location.reload();
            //this.reloadComponent();
          });
        }
      });
  }

  updateTask(task: Task) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      height: '450px',
      width: '400px',
    });
    let instance = dialogRef.componentInstance;
    instance.taskToAdd = task.task;
    instance.mode = "UPDATE";
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.taskToAdd != task.task) {
        task.task = result.taskToAdd
        this.isSubmitting = true;
        this.taskService.updateTask(task).subscribe((response: Task) => {
          console.log(response);
          this.isSubmitting = false;
          //location.reload();
          //this.reloadComponent();
        });
      }
    });

  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe((response) => {
      console.log(response);
      location.reload();
    })
  }

}
