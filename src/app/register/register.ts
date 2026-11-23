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
  username: string = '';
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

    this.api.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        this.username = '';
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

  validateUser(): void {
    console.log('llamado');
    this.api.validateUser(this.username).subscribe({
      next: (response) => {
        this.errorMessage.set('El usuario ya existe.');
      },
    });
  }
}
