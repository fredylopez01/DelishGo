import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  serviceHeader = inject(HeaderService);

  ngOnInit(): void {
    this.serviceHeader.title.set("Arcos Dorados");
    this.serviceHeader.isHeaderLarge.set(true);
  }

  ngOnDestroy(): void {
    this.serviceHeader.isHeaderLarge.set(false);
  }
}
