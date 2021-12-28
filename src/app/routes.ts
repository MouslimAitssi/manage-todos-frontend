import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";

export const routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]
