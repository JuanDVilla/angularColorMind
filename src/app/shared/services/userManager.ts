import { Service, signal } from '@angular/core';

@Service()
export class UserManager {
  logged = signal(!!sessionStorage.getItem('token'));
  username = signal(sessionStorage.getItem('username'));

  setToken(token: string): void{
    sessionStorage.setItem('token',token);
    this.logged.set(true);
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  removeToken(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.username.set(null);
    this.logged.set(false);
  }

  setUser(username: string){
    sessionStorage.setItem('username',username);
    this.username.set(username);
  }

  getUser(){
    return sessionStorage.getItem('username');
  }
}
