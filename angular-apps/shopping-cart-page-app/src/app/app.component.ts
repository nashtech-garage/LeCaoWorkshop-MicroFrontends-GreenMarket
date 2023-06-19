import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from './services/shopping-cart.service'
import {ApiService} from "./services/api.service";
import {ShoppingCartItem} from "./models/shopping-cart-item.model";

@Component({
  selector: 'shopping-cart-page',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartItems: ShoppingCartItem[] = [];

  constructor(private cartService: ShoppingCartService, private apiService: ApiService) {}

  ngOnInit() { this.refreshCartToLasted(); }

  updateCart() {
    const curCartData = this.cartService.getCartData();
    if (curCartData) {
      curCartData.cart_data = this.cartItems.filter(p => p.quantity !== 0);
      this.cartService.updateCartData(curCartData);
      this.cartService.updateCartSummary();

      const channel = new BroadcastChannel('CART_HEADER_CHANNEL');
      channel.postMessage({ type: 'CART_UPDATED' });
      channel.close();
    }
  }

  private refreshCartToLasted() {
    const curCartData = this.cartService.getCartData();
    if (!curCartData)
      return;

    this.apiService.getAllProducts().subscribe((products) => {
      curCartData.cart_data.map((item) => {
        const product = products.find(p => p.Id == item.id);
        if (product) {
          item.name = product.Name ?? item.name;
          item.price = this.getPriceWithDiscount(product.Price ?? 0, product.DiscountPercentage ?? 0);
          item.priceOriginal = product.Price;
          item.image_link = product.ImageLink ?? item.image_link;
        }
        return item;
      });

      this.cartItems.push(...curCartData.cart_data);
      this.updateCart();
    });
  }

  private getPriceWithDiscount(price: number, discount: number): number {
    return (discount <= 0 || discount > 100) ? price : price * (1 - (discount > 1 ? discount / 100 : discount));
  }
}
