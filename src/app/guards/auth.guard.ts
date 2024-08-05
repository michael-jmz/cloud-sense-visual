import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard: Verificando autenticación...');
    if (this.authService.estaAutenticado()) {
      return true;
    } else {
      console.log('AuthGuard: Usuario no autenticado, redirigiendo a /login');
      this.router.navigateByUrl('/login');
      return false;
    }
  }


}



// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
