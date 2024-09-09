import { Injectable } from '@angular/core';
import { ElementCart } from '../interfaces/elementCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart: ElementCart[] = [];

  constructor() { 
    let cart = localStorage.getItem("shoppingCart");
    if(cart){
      this.shoppingCart = JSON.parse(cart);
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
    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
  }

  empty(){
    this.shoppingCart = [];
    this.updateStorage();
  }

}
