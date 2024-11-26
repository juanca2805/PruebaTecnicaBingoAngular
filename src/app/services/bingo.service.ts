import { Injectable } from '@angular/core';
import { Client, IStompSocket } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingoService {
  private client: Client;
  private cardSubject: Subject<number[][]> = new Subject<number[][]>();  // Emite cartones
  private numberSubject: Subject<number> = new Subject<number>();  // Emite números sorteados

  constructor() {
    this.client = new Client();
    
    // Configuración de la conexión WebSocket
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/') as IStompSocket;
    };

    this.client.onConnect = () => {
      console.log('Conectado al WebSocket');
    };

    this.client.onStompError = (error) => {
      console.error('Error STOMP:', error);
    };

    this.client.activate();  // Activar la conexión WebSocket
  }

  // Método para suscribirse al cartón de Bingo de un jugador
  public subscribeToBingoCard(roomId: number, playerId: number): Observable<number[][]> {
    const destination = `/topic/${roomId}/card/${playerId}`;
    this.client.subscribe(destination, (message) => {
      if (message.body) {
        const bingoCard = JSON.parse(message.body);
        this.cardSubject.next(bingoCard);  // Emitir el cartón recibido
      }
    });

    return this.cardSubject.asObservable();
  }

  // Método para suscribirse a los números sorteados
  public subscribeToNumbers(roomId: number): Observable<number> {
    const destination = `/topic/${roomId}/number`;
    this.client.subscribe(destination, (message) => {
      if (message.body) {
        const number = parseInt(message.body, 10);
        this.numberSubject.next(number);  // Emitir el número sorteado
      }
    });

    return this.numberSubject.asObservable();
  }

  // Método para enviar mensajes al servidor WebSocket
  public sendMessage(destination: string, body: string): void {
    if (this.client.connected) {
      this.client.publish({ destination, body });
    }
  }
}
