import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  title = signal("");
  isHeaderLarge = signal(false);

  constructor() { }
}
