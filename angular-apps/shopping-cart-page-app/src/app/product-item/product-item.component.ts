import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ShoppingCartItem} from "../models/shopping-cart-item.model";
import {environment} from "../../environments/environment";

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: ShoppingCartItem = {};
  @Output() remove: EventEmitter<ShoppingCartItem> = new EventEmitter();

  increaseQuantity() {
    if (this.product?.quantity || this.product?.quantity === 0) {
      this.product.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.product?.quantity && this.product.quantity > 0) {
      this.product.quantity--;
    }
  }

  updateQuantity(event: any) {
    this.product.quantity = +event.target.value;
  }

  removeItem() {
    this.remove.emit(this.product);
  }
}
