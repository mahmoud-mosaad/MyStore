import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.checkoutService.clearCheckout();
    this.productService.getProductsData().subscribe(res => this.products = res);
  }

}
