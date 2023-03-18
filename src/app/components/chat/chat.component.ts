import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/models';
import { SignalService } from 'src/app/services/signal.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatName:string = 'StockTalk';
  userEmail:string | null = localStorage.getItem("user");
  sentAt = new Date().toString();

  constructor(
    private singalService: SignalService,
    private activeRoute: ActivatedRoute
    ){
    }
  
  
  ngOnInit(): void {
    this.activeRoute.queryParams
    .subscribe(
      data => this.chatName = data['chatName'])
    this.singalService.addToGroup(this.chatName);
    this.singalService.getChatMessage().subscribe({next: data => this.messages.push(data)})
  }

  messages:Message[] = [];
  
  newMessage!: string;

  sendMessage() {
    
    this.singalService.sendMessage(this.chatName, {sentTo: this.userEmail, body: this.newMessage, sentAt:this.sentAt})
    if (this.newMessage) {
      this.newMessage = '';
    }
  }

  receiveMessage(){
    console.log("chamou")
  }

  onKeydown(event:any){
    console.log(event)
  }
}
