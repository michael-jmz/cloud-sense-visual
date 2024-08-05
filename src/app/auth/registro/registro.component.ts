import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../model/usuario-model';
import { clearScreenDown } from 'readline';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordingUser=false;

  //Inyectamos el servicio
  constructor(private _auth: AuthService, private router: Router) {
    this.usuario = new UsuarioModel();
  }
  ngOnInit(): void {}
  // Aqui recibo el formulario que es de tipo NgForm
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    //envio la informacio y ademas me suscribo para recibir una respuesta dond obtendre le token
    this._auth.register(this.usuario).subscribe(
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
      if(this.recordingUser){
        localStorage.setItem('email', this.usuario.email!);
      }
      this.router.navigateByUrl('login');


      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          title: 'Error al crear',
          icon: 'error',
          text: 'La cuenta ya existe',
        });
      }
    );
  }
}
