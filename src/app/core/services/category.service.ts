import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  async getAllCategories(): Promise<Category[]>{
    const answer = await fetch("./../../../assets/data/database.json");
    const jsonAnswer = await answer.json();
    return jsonAnswer;
  }

  async getCategoryById(id:number): Promise<Category | undefined>{
    const answer = await fetch("./../../../assets/data/database.json");
    const jsonAnswer:Category[] = await answer.json();
    const category = jsonAnswer.find(category => category.id === id);
    if(category) return category;
    return
  }
}
