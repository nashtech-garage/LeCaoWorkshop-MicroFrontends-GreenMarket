import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

import { Category } from 'src/Types/Category';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-main-categories-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  api = environment.apiUrl;
  title = 'main-categories-app';
  customOptions: OwlOptions = {
    loop: true,
    margin: 0,
    items: 4,
    dots: false,
    nav: true,
    navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },

      480: {
        items: 2,
      },

      768: {
        items: 3,
      },

      992: {
        items: 4,
      }
    }
  }

  categories: Category[] = [];

  constructor(
    private readonly http: HttpClient,
  ) { }

  ngOnInit() {
    this.fetch()
  }

  fetch() {
    // const apiData = `${environment.apiUrl}data/data.json`;
    const apiData = `${environment.commonApiUrl}api/Category/all`;
    const http$ = this.http.get<any>(apiData);

    http$.subscribe(
      res => {
        this.categories = res;
      },
      err => throwError(err)
    )
  }
}
