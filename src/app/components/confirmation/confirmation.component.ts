import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Checkout } from 'src/app/models/Checkout';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  checkoutDetails: Checkout = this.checkoutService.getCheckoutDetails();

  constructor(private route: ActivatedRoute, private checkoutService: CheckoutService) { }

  ngOnInit(): void {}

}
