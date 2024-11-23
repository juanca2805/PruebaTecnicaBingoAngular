import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de rutas
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Para manejar las peticiones HTTP
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para formularios reactivos o basados en plantillas

// Componentes
import { LoginComponent } from './pages/login/login.component'; // Ajusta el path si es necesario
import { HomeComponent } from './pages/home/home.component'; // Si tienes un componente de inicio después del login

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // Declara el componente de login
    HomeComponent,  // Declara el componente de home (u otro después del login)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Asegúrate de importar el módulo de rutas
    HttpClientModule, // Para consumir APIs desde el backend
    FormsModule, // Si usas formularios basados en plantillas
    ReactiveFormsModule, //
  ],
  providers: [],
  bootstrap: [AppComponent], // Punto de entrada principal
})
export class AppModule {}