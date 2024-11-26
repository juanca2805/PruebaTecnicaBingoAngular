import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Verifica si las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const player = { username: this.username, password: this.password };

    this.http.post('http://localhost:8080/player/register', player)
      .subscribe({
        next: (response: any) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error de registro:', err);
          this.errorMessage = 'Hubo un error al registrar el jugador.';
        }
      });
  }
}
