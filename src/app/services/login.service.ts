import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginInput } from '../models/loginInput';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public login!: Observable<loginInput>;

  constructor(
    private router: Router,
    private http: HttpClient) 
    {
    }
  
    registerUser(inputLogin: loginInput){
      return this.http.post(`${environment.apiUrl}/register`, inputLogin);
    }
}
