import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficasComponent } from './componentes/graficas/graficas.component';
import { AnalyticsComponent } from './shared/pages/analytics/analytics.component';
import { RealTimeComponent } from './componentes/real-time/real-time.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HomeComponent } from './shared/components/home/home.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { LoginComponent } from './auth/login/login.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  // {
  //   path : 'auth',
  //   loadChildren: ()=> import ('./auth/auth.module').then(m => m.AuthModule)
  // },
  {path:'',redirectTo:'login',pathMatch: 'full',},
  {path: 'login', component : LoginComponent,},
  {path: 'logout', component : LogoutComponent,},
  {path: 'callback', component : CallbackComponent,},
  {path: 'registro', component : RegistroComponent,},
  {
    path: '',
    component: SidebarComponent,canActivate:[AuthGuard], // Cargar el SidebarComponent
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: GraficasComponent },
      { path: 'time', component: RealTimeComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: '**', redirectTo: 'dashboard' } // redirige al dashboard para cualquier otra ruta
    ]
  }
];
//   {
//     path: 'dashboard',
//     component:GraficasComponent
//   },
//   {
//     path:'time',
//     component: RealTimeComponent

//   },
//   {
//     path: 'analytics',
//     component: AnalyticsComponent
//   },
//   {
//     path: '**',
//     redirectTo: 'dashboard' // redirige al dasboard para caulquier otra ruta
//   }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
