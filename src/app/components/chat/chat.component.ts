import { Component, OnInit } from '@angular/core';
import { SignalService } from 'src/app/services/signal.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private singalService: SignalService
    ){}
  
  
  ngOnInit(): void {
    this.singalService.startConnection();
  }

  messages = [
    { user: 'John', content: 'Hi there!' },
    { user: 'Jane', content: 'Hello!' }
  ];
  
  newMessage!: string;

  sendMessage() {
    this.singalService.createChatRoom("test");
    if (this.newMessage) {
      this.messages.push({ user: 'You', content: this.newMessage });
      this.newMessage = '';
    }
  }
}
