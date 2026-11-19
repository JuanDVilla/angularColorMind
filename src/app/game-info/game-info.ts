import { Component, OnInit, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-game-info',
  styleUrl: './game-info.css',
  templateUrl: './game-info.html',
})
export class GameInfo implements OnInit {

  ngOnInit() {
    this.generateSecretCode();
  }

  MAX_ATTEMPS = 10;
  CURRENT_ATTEMPTS = 0;
  DEFAULT_COLOR = 'rgb(191, 187, 187)';
  MAX_COLORS = 4;

  SECRET: number[] = [];

  COLORS = ['red', 'green', 'blue', 'yellow', 'white'];

  slots = signal<(number | null)[]>(Array(this.MAX_COLORS).fill(null));

  selectColor(index: number) {
    const valueSlots = [...this.slots()];
    let free = valueSlots.indexOf(null);

    if (free === -1) return;

    valueSlots[free] = index;
    this.slots.set(valueSlots);
  }

  undo() {
    const valueSlots = [...this.slots()];
    let free = valueSlots.indexOf(null);

    if (free === -1) {
      valueSlots[valueSlots.length - 1] = null;
    } else {
      valueSlots[free - 1] = null;
    }

    this.slots.set(valueSlots);
  }

  clear() {
    this.slots.set(Array(this.MAX_COLORS).fill(null));
  }

  send() {
    const valueSlots = [...this.slots()];

    if (this.CURRENT_ATTEMPTS === this.MAX_ATTEMPS) {
      alert('Llegaste a la cantidad maxima de intentos.');
      this.clear();
      return;
    }

    this.CURRENT_ATTEMPTS++;

    console.log(valueSlots);
  }

  generateSecretCode() {
    for (let i = 0; i < this.MAX_COLORS; i++) {
      const randomColor = Math.floor(Math.random() * this.COLORS.length);
      this.SECRET.push(randomColor);
    }
  }
}
