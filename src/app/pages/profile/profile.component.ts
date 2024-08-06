import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  serviceHeader = inject(HeaderService);

  ngOnInit(): void {
    this.serviceHeader.title.set("Perfil");
  }
  
}
