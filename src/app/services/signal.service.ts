import { Injectable } from '@angular/core';
import * as singalR from "@microsoft/signalr";
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/models';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private token: string= "";
  private hubConncetion = new singalR.HubConnectionBuilder()
  .withUrl(`${environment.apiUrl}/chats`, {accessTokenFactory: () => this.token})
  .withAutomaticReconnect()
  .configureLogging(singalR.LogLevel.Information)
  .build();

  private messagesSubject = new Subject<Message>();
  
  constructor() { 
    this.token = localStorage.getItem("token") ?? "";
    this.hubConncetion.onclose(async () => await this.startConnection())
    this.listenMessagesChat()
    this.startConnection()
  }

  startConnection(){
    this.hubConncetion
    .start()
    .then(() => console.log("Connection started..."))
    .catch(err => console.log(err))
  }

  addToGroup(nameGroup: string){
    this.hubConncetion.invoke("CreateChatRoom", nameGroup);
  }

  private listenMessagesChat(){
    this.hubConncetion.on("ReceiveMessage", 
    (message) =>{
      this.messagesSubject.next(message)
    })
  }

  sendMessage(groupName:string, message: Message){
    this.hubConncetion.invoke("SendMessages", groupName, message)
  }

  getChatMessage(){
    return this.messagesSubject.asObservable();
  }

}
