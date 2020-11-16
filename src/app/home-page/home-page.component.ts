import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../entities/product/product.model';
import { ProductService } from '../entities/product/product.service';
import { IUser } from '../entities/user/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  noItems: Boolean = false;
  products: Array<IProduct> = [];
  // user: IUser = null;

  // @Input() productToDisplay: IProduct = null;

  constructor(protected productService: ProductService) { }

  ngOnInit(): void {
    this.products = [];
    this.loadAll();
    // this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    // console.log(localStorage.getItem('loggedInUser'));
  }

  private loadAll() {
    this.productService
      .get()
      .then((result: Array<IProduct>) => {
        this.products = result;
        this.noItems = false;
      });
  }

}
