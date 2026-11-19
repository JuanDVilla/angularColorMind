import { Component, inject, signal } from '@angular/core';
import { User } from '../shared/services/user';
import { Tokenmgr } from '../shared/services/tokenmgr';
import { FormsModule } from '@angular/forms';

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

  private usrMgr = inject(User);
  private tokenMgr = inject(Tokenmgr);

  login(): void {
    this.usrMgr.userLogin(this.username, this.password).subscribe({
      next: (response) => {
        let myToken = response.headers.get('Authorization');
        this.tokenMgr.setToken(myToken);
      },
      error: (error) => {
        this.errorMessage.set(error.error);
      }
    });
  }
}
