import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'app-product-counter',
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.scss'],
  standalone: true
})
export class ProductCounterComponent implements OnInit {

  amount = signal(1);
  @Output() newAmount = new EventEmitter<number>();
  @Input() initialAmount = 1;

  ngOnInit(){
    this.amount.set(this.initialAmount);
  }

  updateAmount(increase:number){
    this.amount.set(Math.max(this.amount()+increase, 1));
    this.newAmount.emit(this.amount());
  }

}
