import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<div><router-outlet></router-outlet></div>',

})
export class AppComponent {
  title = 'stocktalk.app';

  constructor()
  {
  
  }
}
