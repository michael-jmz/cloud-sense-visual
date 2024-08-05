import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../model/usuario-model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario: UsuarioModel = new UsuarioModel();
  recordingUser=false;

  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit(){
    const email = localStorage.getItem('email');
  if (email) {
    this.usuario.email = email;
    this.recordingUser=true;
    console.log(email);
  }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    //Mostramos un loading de Seewt Alert

    //=============================
    this._auth.login(this.usuario).subscribe(
      (resp) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          text: 'Espere por favor...',
        });
        Swal.showLoading();
        setTimeout(() => {
          Swal.close();
        }, 1000); // Espera 1.5 segundos antes de cerrar
        console.log(resp)
        //guardo correo del usuario si seleciona recordar
        if(this.recordingUser){
          localStorage.setItem('email',this.usuario.email!);
        }
        this.router.navigateByUrl('dashboard')

      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          title: 'Error al auntenticar',
          icon: 'error',
          text: 'Credenciales no validas',
        });
      }
    );
  }
}
