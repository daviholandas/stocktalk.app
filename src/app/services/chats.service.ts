import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatRoom, CreateChatCommand } from '../models/models';
import { SignalService } from './signal.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("token")});
  constructor(
    private http:HttpClient
  ) { }

  createChatRoom(command: CreateChatCommand){
    return this.http.post(`${environment.apiUrl}/chat`, command);
  }

  getAllChats():Observable<ChatRoom[]>{
    return this.http.get<ChatRoom[]>(`${environment.apiUrl}/chat`);
  }

}
