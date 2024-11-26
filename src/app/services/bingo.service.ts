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

    // Establecer la conexión al servidor WebSocket
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/') as IStompSocket;
    };

    this.client.onConnect = () => {
      console.log('Conectado al WebSocket');
    };

    this.client.onStompError = (error) => {
      console.error('Error STOMP:', error);
    };

    this.client.activate(); // Activar la conexión al WebSocket
  }

  // Método para enviar mensajes al servidor WebSocket
  public sendMessage(destination: string, body: string): void {
    if (this.client.connected) {
      this.client.publish({ destination, body });
    }
  }
}
