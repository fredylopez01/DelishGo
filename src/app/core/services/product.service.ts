import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';
import { Search } from '../interfaces/search';

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

  async search(paramsSearching: Search) {
    const products = await this.getAllProducts();
    const filteredProducts = products.filter(product => {
      if(paramsSearching.isCeliac && !product.isCeliac) return false;
      if(paramsSearching.isVegan && !product.isVegan) return false;
      const isSimilarName = product.name.toLowerCase().includes(paramsSearching.keyWords.toLowerCase());
      if(isSimilarName) return true;
      for (let i = 0; i < product.ingredients.length; i++) {
        const ingredient = product.ingredients[i];
        if(ingredient.toLowerCase().includes(paramsSearching.keyWords.toLowerCase())){
          return true;
        }
      }
      return false;
    })
    return filteredProducts;
  }

}
