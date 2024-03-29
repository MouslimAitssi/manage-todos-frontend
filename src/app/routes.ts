import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ManageTasksComponent } from "./components/manage-tasks/manage-tasks.component";
import { ManageUsersComponent } from "./components/manage-users/manage-users.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { AuthenticationGuard } from "./guards/authentication.guard";

export const routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'tasks', component: TasksComponent, canActivate: [AuthenticationGuard]},
  { path: 'manage-tasks', component: ManageTasksComponent, canActivate: [AuthenticationGuard]},
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthenticationGuard]},
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }
]
