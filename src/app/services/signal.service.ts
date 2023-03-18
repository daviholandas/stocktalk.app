import { Injectable } from '@angular/core';
import * as singalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private token: string= "";
  private hubConncetion!: singalR.HubConnection
  public roomsNames!: string[];
  
  constructor() { 
    this.token = localStorage.getItem("token") ?? "";
  }

  startConnection(){
    console.log(this.token)
    this.hubConncetion = new singalR.HubConnectionBuilder()
    .withUrl(`${environment.apiUrl}/chats`, {accessTokenFactory: () => this.token, headers:{"Access-Control-Allow-Origin": ""}})
    .configureLogging(singalR.LogLevel.Information)
    .build();

    this.hubConncetion
    .start()
    .then(() => console.log("Connection started..."))
    .catch(err => console.log(err))
  }

  createChatRoom(nameGroup: string){
    this.hubConncetion.invoke("CreateChatRoom", nameGroup);
  }

  getAllGroupsListener(){
    this.hubConncetion.on("getAllGroups", data =>{
      this.roomsNames = data;
      console.log(data);
    } )
  }

  getAllGroups(){
    this.hubConncetion.invoke("GetAllRooms");
  }
}
