import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  serviceHeader = inject(HeaderService);

  ngOnInit(): void {
    this.serviceHeader.title.set("Sección");
  }
  
}
