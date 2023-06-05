import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LatestProductsComponent } from './latest-products/latest-products.component';
import { TopRatedProductsComponent } from './top-rated-products/top-rated-products.component';
import { ReviewProductsComponent } from './review-products/review-products.component';
import { OwlModule } from 'ngx-owl-carousel';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [
    AppComponent,
    LatestProductsComponent,
    TopRatedProductsComponent,
    ReviewProductsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    CommonModule
  ],
  exports: [LatestProductsComponent,TopRatedProductsComponent,ReviewProductsComponent,AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


