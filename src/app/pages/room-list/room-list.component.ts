import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/Room.service';
import { Room } from '../../model/room.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = []; 

  userId: number | null = null; // Esto debería estar ligado al valor real del usuario

  newRoomName: string = '';

  constructor(private roomService: RoomService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getAllRooms();
    this.userId = this.authService.getUserId();
    console.log('User ID en RoomListComponent:', this.userId); // Log para verificar el valor del ID
  }

  getAllRooms() {
    this.roomService.getAllRooms().subscribe(
      (data) => {
        this.rooms = data; // Asegúrate de que la respuesta de la API sea un array de objetos tipo 'Room'
      },
      (error) => {
        console.error('Error al obtener las salas', error);
      }
    );
  }

  createRoom() {
    if (!this.newRoomName) {
      return; // No crear si no se especifica un nombre
    }

    this.roomService.createRoom(this.newRoomName).subscribe(
      (response) => {
        this.getAllRooms(); // Recargar las salas después de crear una nueva
        this.newRoomName = ''; // Limpiar el campo de nombre
      },
      (error) => {
        console.error('Error al crear la sala', error);
      }
    );
  }

  joinRoom(roomId: number): void {
    if (this.userId) {
      this.roomService.joinRoom(roomId, this.userId).subscribe({
        next: (response) => {
          console.log('Unido a la sala:', response);
        },
        error: (error) => {
          console.error('Error al unirse a la sala:', error);
        }
      });
    } else {
      console.error('El usuario no está logueado');
    }
  }
  
}
