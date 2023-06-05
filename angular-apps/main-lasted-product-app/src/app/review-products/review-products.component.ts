import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-review-products',
  templateUrl: './review-products.component.html',
  styleUrls: ['./review-products.component.css'],
})
export class ReviewProductsComponent {
  ReviewProducts: any[] = [
    {
      name: 'Product 1',
      image: 'assets/img/latest-product/lp-2.jpg',
      reviewCount: 5
    },
    {
      name: 'Product 2',
      image: 'assets/img/latest-product/lp-2.jpg',
      reviewCount: 3
    },
    {
      name: 'Product 3',
      image: 'assets/img/latest-product/lp-3.jpg',
      reviewCount: 7
    }
  ];

  customOptions: OwlOptions = {
    items: 1,
    dots: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  };

}
