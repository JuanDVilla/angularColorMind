import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../shared/services/api';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  userName: string = '';
  password: string = '';
  email: string = '';
  repeatPassword: string = '';

  errorMessage = signal('');
  successMessage = signal('');

  private passwordInput = viewChild<ElementRef<HTMLInputElement>>('passwordInput');
  private api = inject(Api);
  private router = inject(Router);

  register(): void {
    if (this.password !== this.repeatPassword) {
      this.errorMessage.set('Las contraseñas no coinciden');
      this.password = '';
      this.repeatPassword = '';
      this.passwordInput()?.nativeElement.focus();
      return;
    }
    this.errorMessage.set('');

    this.api.register(this.userName, this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);
        this.userName = '';
        this.password = '';
        this.email = '';
        this.repeatPassword = '';
        this.successMessage.set('Registro exitoso. Dirígete al login para poder jugar.');
      },
      error: (error) => {
        this.errorMessage.set(error.error);
      },
    });
  }
}
