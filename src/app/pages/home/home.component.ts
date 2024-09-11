import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryCardComponent } from 'src/app/core/components/category-card/category-card.component';
import { Category } from 'src/app/core/interfaces/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports:[CategoryCardComponent, CommonModule, RouterModule]
})
export class HomeComponent implements OnInit, OnDestroy {

  serviceHeader = inject(HeaderService);
  categoriesService = inject(CategoryService);
  categories: WritableSignal<Category[]> = signal([]);

  ngOnInit(): void {
    this.serviceHeader.title.set("Bienvenido");
    this.serviceHeader.isHeaderLarge.set(true);
    this.categoriesService.getAllCategories().then(res => this.categories.set(res));
  }

  ngOnDestroy(): void {
    this.serviceHeader.isHeaderLarge.set(false);
  }
}
