import { Injectable, signal, WritableSignal } from '@angular/core';
import { Config } from '../interfaces/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: WritableSignal<Config> = signal({
    shippingCost: 100,
    contact: "",
    daysCartDuration: 1
  })

  constructor() { 
    fetch("./../../../assets/config/config.json").then(ans =>{
      ans.json().then(ansJson =>{
        this.config.set(ansJson);
      })
    })
  }
}
