import { Component, OnInit, signal } from '@angular/core';

interface Attempt {
  number: number;
  colors: number[];
  blacks: number;
  whites: number;
}

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
  attempts = signal<Attempt[]>([]);

  message = signal('');
  won = signal(false);

  selectColor(index: number) {
    this.message.set('');
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
    if (this.won()) return;

    const valueSlots = [...this.slots()];

    if (this.CURRENT_ATTEMPTS >= this.MAX_ATTEMPS) {
      this.message.set('Llegaste a la cantidad máxima de intentos.');
      this.clear();
      return;
    }

    if (valueSlots.includes(null)) {
      this.message.set('Debes llenar todos los espacios antes de enviar.');
      return;
    }

    const colors = valueSlots as number[];
    const { blacks, whites } = this.evaluate(colors);

    this.CURRENT_ATTEMPTS++;

    this.attempts.update((list) => [
      { number: this.CURRENT_ATTEMPTS, colors, blacks, whites },
      ...list,
    ]);

    this.clear();

    if (blacks === this.MAX_COLORS) {
      this.won.set(true);
      this.message.set('');
      return;
    }

    this.message.set(
      this.CURRENT_ATTEMPTS >= this.MAX_ATTEMPS ? 'Llegaste a la cantidad máxima de intentos.' : '',
    );
  }

  evaluate(attempt: number[]) {
    let blacks = 0;
    let whites = 0;

    const validated: boolean[] = [];

    for (let i = 0; i < attempt.length; i++) {
      let currentValueToVerify = attempt[i];
      if (currentValueToVerify === this.SECRET[i]) {
        blacks++;
        validated[i] = true;
      }
    }

    for (let i = 0; i < attempt.length; i++) {
      let currentValueToVerify = attempt[i];
      if (currentValueToVerify !== this.SECRET[i]) {
        for (let j = 0; j < this.SECRET.length; j++) {
          if (currentValueToVerify === this.SECRET[j] && !validated[j]) {
            whites++;
            validated[j] = true;
            break;
          }
        }
      }
    }

    return { blacks, whites };
  }

  generateSecretCode() {
    for (let i = 0; i < this.MAX_COLORS; i++) {
      const randomColor = Math.floor(Math.random() * this.COLORS.length);
      this.SECRET.push(randomColor);
    }
  }
}
