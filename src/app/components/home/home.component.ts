import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ChatRoom } from 'src/app/models/models';
import { ChatsService } from 'src/app/services/chats.service';
import { SignalService } from 'src/app/services/signal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  roomName!:string;
  chatRooms: ChatRoom[] = [];

  constructor(
    private chatService: ChatsService,
    private router: Router,
    private signalService: SignalService
  )
  {}

  ngOnInit(): void {
    this.getAllChats()
  }

  createRoom(name:string){
    this.chatService.createChatRoom({name})
    .subscribe({
      next: response => {
        this.router.navigate(['chat'], {queryParams:{chatName:name} })
      }
    });
  }

  getAllChats(){
    this.chatService.getAllChats()
    .subscribe(data => this.chatRooms = data);
  }

  goToChat(chatName:string){
    this.signalService.addToGroup(chatName);
    this.router.navigate(['chat'], {queryParams:{chatName} } )
  }
}
