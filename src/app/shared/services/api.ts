import { Service, inject } from '@angular/core';
import { BASE_URL } from '../constants/constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AttemptResponse } from '../models/attempt';
import { Observable } from 'rxjs';

@Service()
export class Api {
  private http = inject(HttpClient);

  login(user: string, password: string): Observable<any> {
    const url = `${BASE_URL}/users/login?username=${user}&password=${password}`;
    return this.http.get(url, { observe: 'response' });
  }

  game(): Observable<any> {
    const url = `${BASE_URL}/game`;
    return this.http.post(url, null, { observe: 'response' });
  }

  validateAttempt(attempt: number[]): Observable<HttpResponse<AttemptResponse>> {
    const url = `${BASE_URL}/game/attempt`;
    return this.http.post<AttemptResponse>(url, { guess: attempt }, { observe: 'response' });
  }

}
