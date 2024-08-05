import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from '../modules/material/material.module';
import { GraficasComponent } from '../componentes/graficas/graficas.component';
import { GraficasMediasComponent } from '../componentes/graficas-medias/graficas-medias.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ContainerSidenavComponent } from './components/sidebar/container-sidenav/container-sidenav.component';

import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { RealTimeComponent } from '../componentes/real-time/real-time.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from '../componentes/footer/footer.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavComponent,
    GraficasComponent,
    ContainerSidenavComponent,
    AnalyticsComponent,
    GraficasMediasComponent,
    RealTimeComponent,
    HomeComponent,
    FooterComponent




  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    AppRoutingModule,

  ],
  exports:[
    SidebarComponent,
    NavComponent,
    AnalyticsComponent,
    GraficasComponent,
    GraficasMediasComponent,
    RealTimeComponent,
    HomeComponent,




  ]
})
export class SharedModule { }
