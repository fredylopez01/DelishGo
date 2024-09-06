import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  status = [false, false, false, false];
  activeColor = "#aa9595";
  disabledColor = "#fff30ade";

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        switch (event.urlAfterRedirects){
          case "/":
            this.status = [true, false, false, false];
            break;
          case "/search":
            this.status = [false, true, false, false];
            break;
          case "/shoppingCart":
            this.status = [false, false, true, false];
            break;
          case "/profile":
            this.status = [false, false, false, true];
            break;
          default:
            this.status = [true, false, false, false];
            break;
        }
      }
    })
  }

  browse(direction:string){
    this.router.navigate([direction]);
  }

}
