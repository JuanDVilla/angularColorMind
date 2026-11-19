import { Service, inject } from '@angular/core';
import { BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class User {
  private http = inject(HttpClient);
  private url: string = BASE_URL + '/users/login';

  userLogin(user: string, passwd: string): Observable<any> {
    this.url += '?username=' + user + '&password=' + passwd;
    return this.http.get(this.url, { observe: 'response' });
  }
}
