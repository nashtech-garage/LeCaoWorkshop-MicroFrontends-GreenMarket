import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import {ProductItemComponent} from './product-item/product-item.component';
import {ProductGridComponent} from './product-grid/product-grid.component';
import {DiscountCodesComponent} from './discount-codes/discount-codes.component';
import {CartSummaryComponent} from './cart-summary/cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductItemComponent,
    ProductGridComponent,
    DiscountCodesComponent,
    CartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
