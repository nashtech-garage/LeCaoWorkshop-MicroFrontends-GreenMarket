import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'common-header-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'common-header-app';

  cartNumberProduct:number = 0;
  cartTotal:number = 0;

  private channel = new BroadcastChannel('CART_HEADER_CHANNEL');

  ngOnInit() {
    this.handleCartUpdated(null, true);
    this.channel.addEventListener('message', (e) => this.handleCartUpdated(e));
  }

  destroy() {
    this.channel.removeEventListener('message', (e) => this.handleCartUpdated(e));
    this.channel.close();
  }

  handleCartUpdated(event?:any, isForceUpdate?:boolean) {
    if (isForceUpdate || (event && (event.data.type === 'CART_UPDATED' || event.data.type === 'ADD_CART_ITEM'))) {
      let currentUserId = 'user_id'; // Todo: Handle get current user_id

      const shoppingCart = JSON.parse(localStorage.getItem(currentUserId) ?? "{}");
      if (Object.keys(shoppingCart).length !== 0) {
        this.cartNumberProduct = shoppingCart.cart_data.length;
        this.cartTotal = shoppingCart.total;
      }

      if (event && event.data.type === 'ADD_CART_ITEM') {
        alert("Product added to cart successfully");
      }
    }
  }
}
