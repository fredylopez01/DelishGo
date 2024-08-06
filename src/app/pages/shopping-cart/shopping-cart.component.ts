import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  serviceHeader = inject(HeaderService);

  ngOnInit(): void {
    this.serviceHeader.title.set("Carrito de Compras");
  }
  
}
