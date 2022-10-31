import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {
  productAvailableQuantity: number[] = this.productService.getProductAvailableQuantity();
  cartProducts: CartProduct[] = [];
  @Input() product!: Product;
  selectedQuantity: number = 1;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProducts();
  }

  quantityChange(id: number, event: any): void{
    this.cartService.changeSelectedQuantityToProduct(id, this.selectedQuantity);
  }

  onSubmit(cartProduct: Product, event: any): boolean{
    let cartProducts: CartProduct[] = this.cartService.getCartProducts();
    let message: string = '';
    let isSameCartQuantitySelected: boolean = false;
    const cartIdx = cartProducts.findIndex(cart => cart.id === cartProduct.id)

    if((cartIdx === -1) || (cartProducts.length === 0)){
      cartProducts.push(Object.assign(cartProduct, {quantity: this.selectedQuantity}))
      message = `${cartProduct.name} added to cart`;
    } else{
      const quantity: number = cartProducts[cartIdx].quantity;
      isSameCartQuantitySelected = this.selectedQuantity === quantity

      if (isSameCartQuantitySelected){
        message = `${quantity} Item(s) of '${cartProduct.name}' already exist in cart.`;
      }else{
        cartProducts[cartIdx].id = cartProduct.id;
        cartProducts[cartIdx].quantity = this.selectedQuantity;
        message = `${quantity} Item(s) of '${cartProduct.name}' already exist in cart. Will be updated to ${this.selectedQuantity}`;
      }
    }
    !isSameCartQuantitySelected? this.cartService.addToCart(cartProducts): null;

    alert(message);

    return false;
  }

}
