import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  productList: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

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

  viewProductDetails(skuCode: string) {
    this.router.navigate([`products/${skuCode}`]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe(
      (data) => {
        console.log(data);
        this.goToCart();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
