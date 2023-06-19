import { AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../type/type'
@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.css'],
})
export class LatestProductsComponent  {
  @Input() latestGroupProducts: Product[][] = [];

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
