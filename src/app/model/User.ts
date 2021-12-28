import { Roles } from "../enums/Role.enum";
import { Task } from "./Task";

export class User {

   id: number;
   username: string;
   email: string;
   password: string;
   mobile: string;
   role: string;
   tasks: Task[];

   constructor() {
    this.username = "";
    this.email = "";
    this.password = "";
    this.mobile = "";
    this.role = Roles.NORMAL_USER;
    this.tasks = [];
   }
}
