import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingoService {
  connectToNumbers(roomId: number) {
    throw new Error('Method not implemented.');
  }
  connectToCard // Método para desconectar la conexión SSE
    (roomId: number, playerId: number) {
      throw new Error('Method not implemented.');
  }
  private eventSource: EventSource | null = null;
  private bingoCardSubject = new Subject<number[][]>();
  private numbersSubject = new Subject<number>();
  private eventsSubject = new Subject<string>();

  // Método para conectarse a la sala a través de SSE
  connectToRoom(roomId: number): void {
    this.eventSource = new EventSource(`/api/rooms/${roomId}/bingo/connect`);

    this.eventSource.onmessage = (event) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        if (data.bingoCard) {
          this.bingoCardSubject.next(data.bingoCard);  // Emitir el cartón de bingo
        }
        if (data.numberDrawn) {
          this.numbersSubject.next(data.numberDrawn);  // Emitir el número sorteado
        }
        if (data.event) {
          this.eventsSubject.next(data.event);  // Emitir otros eventos (ej. inicio de juego)
        }
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('Error en la conexión SSE:', error);
      this.eventsSubject.next('Error en la conexión SSE');
    };
  }

  // Observables para suscribirse a los datos
  getBingoCardObservable() {
    return this.bingoCardSubject.asObservable();
  }

  getNumbersObservable() {
    return this.numbersSubject.asObservable();
  }

  getEventsObservable() {
    return this.eventsSubject.asObservable();
  }

  // Método para desconectar la conexión SSE
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
