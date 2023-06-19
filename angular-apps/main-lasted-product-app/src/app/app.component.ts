import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Product } from './type/type'

@Component({
  selector: 'main-lasted-product-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'main-lasted-product-app';
  api = environment.apiUrl;
  products: Product[] = [];
  lastedProducts: Product[] = [];
  reviewProducts: Product[] = [];
  topProducts: Product[] = [];

  latestGroupProducts: Product[][] = [];
  reviewGroupProducts: Product[][] = [];
  topGroupProducts: Product[][] = [];
  size = 3;

  constructor(
    private readonly http: HttpClient,
  ) { };

  ngOnInit() {
    this.fetch()
  }

  fetch() {
    const apiData = `${environment.apiUrl}data/data.json`;
    const http$ = this.http.get<any>(apiData);

    http$.subscribe(
      res => {
        if (res.data.products) {
          res.data.products.map((product: { is_latest: any; id: any; main_image_url: any; name: any; price: any; is_review: any; is_top_rate: any; }) => {
            let lastedProduct: Product;
            let topProduct: Product
            let reviewProduct: Product
            if (product.is_latest) {
              lastedProduct = {
                id: product.id,
                image_url: `${environment.apiUrl}${product.main_image_url}`,
                name: product.name,
                price: product.price
              }
              this.lastedProducts.push(lastedProduct)
            }
            if (product.is_review) {
              reviewProduct = {
                id: product.id,
                image_url: `${environment.apiUrl}${product.main_image_url}`,
                name: product.name,
                price: product.price
              }
              this.reviewProducts.push(reviewProduct)
            }
            if (product.is_top_rate) {
              topProduct = {
                id: product.id,
                image_url: `${environment.apiUrl}${product.main_image_url}`,
                name: product.name,
                price: product.price
              }
              this.topProducts.push(topProduct)
            }
          })
        }

        this.latestGroupProducts = this.splitProductGroup(this.lastedProducts);
        this.reviewGroupProducts = this.splitProductGroup(this.reviewProducts);
        this.topGroupProducts = this.splitProductGroup(this.topProducts);
      },
      err => throwError(err)
    )
  }

  splitProductGroup(listProducts: Product[]) {
    var result: Product[][] = [];
    while (listProducts.length > 0) {
      result.push(listProducts.splice(0, this.size));
    }

    return result;
  }
}
