import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        alert('Login exitoso!');
        console.log('Respuesta:', response);
      },
      error: (err) => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        console.error(err);
      }
    });
  }
}
