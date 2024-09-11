import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ProductCounterComponent } from "../../core/components/product-counter/product-counter.component";
import { Product } from 'src/app/core/interfaces/product';
import { ProductService } from 'src/app/core/services/product.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCounterComponent, RouterModule, ClipboardModule]
})
export class ShoppingCartComponent implements OnInit {

  serviceHeader = inject(HeaderService);
  shoppingCartService = inject(ShoppingCartService);
  profileService = inject(ProfileService);
  productService = inject(ProductService);
  router = inject(Router);
  configService = inject(ConfigService);

  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;

  products:WritableSignal<Product[]> = signal([]);
  total:number = 0;
  subtotal:number = 0;
  delivery:number = this.configService.config().shippingCost;
  message:string = "";
  order:string = "";

  ngOnInit(): void {
    this.serviceHeader.title.set("Carrito de Compras");
    this.shoppingCartService.shoppingCart.forEach(async item =>{
      const ans = await this.productService.getProductById(item.idProduct);
      if(ans) this.products.set([...this.products(), ans]);
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
      if(this.products()[i]){
        this.subtotal += this.products()[i].price*elementCart.amount;
      }
    }
    this.total = this.subtotal + this.delivery;
    this.updateOrder();
  }

  changeAmount(id:number, amount:number){
    this.shoppingCartService.changeAmount(id, amount);
    this.calculateInformation();
  }

  async updateOrder(){
    this.order = "";
    for (let i = 0; i < this.shoppingCartService.shoppingCart.length; i++) {
      let product = await this.productService.getProductById(this.shoppingCartService.shoppingCart[i].idProduct);
      this.order += `* ${this.shoppingCartService.shoppingCart[i].amount} X ${product?.name}. ${this.shoppingCartService.shoppingCart[i].notes}
`;
    }
  }

  createMessage(){
    this.message = `
Hola! Soy ${this.profileService.profile()?.name}, y te quiero hacer el siguiente pedido:

${this.order}
Si te quieres comunicar conmigo lo puedes hacer a este número o al ${this.profileService.profile()?.phone}.
La dirección de envió es: ${this.profileService.profile()?.direction}.
Y por favor: ${this.profileService.profile()?.deliveryDetails}

Muchas gracias.
`;
  }

  async sendMessage(){
    this.createMessage();
    const link = `https://wa.me/${this.configService.config().contact}?text=${encodeURI(this.message)}`;
    window.open(link, "_blank");
    this.dialog.nativeElement.showModal();
  }

  endDelivery(){
    this.shoppingCartService.empty();
    this.dialog.nativeElement.close();
    this.router.navigate(['/']);
  }

  editDelivery(){
    this.dialog.nativeElement.close();
  }

  copyMessage():string{
    this.createMessage();
    return this.message;
  }
  
}
