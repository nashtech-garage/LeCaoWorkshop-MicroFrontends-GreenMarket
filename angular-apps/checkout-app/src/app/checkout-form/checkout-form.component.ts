import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit{
  submitted!: boolean;

  checkOutForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    country:  ['', Validators.required],
    streetAddress: ['', Validators.required],
    optionAddress: [],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postCode: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    newAccount: [],
    accountPassword: ['', Validators.required],
    shipToDifferentAccount: ['', Validators.required],
    orderNotes: ['', Validators.required],
    createAccount: [],
    checkPayment: [],
    paypal: []
  });

  curCartData: any;

  constructor(private formBuilder: FormBuilder, private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.curCartData = this.cartService.getCartData();
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkOutForm.invalid) {
      let yourName = this.checkOutForm.getRawValue().firstName;
      let yourEmail = this.checkOutForm.getRawValue().lastName;
      let yourMessage = this.checkOutForm.getRawValue().email;

      //Submit value

      this.checkOutForm.reset();
    }
  }

  get checkOutFormControl() {
    return this.checkOutForm.controls;
  }
}
