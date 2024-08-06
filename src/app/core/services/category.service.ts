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
}
