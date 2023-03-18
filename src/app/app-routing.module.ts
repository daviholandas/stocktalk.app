import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'chat', component: ChatComponent, canActivate:[AuthGuard], data:{ chatName: ''}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
