import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-product-counter',
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.scss'],
  standalone: true
})
export class ProductCounterComponent {

  amount = signal(1);
  @Output() newAmount = new EventEmitter<number>();

  updateAmount(increase:number){
    this.amount.set(Math.max(this.amount()+increase, 1));
    this.newAmount.emit(this.amount());
  }

}
