import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { Game } from './game/game';
import { Records } from './records/records';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'game', component: Game },
  { path: 'records', component: Records },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
