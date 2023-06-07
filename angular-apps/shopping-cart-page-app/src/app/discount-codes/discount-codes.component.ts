import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ApiService} from "../services/api.service";
import {CartSummaryComponent} from "../cart-summary/cart-summary.component";

@Component({
  selector: 'app-discount-codes',
  templateUrl: './discount-codes.component.html',
  styleUrls: ['./discount-codes.component.css']
})
export class DiscountCodesComponent implements OnInit {

  @ViewChild('textCoupons') textCoupons: any;

  coupons: string = "";
  hasInvalidCoupon: boolean = false;
  isEmptyInput: boolean = false;

  invalidMessage: string = "The invalid coupon has been removed";
  emptyInputMessage: string = "Please input coupon";

  constructor(private cartService: ShoppingCartService, private apiService: ApiService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const currentCartData = this.cartService.getCartData();
    if (currentCartData) {
      const curCoupons = new Set(currentCartData.discount_codes.map(d => d.trim().toUpperCase()));
      this.coupons = [...curCoupons].join(',');
    }
  }

  addCoupon(inputCoupons: string) {
    const currentCartData = this.cartService.getCartData();
    this.isEmptyInput = false;
    this.hasInvalidCoupon = false;

    if (currentCartData) {
      currentCartData.discount_codes = [];
      if (!inputCoupons || inputCoupons.trim().length === 0) {
        this.cartService.updateCartData(currentCartData);
        this.cartService.updateCartSummary();
        this.isEmptyInput = true;
        return;
      }

      const lstCoupons = new Set(inputCoupons.split(",").map(c => c.trim().toUpperCase()));
      this.apiService.getCoupons().subscribe(coupons => {
        const validCoupons = coupons.filter(c => !c.IsExpired && lstCoupons.has(c.Code?.trim().toUpperCase() ?? ""));
        if (validCoupons.length > 0) {
          currentCartData.discount_codes.push(...validCoupons.map(c => c.Code));
          this.coupons = [...currentCartData.discount_codes].join(',');
        } else {
          this.coupons = "";
          this.hasInvalidCoupon = true;
        }

        this.textCoupons.nativeElement.value = this.coupons;
        this.cartService.updateCartData(currentCartData);
        this.cartService.updateCartSummary();
        this.cdr.detectChanges();
      });
    }
  }
}
