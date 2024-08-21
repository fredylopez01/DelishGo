import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ProductCounterComponent } from "../../core/components/product-counter/product-counter.component";
import { Product } from 'src/app/core/interfaces/product';
import { ProductService } from 'src/app/core/services/product.service';
import { RouterModule } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCounterComponent, RouterModule]
})
export class ShoppingCartComponent implements OnInit {
  serviceHeader = inject(HeaderService);
  shoppingCartService = inject(ShoppingCartService);
  profileService = inject(ProfileService);
  products:Product[] =[];
  productService = inject(ProductService);
  total:number = 0;
  subtotal:number = 0;
  delivery:number = 100;

  ngOnInit(): void {
    this.serviceHeader.title.set("Carrito de Compras");
    this.shoppingCartService.shoppingCart.forEach(async item =>{
      const ans = await this.productService.getProductById(item.idProduct);
      if(ans) this.products.push(ans);
      this.calculateInformation();
    })
  }

  deleteProduct(id:number) {
    this.shoppingCartService.deleteProduct(id);
    this.calculateInformation();
  }

  calculateInformation(){
    this.subtotal = 0;
    for (let i = 0; i < this.shoppingCartService.shoppingCart.length; i++) {
      const elementCart = this.shoppingCartService.shoppingCart[i];
      this.subtotal += this.products[i].price*elementCart.amount;
    }
    this.total = this.subtotal + this.delivery;
  }

  changeAmount(id:number, amount:number){
    this.shoppingCartService.changeAmount(id, amount);
    this.calculateInformation();
  }
  
}
