import { Component, Input, SimpleChanges, computed, signal } from '@angular/core';
import { SidenavService } from '../../../../services/sidenav.service';


export type MenuItem={
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-container-sidenav',
  templateUrl: './container-sidenav.component.html',
  styleUrl: './container-sidenav.component.css'
  })
  export class ContainerSidenavComponent {
  //  _sideNavCollapsed = signal(false);// Crear una señal interna para el estado colapsado

  // @Input() set collapsed(val: boolean) {
  //   this._sideNavCollapsed.set(val); // Actualizar la señal interna cuando cambia la propiedad de entrada
  // }

  constructor(public _sidebarService: SidenavService) {}
  menuItem =  signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label:'Informes',
      route: 'dashboard'
    },
  {
    icon: 'timer',
    label: 'En tiempo real',
    route:'time'
  },

    {
      icon: 'analytics',
      label:'Analytics',
      route: 'analytics'
    },
    {
      icon: 'settings',
      label:'Configuraciones',
      route: 'Configuraciones'
      }
      ]);
      profilePicSize = computed(() => this._sidebarService.isCollapsed() ? '32px' : '100px'); // Crear una señal computada basada en `sideNavCollapsed`
    }


