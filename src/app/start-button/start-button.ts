import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-start-button',
  styleUrl: './start-button.css',
  templateUrl: './start-button.html',
})
export class StartButton {
  start = output<void>();
}
