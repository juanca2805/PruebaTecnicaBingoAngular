import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { RoomDetailComponent } from './pages/room-detail/room-detail.component';
import { GameBoardComponent } from './pages/game-board/game-board.component'; // Ajusta la ruta

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: 'rooms/:id', component: RoomDetailComponent },
  { path: 'game', component: GameBoardComponent },  // Ruta del juego
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
