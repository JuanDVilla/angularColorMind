import { Component, inject, signal } from '@angular/core';
import { Api } from '../shared/services/api';
import { UserManager } from '../shared/services/userManager';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage = signal<string | null>(null)

  private api = inject(Api);
  private userManager = inject(UserManager);
  private router = inject(Router);

  login(): void {
    this.api.login(this.username, this.password).subscribe({
      next: (response) => {
        let myToken = response.headers.get('Authorization');
        this.userManager.setToken(myToken);
        this.userManager.setUser(this.username);
        this.router.navigate(['/game']);
      },
      error: (error) => {
        this.errorMessage.set(
          typeof error.error === 'string' && error.error ? error.error : 'No se pudo iniciar sesión.',
        );
      },
    });
  }
}
