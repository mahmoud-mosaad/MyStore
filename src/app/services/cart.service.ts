import { Injectable } from '@angular/core';
import { CartProduct } from '../models/CartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartStorage = window.localStorage;

  constructor() { }

  getCartProducts(): CartProduct[] | []{
    const getProduct = this.cartStorage.getItem('cart')
    return getProduct? JSON.parse(getProduct): [];
  }
  
  addToCart(product: CartProduct[]): void{
    this.cartStorage.setItem('cart', JSON.stringify(product));
  }
  
  clearCartProducts(): void{
    this.cartStorage.removeItem('cart');
  }

  changeSelectedQuantityToProduct(id: number, selectedQuantity: number): void{
    const cartProducts: CartProduct[] = this.getCartProducts();
    const cartIdx = cartProducts.findIndex(cart => cart.id === id);
    if (cartIdx != -1 && cartProducts.length > 0) cartProducts[cartIdx].quantity = selectedQuantity;
    if (cartProducts.length > 0) this.addToCart(cartProducts);
  }

}
