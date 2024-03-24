import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getUserDetails() {
    if (typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } 
    return
  }

  setDataInLocalStorage(variableName: string, data: any) {
      if (typeof localStorage !== 'undefined') {
          localStorage.setItem(variableName, data);
      }
  }

  getToken() { 
      if (typeof localStorage !== 'undefined') {
          return localStorage.getItem('token');
      } 
      return
  }

  clearStorage() {
      localStorage.clear();
  }
}
