import {ShoppingCartItem} from "./shopping-cart-item.model";

export interface ShoppingCart {
  user_id: string;
  user_name: string;
  cart_data: ShoppingCartItem[];
  discount_codes: string[];
  total: number;
}
