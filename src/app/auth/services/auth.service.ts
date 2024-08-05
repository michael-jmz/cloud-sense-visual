import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../model/usuario-model';
import { map } from 'rxjs';
import { AuthInterfaceResponse } from '../interfaces/authInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Api rest donde tenemos nuestro acceso a firebase
  //https://firebase.google.com/docs/reference/rest/auth?hl=es#section-sign-in-email-password
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private API_KEY = 'AIzaSyAkojkBuiluAIGivHxdOoW66HFHVmcy04M'; //Obtenido desde Clave de API web de firebase proyect
  userToken: string = '';

  // Crar unevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Iniciar sesion
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    //para saber si tenemos un token o no
    this.readToken();
  }

  //=======================Login user===============================================
  login(usuario: UsuarioModel) {
    //lo que vamos a enviar a mi firebase
    const authData = {
      email: usuario.email,
      password: usuario.password,
      //...usuario  podemos mandar todo lo que contaga el usuario
      returnSecureToken: true,
    };
    //demos mandar una peticion post al url y le pasamos el usuario
    return this.http
      .post<AuthInterfaceResponse>(
        `${this.url}/accounts:signInWithPassword?key=${this.API_KEY}`,
        authData
      )
      .pipe(
        map((resp: AuthInterfaceResponse) => {
          this.saveToken(resp['idToken']);
          return resp;
        })
      );
  }
  //===================================Registro Usuarios===========================================================
  register(usuario: UsuarioModel) {
    //lo que vamos a enviar a mi firebase
    const authData = {
      email: usuario.email,
      password: usuario.password,
      //...usuario  podemos mandar todo lo que contaga el usuario
      returnSecureToken: true,
    };
    //demos mandar una peticion post al url y le pasamos el usuario
    return this.http
      .post<AuthInterfaceResponse>(
        `${this.url}/accounts:signUp?key=${this.API_KEY}`,
        authData
      )
      .pipe(
        map((resp: AuthInterfaceResponse) => {
          this.saveToken(resp['idToken']);
          return resp;
        })
      );
  }
  //============================================================================================
  logout() {}

  //=======================guardar token LocalStorage=========================
  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }
  //===========================leer token desde localStorage========================
  private readToken() {
    const token = localStorage.getItem('token');
    this.userToken = token ?? '';
    return this.userToken;
  }
  //===============================Proteccion de rutas=================================
  estaAutenticado():boolean{
    return this.userToken.length > 2;

  }
}
