import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  private eventSource: EventSource | null = null;
  private eventSubject = new Subject<any>(); // Para emitir los eventos al componente

  constructor() {}

  // Método para conectarse a los SSE y escuchar los eventos
  connectToRoom(roomId: number): void {
    const url = `http://localhost:8080/api/rooms/${roomId}/sse`; // Cambia según tu configuración de backend

    // Crea la conexión SSE
    this.eventSource = new EventSource(url);

    // Suscríbete a los eventos entrantes
    this.eventSource.onmessage = (event) => {
      // Aquí puedes procesar cada evento recibido
      this.eventSubject.next(event.data); // Emitir los datos del evento al observable
    };

    // Manejar errores en la conexión
    this.eventSource.onerror = (error) => {
      console.error('Error en la conexión SSE', error);
      this.eventSource?.close();
      this.eventSubject.error(error); // Emitir error en caso de que ocurra
    };
  }

  // Método para obtener los eventos como un Observable
  getEvents() {
    return this.eventSubject.asObservable();
  }

  // Método para desconectar el SSE
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
