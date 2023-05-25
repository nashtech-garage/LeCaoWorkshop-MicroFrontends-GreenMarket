import {Injectable} from '@angular/core';
import {ShoppingCart} from "../models/shopping-cart.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartSummaryBehavior = new BehaviorSubject<boolean>(false);
  public cartSummaryState: Observable<boolean> = this.cartSummaryBehavior.asObservable();

  private readonly LOCAL_STORAGE_CART_DATA_KEY = 'user_id'; // Todo: Handle get current user_id and update this

  updateCartSummary(isUpdate: boolean = true) {
    this.cartSummaryBehavior
      .next(isUpdate);
  }

  getCartData(): ShoppingCart | null {
    const cartData = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_CART_DATA_KEY) ?? "{}") as ShoppingCart;
    return Object.keys(cartData).length === 0 ? null : cartData;
  }

  updateCartData(cartData: ShoppingCart) {
    const currentCartData = this.getCartData();
    let newCartData = cartData;
    if (currentCartData) {
      newCartData = {
        ...currentCartData,
        ...cartData,
      };
    }
    this.calculateCartTotal(newCartData);
    localStorage.setItem(this.LOCAL_STORAGE_CART_DATA_KEY, JSON.stringify(newCartData));
  }

  private calculateCartTotal(cartData: ShoppingCart) {
    cartData.total = cartData.cart_data.reduce((sum, item) => {
      return (item && item.price && item.quantity)
        ? sum + (item.price * item.quantity)
        : sum;
    }, 0);
  }
}
