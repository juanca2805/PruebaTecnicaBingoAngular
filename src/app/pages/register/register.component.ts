import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de tener este servicio configurado

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.register(this.username, this.password).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        // Redirigir al login después del registro exitoso
      },
      error => {
        console.error('Error de registro:', error);
        this.errorMessage = 'Error al registrar el usuario';
      }
    );
  }
}
