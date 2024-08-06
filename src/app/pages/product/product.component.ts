import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  serviceHeader = inject(HeaderService);

  ngOnInit(): void {
    this.serviceHeader.title.set("Producto");
  }
  
}
