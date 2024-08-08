import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  async getByCategory(id:number): Promise<Product[]>{
    const answer = await fetch("./../../../assets/data/database.json");
    const jsonAnswer:Category[] = await answer.json();
    const products = jsonAnswer.find(category => category.id === id)?.products;
    if(products) return products;
    return [];
  }

  async getAllProducts(): Promise<Product[]>{
    const answer = await fetch("./../../../assets/data/database.json");
    const jsonAnswer:Category[] = await answer.json();
    let products:Product[] = [];
    jsonAnswer.forEach(category => {
      products = [...products, ...category?.products];
    })
    return products;
  }

  async getProductById(id:number): Promise<Product | undefined>{
    const products = await this.getAllProducts();
    const chooseProduct =  products.find(product => product.id == id);
    return chooseProduct ? chooseProduct : undefined;
  }

}
