import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ProductCounterComponent } from "../../core/components/product-counter/product-counter.component";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCounterComponent]
})
export class ShoppingCartComponent implements OnInit {
  serviceHeader = inject(HeaderService);
  shoppingCartService = inject(ShoppingCartService);

  ngOnInit(): void {
    this.serviceHeader.title.set("Carrito de Compras");
  }

  deleteProduct(id:number) {
    this.shoppingCartService.deleteProduct(id);
  }
  
}
