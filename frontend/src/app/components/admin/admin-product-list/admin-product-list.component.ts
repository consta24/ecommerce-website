import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css'],
})
export class AdminProductListComponent {
  productList: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.productList = data;
        console.log(this.productList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modifyProduct(skuCode: string) {
    this.router.navigate(['admin/modify', skuCode]);
  }
}
