import { Component, OnInit } from '@angular/core';
import { IProduct } from '../entities/product/product.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  createdProduct: IProduct = null;

  constructor() { }

  onCreatedProduct(createdProduct: IProduct) {
    this.createdProduct = createdProduct;
  }

  ngOnInit(): void {
  }

}
