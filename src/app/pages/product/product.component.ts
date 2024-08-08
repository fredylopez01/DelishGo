import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/interfaces/product';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductComponent implements OnInit {

  serviceHeader = inject(HeaderService);
  productsService = inject(ProductService);
  product?: Product;

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
