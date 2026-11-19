import { Component, OnInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-game-info',
  styleUrl: './game-info.css',
  templateUrl: './game-info.html',
})
export class GameInfo {
  maxAttends = 10;
  currentAttends = 0;
  defaultColor = 'rgb(191, 187, 187)';
  MAX_COLORS = 4;

  SECRET = [];

  COLORS = ['red', 'green', 'blue', 'yellow', 'white'];

  selectColor(index: number, color: string) {
    console.log(index, color);

  }
}
