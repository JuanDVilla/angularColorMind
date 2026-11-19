import { Component } from '@angular/core';
import { GameInfo } from '../game-info/game-info';
import { StartButton } from '../start-button/start-button';

@Component({
  imports: [GameInfo, StartButton],
  selector: 'app-game',
  styleUrl: './game.css',
  templateUrl: './game.html',
})
export class Game {}
