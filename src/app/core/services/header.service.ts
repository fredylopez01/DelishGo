import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  title = signal("Arcos Dorados");
  isHeaderLarge = signal(false);

  constructor() { }
}
