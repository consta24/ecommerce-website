import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.css'],
})
export class ModifyProductComponent {
  product: Product = new Product('', '', 0, '');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
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

  onSubmit() {
    this.productService
      .modifyProduct(this.route.snapshot.paramMap.get('skuCode')!, this.product)
      .subscribe(
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
