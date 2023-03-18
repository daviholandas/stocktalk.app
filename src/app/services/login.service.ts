import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginInput, UserToken } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  constructor(
    private router: Router,
    private http: HttpClient) 
    {
    }
  
    registerUser(inputLogin: loginInput){
      return this.http.post(`${environment.apiUrl}/auth/register`, inputLogin);
    }

    login(inputLogin: loginInput) : Observable<UserToken | null>{
      localStorage.setItem('user', inputLogin.username);
      return this.http.post<UserToken>(`${environment.apiUrl}/auth/login`, inputLogin);
    }

    setToken(token:string){
      localStorage.setItem("token", token);
    }
}
