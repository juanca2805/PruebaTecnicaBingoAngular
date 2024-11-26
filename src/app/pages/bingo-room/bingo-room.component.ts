import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../services/Room.service';
import { BingoService } from '../../services/bingo.service';

@Component({
  selector: 'app-bingo-room',
  templateUrl: './bingo-room.component.html',
  styleUrls: ['./bingo-room.component.css']
})
export class BingoRoomComponent implements OnInit {
  roomId: number = 0;  // Valor predeterminado
  playerId: number = 0; // Valor predeterminado
  bingoCard: number[][] | null = null;
  numbers: number[] = [];
  gameStarted = false;

  constructor(
    private roomService: RoomService,
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
        this.roomService.joinRoom(this.roomId, this.playerId).subscribe(response => {
          console.log(response);

          // Suscribirse al cartón de Bingo
          this.bingoService.subscribeToBingoCard(this.roomId, this.playerId).subscribe(card => {
            this.bingoCard = card;
          });

          // Suscribirse a los números sorteados
          this.bingoService.subscribeToNumbers(this.roomId).subscribe(number => {
            this.numbers.push(number);
            console.log('Número sorteado:', number);
          });
        });
      } else {
        console.error('Parámetros inválidos: roomId o playerId no válidos.');
      }
    });
  }
}
