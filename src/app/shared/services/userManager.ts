import { Service } from '@angular/core';

@Service()
export class UserManager {
  setToken(token: string): void{
    sessionStorage.setItem('token',token);
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  setUser(username: string){
    sessionStorage.setItem('username',username);
  }

  getUser(){
    return sessionStorage.getItem('username');
  }
}
