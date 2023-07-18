import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order.model';
import { OrderDetail } from '../model/order-detail.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit{
  private toastChannel = new BroadcastChannel('TOAST_CHANNEL');
  public apiUrl = environment.apiUrl;
  submitted!: boolean;

  checkoutForm: any = {
    firstName: null,
    lastName: null,
    country: null,
    address: null,
    city: null,
    state: null,
    postcode: null,
    phone: null,
    email: null,
    orderNotes: null
  };

  curCartData: any;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    public router: Router
  ) { }

  destroy() {
    this.toastChannel.close();
  }

  ngOnInit(): void {
    this.curCartData = this.cartService.getCartData();
  }

  onCheckoutSubmit(): void {
    this.submitted = true;
    const { firstName, lastName, country, address, city, state, postcode, phone, email, orderNotes } = this.checkoutForm;

    let orderDetails: OrderDetail[] = [];
    if (this.curCartData && this.curCartData.cart_data.length > 0) {
      this.curCartData.cart_data.forEach((item: any) => {
        orderDetails.push({
          productId: item.id,
          price: item.price,
          priceOriginal: item.priceOriginal,
          productName: item.name,
          quantity: item.quantity
         });
      });
    }

    const orderData: Order = {
      userId: this.curCartData.user_id,
      userName: this.curCartData.user_name,
      total: this.curCartData.total,
      firstName: firstName,
      lastName: lastName,
      country: country,
      address: address,
      city: city,
      state: state,
      postcode: postcode,
      phone: phone,
      email: email,
      orderNotes: orderNotes,
      orderDetails: orderDetails
    };

    this.orderService.checkout(orderData).subscribe(
      data => {
        this.submitted = false;
        console.log(data);
        this.toastChannel.postMessage({
          type: "success",
          message: "Order created successfully"
        });

        // return to home page
        this.router.navigate(['/']);
      },
      err => {
        this.submitted = false;
        console.log(err);
        this.toastChannel.postMessage({
          type: "error",
          message: "Order created failed."
        });
      }
    );
  }
}
