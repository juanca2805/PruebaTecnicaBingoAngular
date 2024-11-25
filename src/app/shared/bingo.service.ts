import { Injectable } from '@angular/core';
import { Client, IStompSocket } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  private client: Client;

  constructor() {
    this.client = new Client();

    // Convertir SockJS a IStompSocket
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/bingo') as IStompSocket;
    };

    this.client.onConnect = () => {
      console.log('Connected to WebSocket');
    };

    this.client.onStompError = (error) => {
      console.error('STOMP Error:', error);
    };

    this.client.activate();
  }

  public sendMessage(destination: string, body: string): void {
    if (this.client.connected) {
      this.client.publish({ destination, body });
    }
  }
}
