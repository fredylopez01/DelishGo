import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductCardComponent } from 'src/app/core/components/product-card/product-card.component';
import { Product } from 'src/app/core/interfaces/product';
import { HeaderService } from 'src/app/core/services/header.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
    RouterModule
  ]
})
export class SectionComponent implements OnInit {

  serviceHeader = inject(HeaderService);
  categoryService = inject(CategoryService);
  ac = inject(ActivatedRoute);
  products: WritableSignal<Product[]> = signal([]);


  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      if(params['id']){
        this.categoryService.getCategoryById(parseInt(params['id']))
        .then(category =>{
          if(category){
            this.products.set(category?.products);
            this.serviceHeader.title.set(category?.name);
          }
        })
      }
    })
  }
  
}
