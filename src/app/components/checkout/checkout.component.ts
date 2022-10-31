import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Checkout } from 'src/app/models/Checkout';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @Output() checkoutSuccess: EventEmitter<string> = new EventEmitter();
  @Input() totalPrice!: number;
  checkoutForm!: FormGroup;
  checkout: Checkout;

  constructor(private checkoutService: CheckoutService) {
    this.checkout = {} as Checkout;
  }

  ngOnInit(): void { 
    this.checkoutForm = new FormGroup({
      fullName: new FormControl(this.checkout.fullName, [
        Validators.required,
        Validators.minLength(3)
      ]),
      address: new FormControl(this.checkout.address, [
        Validators.required,
        Validators.minLength(6)
      ]),
      creditCard: new FormControl(this.checkout.creditCard, [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern("^[0-9]{16}$"),
      ])
    });
  }

  get fullName() {
    return this.checkoutForm.get('fullName')!;
  }

  get address() {
    return this.checkoutForm.get('address')!;
  }

  get creditCard() {
    return this.checkoutForm.get('creditCard')!;
  }

  public validate(): void {
    if (this.checkoutForm.invalid) {
      for (const control of Object.keys(this.checkoutForm.controls)) {
        this.checkoutForm.controls[control].markAsTouched();
      }
      return;
    }
    this.checkout = this.checkoutForm.value;
  }

  onSubmit():void{
    const checkoutDetails = {
      fullName: this.checkout.fullName,
      totalPrice: this.totalPrice
    } as Checkout;
    this.checkoutService.addCheckout(checkoutDetails);
    this.checkoutSuccess.emit();
  }

}
