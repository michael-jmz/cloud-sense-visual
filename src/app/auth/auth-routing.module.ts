import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CallbackComponent } from './callback/callback.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes =[
  {
    path: 'login', component : LoginComponent,
  },
  {
    path: 'logout', component : LogoutComponent,
  },
  {
    path: 'callback', component : CallbackComponent,
  },
  {
    path: 'registro', component : RegistroComponent,
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  // exports: [RouterModule],

})
export class AuthRoutingModule { }
