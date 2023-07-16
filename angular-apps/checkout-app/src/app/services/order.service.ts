import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orderApiUrl = environment.orderApiUrl;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  checkout(orderData: Order): Observable<any> {
    var token = this.tokenStorage.getToken();
    token = token === null ? "" : token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(this.orderApiUrl + 'api/Order', orderData, httpOptions);
  }
}
