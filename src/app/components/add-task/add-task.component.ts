import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskToAdd: string;
  mode: string;

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>) { }

  ngOnInit(): void {}

  submit() {
    this.dialogRef.close({taskToAdd: this.taskToAdd})
  }
}
