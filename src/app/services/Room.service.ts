import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Asegúrate de importar el AuthService

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/api/rooms'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener todas las salas
  getAllRooms(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear una nueva sala
  createRoom(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });
  }

  // Unirse a una sala
  joinRoom(roomId: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/joinRoom?roomId=${roomId}&userId=${userId}`;
    return this.http.post<any>(url, {}); 
  }
  
  startGame(roomId: number): Observable<any> {
    const params = { roomId: roomId.toString() };
    return this.http.post(`${this.apiUrl}/startGame`, {}, { params });
  }
  
}
