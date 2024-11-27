import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/player'; // URL base del backend
  private userId: number | null = null; // Inicializamos el userId como null

  constructor(private http: HttpClient) {}

  
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        console.log('Respuesta del backend:', response); // Verifica que el userId esté aquí
        if (response && response.userId) {
          this.userId = response.userId;
          console.log('Usuario logeado con ID:', this.userId); // Verifica que el userId esté aquí
        } else {
          console.log('No se recibió el userId del backend');
        }
      })
    );
  }
  
  

  register(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  getUserId(): number | null {
    return this.userId;
  }

  
}
