import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Search } from 'src/app/core/interfaces/search';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCardComponent } from "../../core/components/product-card/product-card.component";
import { Product } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent]
})
export class SearchComponent implements OnInit {

  serviceHeader = inject(HeaderService);
  productService = inject(ProductService);
  results : Product[] = [];

  paramsSearching:Search = {
    keyWords: "",
    isCeliac: false,
    isVegan: false
  }

  ngOnInit(): void {
    this.serviceHeader.title.set("Busqueda");
    this.productService.getAllProducts().then(res => this.results = res);
  }

  async search(){
    const results = await this.productService.search(this.paramsSearching);
    this.results = results;
  }
  
}
