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
    /* console.log(event.previousContainer === event.container);
    console.log(event.container); */
    /* event.container.entered.subscribe((element)=> {
      console.log(element);
    }); */
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
          location.reload();
          console.log(resp);
        }
      });
    }
  }

  toggleTask(task) {
    task.done = !task.done;
  }

  addTask()  {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        height: '600px',
        width: '400px',
      });
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
      height: '600px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.isSubmitting = true;
        this.taskService.updateTask(task).subscribe((response: Task) => {
          console.log(response);
          this.isSubmitting = false;
          location.reload();
          //this.reloadComponent();
        });
      }
    });

  }

  reloadComponent() {
    this.router.navigateByUrl('/tasks').then(()=>{this.router.navigateByUrl('/tasks')})
  }

}
