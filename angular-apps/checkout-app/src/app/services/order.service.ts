import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orderApiUrl = environment.orderApiUrl;

  constructor(private http: HttpClient) { }

  checkout(orderData: Order): Observable<any> {
    return this.http.post(this.orderApiUrl + 'api/Order', orderData, httpOptions);
  }

}
