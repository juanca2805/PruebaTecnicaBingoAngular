import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/Room.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BingoService } from 'src/app/services/bingo.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: any[] = [];
  userId: number | null = null;
  newRoomName: string = '';

  constructor(private roomService: RoomService, private authService: AuthService, private router: Router, private bingoService: BingoService) {}

  
  ngOnInit(): void {
    this.getAllRooms();
    this.userId = this.authService.getUserId();
  }

  goToBingoRoom(roomId: number, userId: number): void {
    this.router.navigate(['/bingo-room'], {
      queryParams: { roomId: roomId, playerId: this.userId }
    });
    
  }

  getAllRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
      },
      error: (error) => {
        console.error('Error al obtener las salas:', error);
      },
    });
  }

  redirectToLogin(): void {
    // Redirige al usuario a la página de login
    window.location.href = '/login';
  }
  

  createRoom(): void {
    if (!this.newRoomName) return;

    this.roomService.createRoom(this.newRoomName).subscribe({
      next: () => {
        this.getAllRooms();
        this.newRoomName = '';
      },
      error: (error) => {
        console.error('Error al crear la sala:', error);
      },
    });
  }

  joinRoom(roomId: number): void {
    if (!this.userId) {
      console.error('El usuario no está logueado');
      return;
    }
  
    // Aquí, después de unirse a la sala, redirigimos a la sala de Bingo
    this.roomService.joinRoom(roomId, this.userId).subscribe({
      next: (response) => {
        console.log('Unido a la sala:', response);
        // Redirigir al componente de bingo con roomId y playerId como parámetros
        this.router.navigate(['/bingo-room'], {
          queryParams: { roomId: roomId, playerId: this.userId }
        });
      },
      error: (error) => {
        console.error('Error al unirse a la sala:', error);
      },
    });
  }

  startGame(roomId: number): void {
    this.roomService.startGame(roomId).subscribe({
      next: (response) => {
        console.log('Juego iniciado:', response);
        alert('El juego se iniciará en 1 minuto.');
      },
      error: (error) => {
        console.error('Error al iniciar el juego:', error);
      },
    });
  }

}
