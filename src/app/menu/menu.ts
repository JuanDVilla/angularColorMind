import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserManager } from '../shared/services/userManager';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  private userManager = inject(UserManager);
  private router = inject(Router);

  logged = this.userManager.logged;
  username = this.userManager.username;

  logout() {
    this.userManager.removeToken();
    this.router.navigate(['login']);
  }
}
