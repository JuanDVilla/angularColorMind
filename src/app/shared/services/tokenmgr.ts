import { Service } from '@angular/core';

@Service()
export class Tokenmgr {
  setToken(token: string): void{
    sessionStorage.setItem('token',token);
  }

  getToken(){
    return sessionStorage.getItem('token');
  }
}
