import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/interfaces/product';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCounterComponent } from "../../core/components/product-counter/product-counter.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCounterComponent]
})
export class ProductComponent implements OnInit {

  serviceHeader = inject(HeaderService);
  productsService = inject(ProductService);
  product?: Product;
  amount = signal(1);

  ngOnInit(): void {
    this.serviceHeader.title.set("Producto");
  }

  constructor(private ac:ActivatedRoute){
    ac.params.subscribe(param =>{
      if(param['id']){
        this.productsService.getProductById(parseInt(param['id'])).then(product =>{
          this.product = product;
          this.serviceHeader.title.set(this.product!.name)
        })
      }
    })
  }
  
}
