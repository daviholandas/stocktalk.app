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

    registerUser(email:string, password:string){
      return this.http.post(`${environment.apiUrl}/auth/register`, {email, password});
    }

    login(inputLogin: loginInput) : Observable<UserToken | null>{
      sessionStorage.setItem('user', inputLogin.username);
      return this.http.post<UserToken>(`${environment.apiUrl}/auth/login`, inputLogin);
    }

    setToken(token:string){
      sessionStorage.setItem("token", token);
    }
}
