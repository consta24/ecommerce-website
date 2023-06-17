import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    skuCode: '',
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const skuCode = this.route.snapshot.paramMap.get('skuCode')!;
    this.productService.getProduct(skuCode).subscribe(
      (data) => {
        console.log(data);
        this.product = data;
      },
      (error) => {
        console.error(error);
      }
    );
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
