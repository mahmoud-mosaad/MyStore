import { Injectable } from '@angular/core';
import { Checkout } from '../models/Checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkoutStorage = window.localStorage;

  constructor() { }

  getCheckoutDetails(): Checkout{
    const getCheckout = this.checkoutStorage.getItem('checkout')
    return getCheckout? JSON.parse(getCheckout): {} as Checkout;
  }
  
  addCheckout(checkout: Checkout): void{
    this.checkoutStorage.setItem('checkout', JSON.stringify(checkout));
  }
  
  clearCheckout(): void{
    this.checkoutStorage.removeItem('checkout');
  }

}
