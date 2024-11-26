import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BingoService } from '../services/bingo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bingo-room',
  templateUrl: './bingo-room.component.html',
  styleUrls: ['./bingo-room.component.css']
})
export class BingoRoomComponent implements OnInit, OnDestroy {
timer: any;
disconnect() {
throw new Error('Method not implemented.');
}
  roomId: number = 0;  // Valor predeterminado
  playerId: number = 0; // Valor predeterminado
  bingoCard: number[][] | null = null;
  numbers: number[] = [];
  gameStarted = false;
  private subscriptions: Subscription[] = []; // Para gestionar las suscripciones

  constructor(
    private bingoService: BingoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener roomId y playerId desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const roomId = params['roomId'];
      const playerId = params['playerId'];

      // Verificamos si roomId y playerId están presentes y son números válidos
      if (roomId && !isNaN(roomId)) {
        this.roomId = +roomId;  // Convertir a número
      }

      if (playerId && !isNaN(playerId)) {
        this.playerId = +playerId;  // Convertir a número
      }

      // Unirse a la sala solo si los parámetros son válidos
      if (this.roomId > 0 && this.playerId > 0) {
        // Conectar al servidor para escuchar los eventos SSE
        this.bingoService.connectToRoom(this.roomId);

        // Suscribirse al cartón de bingo
        const bingoCardSub = this.bingoService.getBingoCardObservable().subscribe(card => {
          this.updateBingoCard(card);
        });
        this.subscriptions.push(bingoCardSub);  // Agregar suscripción al array

        // Suscribirse a los números sorteados
        const numbersSub = this.bingoService.getNumbersObservable().subscribe(number => {
          this.updateNumbers(number);
        });
        this.subscriptions.push(numbersSub);  // Agregar suscripción al array

        // Suscribirse a los eventos SSE para iniciar el juego, por ejemplo:
        const eventsSub = this.bingoService.getEventsObservable().subscribe(event => {
          console.log('Evento recibido del servidor:', event);
          if (event === 'start_game') {
            this.gameStarted = true;
          }
        });
        this.subscriptions.push(eventsSub);  // Agregar suscripción al array

      } else {
        console.error('Parámetros inválidos: roomId o playerId no válidos.');
      }
    });
  }

  // Método para actualizar los números sorteados
  updateNumbers(number: number) {
    this.numbers.push(number);
    console.log('Número sorteado:', number);
  }

  // Método para manejar la suscripción a los cartones de bingo
  updateBingoCard(card: number[][]) {
    this.bingoCard = card;
    console.log('Cartón de Bingo recibido:', card);
  }

  // Desuscribirse cuando el componente se destruya
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}


