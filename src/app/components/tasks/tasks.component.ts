import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { UserService } from 'src/app/services/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private userService: UserService, private jwtTokenService: JwtTokenService) { }
  tasks: Task[];
  todoTasks = [];

  doneTasks = [];
  ngOnInit(): void {
    this.userService.getTasks(this.jwtTokenService.getDecodedToken().sub).subscribe((resp: Task[])=> {
      this.tasks = resp;
      for(let task of this.tasks) {
        console.log("task: ", task);
        if(task.done) {
          this.doneTasks.push(task);
        }
        else {
          this.todoTasks.push(task);
        }
      }
      console.log("my tasks: ", this.tasks);
    });
  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
