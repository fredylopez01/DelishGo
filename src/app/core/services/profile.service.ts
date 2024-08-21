import { Injectable, signal, WritableSignal } from '@angular/core';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: WritableSignal<Profile | undefined> = signal(undefined);

  constructor() {
    const profileLS = localStorage.getItem('profile');
    if(profileLS) this.profile.set(JSON.parse(profileLS));
   }

  saveDates(profile:Profile){
    localStorage.setItem('profile', JSON.stringify(profile));
    this.profile.set(profile);
  }
}
