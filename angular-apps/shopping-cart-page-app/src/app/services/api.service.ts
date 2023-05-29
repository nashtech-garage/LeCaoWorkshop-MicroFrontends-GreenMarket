import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {environment} from "../../environments/environment";
import {Coupon} from "../models/coupon.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<any>(`${environment.apiEndpoint}/data/data.json`)
      .pipe(
        map(response => {
          return response.data.products.map((product: any) => {
            return {
              Id: product.id,
              Name: product.name,
              Price: product.price,
              ImageLink: product.main_image_url,
              DiscountPercentage: product.discount
            };
          });
        })
      );
  }

  getCoupons(): Observable<Coupon[]> {
    return this.http.get<any>(`${environment.apiEndpoint}/data/data.json`)
      .pipe(
        map(response => {
          return response.data.coupon.map((coupon: any) => {
            return {
              Code: coupon.code,
              Description: coupon.description,
              DiscountAmount: coupon.discount_amount,
              Unit: coupon.unit,
              IsExpired: coupon.is_expired
            };
          });
        })
      );
  }
}
