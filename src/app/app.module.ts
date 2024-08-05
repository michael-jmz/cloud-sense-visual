import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MaterialModule } from './modules/material/material.module';

import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RealTimeComponent } from './componentes/real-time/real-time.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environments } from './environments/environments';
import { RegistroComponent } from './auth/registro/registro.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FooterComponent } from './componentes/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    CallbackComponent,
    RegistroComponent,
    InicioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),

    //Inciciliza nuestro poryecto
    //{"projectId":"angular-auth-6080b","appId":"1:397057817909:web:b4b12ae61463f72599207c","storageBucket":"angular-auth-6080b.appspot.com","apiKey":"AIzaSyAkojkBuiluAIGivHxdOoW66HFHVmcy04M","authDomain":"angular-auth-6080b.firebaseapp.com","messagingSenderId":"397057817909","measurementId":"G-KBBBLQ5DF3"}
    provideFirebaseApp(() => initializeApp(environments.firebaseConfig)),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
