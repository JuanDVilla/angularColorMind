import { Service, inject } from '@angular/core';
import { BASE_URL } from '../constants/constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AttemptResponse } from '../models/attempt';
import { Observable } from 'rxjs';

@Service()
export class Api {
  private http = inject(HttpClient);

  login(user: string, password: string): Observable<any> {
    const url = `${BASE_URL}/users/login?username=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}`;
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

  records(): Observable<any> {
    const url = `${BASE_URL}/scores`;
    return this.http.get(url, { observe: 'response' });
  }

  recordsByUser(username: string): Observable<any> {
    const url = `${BASE_URL}/scores/${username}`;
    return this.http.get(url, { observe: 'response' });
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url = `${BASE_URL}/users`;

    const body = {
      username: username,
      password: password,
      email: email,
    }
    return this.http.post(url, body, { observe: 'response' });
  }

  validateUser(username:string): Observable<any> {
    const url = `${BASE_URL}/users/${username}`;
    return this.http.get(url, { observe: 'response' });
  }



}
