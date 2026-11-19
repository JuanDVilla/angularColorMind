import { Component, signal } from '@angular/core';
import { GameInfo } from '../game-info/game-info';

@Component({
  imports: [GameInfo],
  selector: 'app-game',
  styleUrl: './game.css',
  templateUrl: './game.html',
})
export class Game {
  started = signal(false);

  start() {
    this.started.set(true);
  }
}
