import { Component, inject, OnInit, signal } from '@angular/core';
import { UserManager } from '../shared/services/userManager';
import { Api } from '../shared/services/api';

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
    this.validateGameOline();
  }

  private tokenManager = inject(UserManager);
  private api = inject(Api);

  MAX_ATTEMPS = 10;
  CURRENT_ATTEMPTS = 0;
  DEFAULT_COLOR = 'rgb(191, 187, 187)';
  MAX_COLORS = 4;

  SECRET: number[] = [];

  COLORS = ['red', 'green', 'blue', 'yellow', 'white'];

  ONLINE_GAME = false;

  slots = signal<(number | null)[]>(Array(this.MAX_COLORS).fill(null));
  attempts = signal<Attempt[]>([]);

  message = signal('');
  localNotice = signal('');
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
    const colors = valueSlots as number[];

    if (valueSlots.includes(null)) {
      this.message.set('Debes llenar todos los espacios antes de enviar.');
      return;
    }

    if (this.CURRENT_ATTEMPTS >= this.MAX_ATTEMPS) {
      this.message.set('Llegaste a la cantidad máxima de intentos.');
      this.clear();
      this.slots.set(this.SECRET);
      return;
    }

    const [blacks, whites] = this.evaluate(colors);

    this.CURRENT_ATTEMPTS++;

    if (blacks === this.MAX_COLORS) {
      this.won.set(true);
      this.message.set('');
      return;
    }

    this.attempts.update((list) => [
      { number: this.CURRENT_ATTEMPTS, colors, blacks, whites },
      ...list,
    ]);

    this.clear();
  }

  sendOnline() {
    const valueSlots = [...this.slots()];
    const colors = valueSlots as number[];

    if (valueSlots.includes(null)) {
      this.message.set('Debes llenar todos los espacios antes de enviar.');
      return;
    }

    this.api.validateAttempt(colors).subscribe({
      next: (response) => {

        const body = response.body;

        const blacks = body?.black_pegs ?? 0;
        const whites = body?.white_pegs ?? 0;
        this.CURRENT_ATTEMPTS = body?. attempt_number ?? this.CURRENT_ATTEMPTS;

        this.attempts.update((list) => [
          { number: this.CURRENT_ATTEMPTS, colors, blacks, whites },
          ...list,
        ]);

        if (body?.solved) {
          this.won.set(true);
          this.message.set('');
          this.CURRENT_ATTEMPTS = body?.attempts_used ?? this.CURRENT_ATTEMPTS;
          return;
        }

        if(body?.finished) {
          this.won.set(false);
          this.message.set(body?.message ?? 'No ');
          return;
        }

        this.clear();
      },
    });
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

    return [blacks, whites];
  }

  generateSecretCode() {
    for (let i = 0; i < this.MAX_COLORS; i++) {
      const randomColor = Math.floor(Math.random() * this.COLORS.length);
      this.SECRET.push(randomColor);
    }
  }

  validateGameOline() {
    if(this.tokenManager.getToken()) {
      this.ONLINE_GAME = true;

      this.api.game().subscribe({
        next: (response) => {
          console.log(response.body);
        },
        error: (error) => {
          if (error.status === 409) {
            this.ONLINE_GAME = false;
            this.localNotice.set(
              'Ya jugaste el desafío actual. Estás jugando de forma local y no se sumarán puntos.',
            );
          }
        },
      });
    }
  }

}
