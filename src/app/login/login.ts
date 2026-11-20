import { Component, inject, signal } from '@angular/core';
import { Api } from '../shared/services/api';
import { Tokenmgr } from '../shared/services/tokenmgr';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage = signal<string | null>(null)

  private api = inject(Api);
  private tokenMgr = inject(Tokenmgr);
  private router = inject(Router);

  login(): void {
    this.api.login(this.username, this.password).subscribe({
      next: (response) => {
        let myToken = response.headers.get('Authorization');
        this.tokenMgr.setToken(myToken);
        this.router.navigate(['/game']);
      },
      error: (error) => {
        this.errorMessage.set(error.error);
      },
    });
  }
}
