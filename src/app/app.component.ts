import { Component } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { TabsComponent } from "./core/components/tabs/tabs.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TabsComponent]
})
export class AppComponent {
  title = 'ProjectFoodAngular';
}
