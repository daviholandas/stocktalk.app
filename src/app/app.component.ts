import { Component } from '@angular/core';
import { SignalService } from './services/signal.service';

@Component({
  selector: 'app-root',
  template: '<div><router-outlet></router-outlet></div>',
  
})
export class AppComponent {
  title = 'stocktalk.app';

  constructor(private signalService: SignalService)
  {
    this.signalService.startConnection();
  }
}
