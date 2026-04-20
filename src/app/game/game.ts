import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../game/model/Game';
import { GAME_DATA } from '../game/model/mock-games';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  getGames(title?: string, categoryId?: number): Observable<Game[]> {
    return of(GAME_DATA);
  }

  saveGame(game: Game): Observable<void> {
    return of(null);
  }
}
