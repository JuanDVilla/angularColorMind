import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../car/car';

@Component({
  imports: [RouterLink, Car],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  cars = ['#e10600', '#22c55e', '#2563eb', '#facc15', '#f5f5f5'];
}
