export class UserTaskRequest {
  username: string;
  task: string;

  constructor(username: string, task: string) {
    this.username = username;
    this.task = task;
  }
}
