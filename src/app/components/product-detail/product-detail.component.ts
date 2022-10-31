import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'))
      this.productService.getProductsData().subscribe(res => {
        this.product = res.filter(p => p.id === id)[0];    
      })
    })
  }

  ngOnInit(): void {}

}
