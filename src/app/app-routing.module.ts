import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; // Asegúrate de que la ruta al componente sea correcta
import { HomeComponent } from './pages/home/home.component'; // Componente para otras rutas después del login

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: 'home', component: HomeComponent }, // Ruta para el home o dashboard
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirección inicial a login
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
