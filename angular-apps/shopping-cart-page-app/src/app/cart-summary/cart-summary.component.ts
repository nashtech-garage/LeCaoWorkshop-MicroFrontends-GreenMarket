import {Component, Input, OnInit, Output} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ApiService} from "../services/api.service";
import {ShoppingCartItem} from "../models/shopping-cart-item.model";

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  subtotal: number = 0;
  total: number = 0;
  hasCoupon: boolean = false;

  constructor(private cartService: ShoppingCartService, private apiService: ApiService) {}

  ngOnInit() {
    this.updateCartSummary();
    this.cartService.cartSummaryState.subscribe(isUpdated => {
      if (isUpdated) {
        this.updateCartSummary();
      }
    });
  }

  updateCartSummary() {
    const cartData = this.cartService.getCartData();
    if (cartData) {
      const coupons = new Set(cartData.discount_codes.map(d => d.trim().toUpperCase()));
      this.apiService.getCoupons().subscribe(coupon => {
        const validCoupons = coupon.filter(c => !c.IsExpired && coupons.has(c.Code?.trim().toUpperCase() ?? ""));
        const discountAmount = validCoupons.reduce((total, c) => {
          switch (c.Unit) {
            case 'percentage':
              return total + (c.DiscountAmount / 100) * cartData.total;
            default:
              return total;
          }
        }, 0);
        this.subtotal = cartData.total;
        this.total = discountAmount <= this.subtotal ? this.subtotal - discountAmount : 0;
        this.hasCoupon = validCoupons.length !== 0;
      })
    }
  }
}
