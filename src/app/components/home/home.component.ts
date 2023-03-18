import { Component } from '@angular/core';
import { SignalService } from 'src/app/services/signal.service';

export interface ChatRoom{
  id: number,
  name: string,
  quantParticipants: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  roomName!:string

  constructor(private signalService: SignalService)
  {
      this.signalService.getAllGroups();
  }
  
  chatRooms:ChatRoom[] = [
    {id: 10, name:"teste", quantParticipants: 10},
    {id: 1, name:"Stocks", quantParticipants: 30},
    {id: 3, name:"cats", quantParticipants: 1}
  ] 

  createRoom(name:string){
    this.signalService.createChatRoom(name);
  }

  getRooms(){
    console.log(this.signalService.getAllGroups());
  }

}
