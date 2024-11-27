import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-bingo-room',
  templateUrl: './bingo-room.component.html',
  styleUrls: ['./bingo-room.component.css']
})
export class BingoRoomComponent implements OnInit {
  roomId: number = 1;  // Valor quemado para la sala
  userId: number = 1;    // Valor quemado para el jugador
  gameStarted: boolean = false;
  timer: number = 60;    // Tiempo para que el juego comience
  bingoCard: number[][] = [];  // Aún vacío, lo llenaremos con la respuesta de la API
  numbers: string[] = [];  // También vacío, se llenará con la respuesta de la API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.connectToRoom();
    this.startTimer();
  }

  connectToRoom(): void {
    const params = new HttpParams()
      .set('roomId', this.roomId.toString())
      .set('userId', this.userId.toString());

    console.log('Enviando parámetros a la API:', params.toString()); // Verifica que los parámetros son correctos

    this.http.post('http://localhost:8080/api/rooms/connect?roomId=1&playerId=1', params)
      .pipe(
        catchError(error => {
          console.error('Error connecting to room:', error);
          throw error;
        })
      )
      .subscribe((response: any) => {
        console.log('Respuesta del servidor:', response); // Verifica la respuesta que llega

        // Verificar si los datos existen antes de asignarlos
        if (response && response.bingoCard) {
          this.bingoCard = response.bingoCard;
          console.log('Bingo Card:', this.bingoCard);
        }

        if (response && response.numbers) {
          this.numbers = response.numbers;
          console.log('Números sorteados:', this.numbers);
        }

        if (response && response.gameStarted !== undefined) {
          this.gameStarted = response.gameStarted;
          console.log('Estado del juego:', this.gameStarted ? 'Comenzado' : 'Esperando');
        }
      });
  }

  startTimer(): void {
    const interval = setInterval(() => {
      if (this.timer > 0 && !this.gameStarted) {
        this.timer--;
      } else if (this.timer === 0) {
        this.gameStarted = true;
        clearInterval(interval);
      }
    }, 1000);  // Actualiza el timer cada segundo
  }

  disconnect(): void {
    console.log('Desconectando...');
  }
}
