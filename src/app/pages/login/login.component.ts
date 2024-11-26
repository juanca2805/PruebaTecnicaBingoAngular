import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login exitoso:', response);
        // Redirige al listado de salas después del login exitoso
        this.router.navigate(['/rooms']);
      },
      error => {
        console.error('Error de login:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }
}
