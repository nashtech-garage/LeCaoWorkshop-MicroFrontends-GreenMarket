import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../type/type'
@Component({
  selector: 'app-review-products',
  templateUrl: './review-products.component.html',
  styleUrls: ['./review-products.component.css'],
})
export class ReviewProductsComponent {
  @Input() reviewGroupProducts: Product[][] = [];
  customOptions: OwlOptions = {
    items: 1,
    dots: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav: true,
    navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
  };

}
