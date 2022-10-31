import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/CartProduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productAvailableQuantity: number[] = this.productService.getProductAvailableQuantity();
  cartProducts: CartProduct[] = [];
  totalPrice: number = 0;

  constructor(private route: Router, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProducts();
    this.calculateTotalPrice();
  }

  quantityChange(id: number, event: any): void{
    const selectedQuantity = event;
    this.cartService.changeSelectedQuantityToProduct(id, selectedQuantity);
    this.calculateTotalPrice()
  }

  removeProductFromCart(id: number): void{
    const cartIdx = this.cartProducts? this.cartProducts.findIndex(cart => cart.id === id): -1;
    if(cartIdx != -1 && this.cartProducts.length > 0){
      this.cartProducts.splice(cartIdx, 1)
      this.cartService.addToCart(this.cartProducts)
      this.calculateTotalPrice()
    }
  }
  
  calculateTotalPrice(): void{
    this.totalPrice = this.cartProducts.reduce((previousValue: number, value: any) =>{
      return previousValue + (Number(value.price) * Number(value.quantity));
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  checkoutSuccess(): void{
    this.cartService.clearCartProducts();
    this.route.navigateByUrl(`confirmation`);
  }

}
