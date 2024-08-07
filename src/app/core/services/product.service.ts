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

}
