
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-top-rated-products',
  templateUrl: './top-rated-products.component.html',
  styleUrls: ['./top-rated-products.component.css'],
})
export class TopRatedProductsComponent{
  TopRatedProducts: any[] = [
    {
      name: 'Product 1',
      image: 'assets/img/latest-product/lp-1.jpg',
      price: '$30.00'
    },
    {
      name: 'Product 2',
      image: 'assets/img/latest-product/lp-2.jpg',
      price: '$40.00'
    },
    {
      name: 'Product 3',
      image: 'assets/img/latest-product/lp-2.jpg',
      price: '$50.00'
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
