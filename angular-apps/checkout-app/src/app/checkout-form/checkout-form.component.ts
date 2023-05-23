import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductModel } from '../model/product-model';

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

  products: ProductModel[] =  [
    { name: "Vegetable's Package", price: 10.00 },
    { name: "Fresh Vegatable", price: 20.00 },
    { name: "Organic Bananas", price: 30.00 },
  ];

  subTotal: number = 0;
  total: number = 0;

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.subTotal = this.products.reduce((sum, current) => sum + current.price, 0);
    this.total = this.products.reduce((sum, current) => sum + current.price, 0)
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
