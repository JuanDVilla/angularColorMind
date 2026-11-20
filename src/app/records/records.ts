import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { UserManager } from '../shared/services/userManager';
import { Api } from '../shared/services/api';

@Component({
  imports: [DatePipe, NgTemplateOutlet],
  selector: 'app-records',
  styleUrl: './records.css',
  templateUrl: './records.html',
})
export class Records implements OnInit {
  private userManager = inject(UserManager);
  private api = inject(Api);

  USER_EXISTS = false;
  records = signal<any[]>([]);
  recordsUser = signal<any[]>([]);

  ngOnInit() {
    this.validateUserExist();
    this.loadRecords();
  }

  validateUserExist() {
    if (this.userManager.getToken()) {
      this.USER_EXISTS = true;
      const username = this.userManager.getUser() ?? '';
      this.api.recordsByUser(username).subscribe({
        next: (response) => {
          this.recordsUser.set(response.body ?? []);
        },
        error: (err) => console.error('Error cargando records de ususario', err),
      });
    }
  }

  loadRecords() {
    this.api.records().subscribe({
      next: (response) => {
        this.records.set(response.body ?? []);
      },
      error: (err) => console.error('Error cargando records', err),
    });
  }
}
