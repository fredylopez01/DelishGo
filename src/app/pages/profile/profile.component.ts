import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profile } from 'src/app/core/interfaces/profile';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProfileComponent implements OnInit {
  serviceHeader = inject(HeaderService);
  profileService = inject(ProfileService);
  profile:Profile = {
    name: "",
    direction: "",
    phone: "",
    email: "",
    deliveryDetails: ""
  }

  ngOnInit(): void {
    this.serviceHeader.title.set("Perfil");
    if(this.profileService.profile()){
      this.profile = {...this.profileService.profile()!}
    }
  }

  saveProfileDates(){
    this.profileService.saveDates(this.profile);
  }
  
}
