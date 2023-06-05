import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.css'],
})
export class LatestProductsComponent {
  products: any[] = [
    {
      name: 'Crab Pool Security',
      image: 'assets/img/latest-product/lp-1.jpg',
      price: '$30.00'
    },
    {
      name: 'Crab Pool Security 2',
      image: 'assets/img/latest-product/lp-2.jpg',
      price: '$40.00'
    },
    {
      name: 'Crab Pool Security 3',
      image: 'assets/img/latest-product/lp-3.jpg',
      price: '$50.00'
    },
    {
      name: 'Product 1',
      image: 'assets/img/latest-product/lp-1.jpg',
      price: '$30.00'
    },
        {
      name: 'Product 2',
      image: 'assets/img/latest-product/lp-2.jpg',
      price: '$30.00'
    },
  ];

  customOptions :  OwlOptions ={ 
    items: 1,
    dots: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  };

}