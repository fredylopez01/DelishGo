import { Injectable } from '@angular/core';
import { ElementCart } from '../interfaces/elementCart';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart: ElementCart[] = [];

  constructor(private config:ConfigService) { 
    let cart = localStorage.getItem("shoppingCart");
    if(cart){
      const itemSaved = JSON.parse(cart);
      if(itemSaved){
        const dateSaved = new Date(itemSaved.date);
        const dateToday = new Date();
        if(dateToday.getTime() - dateSaved.getTime() > 1000*60*60*24*this.config.config().daysCartDuration){
          this.empty();
        } else {
          this.shoppingCart = itemSaved.products;
        }
      }
    }
  }

  addProduct(id:number, amount: number, notes: string){
    const index = this.shoppingCart.findIndex(product => product.idProduct == id);
    if(index === -1){
      let product: ElementCart = {idProduct: id, amount: amount, notes: notes};
      this.shoppingCart.push(product);
    } else{
      this.shoppingCart[index].amount = amount;
    }
    this.updateStorage();
  }

  deleteProduct(id: number){
    this.shoppingCart = this.shoppingCart.filter(product => product.idProduct !== id);
    this.updateStorage();
  }

  changeAmount(id:number, amount: number){
    const index = this.shoppingCart.findIndex(product => product.idProduct == id);
    if(index !== -1){
      this.shoppingCart[index].amount = amount;
    }
    this.updateStorage();
  }

  updateStorage(){
    const date = new Date();
    const itemToSave = {
      date,
      products: this.shoppingCart
    }
    localStorage.setItem("shoppingCart", JSON.stringify(itemToSave));
  }

  empty(){
    this.shoppingCart = [];
    this.updateStorage();
  }

}
