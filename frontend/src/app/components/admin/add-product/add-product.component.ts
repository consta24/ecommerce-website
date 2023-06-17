import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product: Product = new Product('', '', 0, '');

  constructor(private productService: ProductService, private router: Router) {}

  addProduct() {
    this.productService.addProduct(this.product).subscribe(
      (data) => {
        console.log(data);
        this.goToAdminPanel();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToAdminPanel() {
    this.router.navigate(['admin']);
  }
}
