import {Component, Input} from '@angular/core';
import {ShoppingCartItem} from "../models/shopping-cart-item.model";
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent {
  @Input() products: ShoppingCartItem[] = [];

  constructor(private cartService: ShoppingCartService) {}

  removeItem(product: ShoppingCartItem) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
      const currentCartData = this.cartService.getCartData();
      if (currentCartData) {
        currentCartData.cart_data = currentCartData.cart_data.filter(p => p.id != product.id);
        this.cartService.updateCartData(currentCartData);
        this.cartService.updateCartSummary();
      }
    }
  }
}
