import { Component, effect, inject, signal } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  serviceHeader = inject(HeaderService);
  appliedClass = signal("");
  titleDisplayed = signal("");

  hideTitle = effect(() => {
    if(this.serviceHeader.title()){
      this.appliedClass.set("fade-out");
    }
  }, {allowSignalWrites:true})

  showNewTitle(e:AnimationEvent){
    if(e.animationName.includes("fade-out")){
      this.titleDisplayed.set(this.serviceHeader.title());
      this.appliedClass.set("fade-in");
      setTimeout(() => this.appliedClass.set(""), 250);
    }
  }

}
