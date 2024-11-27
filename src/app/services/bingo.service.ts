import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingoService {

  constructor(private http: HttpClient) { }

  connectToRoom(roomId: number, playerId: number): Observable<any> {
    const body = { roomId, playerId };
    return this.http.post<any>('http://localhost:8080/api/rooms/connect', body);
  }
}
