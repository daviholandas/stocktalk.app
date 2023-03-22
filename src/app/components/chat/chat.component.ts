import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageStock } from 'src/app/models/models';
import { SignalService } from 'src/app/services/signal.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatName:string = 'StockTalk';
  userEmail:string | null = sessionStorage.getItem("user");
  sentAt = new Date().toString();
  basic = false;
  symbol='';
  messageStock!:MessageStock;

  constructor(
    private singalService: SignalService,
    private activeRoute: ActivatedRoute,
    private router:Router
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


  onKeydown(event:KeyboardEvent){
    if(event.key == '/'){
      this.basic = true;
    }
  }

  backToChats(){
    this.router.navigateByUrl('/home');
  }

  searchStocks(){
    this.messageStock = {symbol: this.symbol, sentTo:this.chatName};
    this.singalService.callBot(this.messageStock)
    this.basic = false;
  }
}
