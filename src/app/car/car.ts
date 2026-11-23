import { Component, input } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.html',
  styleUrl: './car.css',
})
export class Car {
  color = input.required<string>();
}
