import { Component, Input } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CategoryCardComponent {

  @Input({required: true}) category!: Category;
}
