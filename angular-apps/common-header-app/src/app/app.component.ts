import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import jwt_decode from "jwt-decode";
import { TokenStorageService } from './services/token-storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'common-header-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('closeLoginButton') closeLoginButton: any;
  @ViewChild('closeSignUpButton') closeSignUpButton: any;

  title = 'common-header-app';

  cartNumberProduct:number = 0;
  cartTotal:number = 0;

  loginForm: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;

  signUpForm: any = {
    name: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;

  errorMessage = '';

  currentUsername = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  private channel = new BroadcastChannel('CART_HEADER_CHANNEL');

  destroy() {
    this.channel.removeEventListener('message', (e) => this.handleCartUpdated(e));
    this.channel.close();
  }

  ngOnInit(): void {
    if (this.tokenStorage.isValidToken()) {
      this.isLoggedIn = true;
      this.currentUsername = this.tokenStorage.getUser().email;
      this.handleCartUpdated(null, true);
    }
    this.channel.addEventListener('message', (e) => this.handleCartUpdated(e));
  }

  onLoginSubmit(): void {
    const { email, password } = this.loginForm;

    this.authService.getToken(email, password).subscribe(
      (data: any) => {
        this.tokenStorage.saveToken(data.access_token);

        const userData:any = jwt_decode(data.access_token);
        this.tokenStorage.saveUser(userData);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.currentUsername = userData.email;

        this.closeLoginButton.nativeElement.click();
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  onSignUpSubmit(): void {
    const { name, email, password } = this.signUpForm;

    this.authService.register(name, email, password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.closeSignUpButton.nativeElement.click();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  logout() {
    const currentUserId = this.tokenStorage.getUser().sub;
    if (currentUserId) {
      localStorage.removeItem(currentUserId);
    }
    this.isLoggedIn = false;
    this.currentUsername = '';
    this.cartNumberProduct = 0;
    this.cartTotal = 0;

    this.tokenStorage.logout();
  }

  handleCartUpdated(event?:any, isForceUpdate?:boolean) {
    if (!this.tokenStorage.isValidToken()) {
      this.handleSessionExpired();
      return;
    }
    if (isForceUpdate || (event && (event.data.type === 'CART_UPDATED' || event.data.type === 'ADD_CART_ITEM'))) {
      let currentUserId = this.tokenStorage.getUser().sub;

      const shoppingCart = JSON.parse(localStorage.getItem(currentUserId) ?? "{}");
      if (Object.keys(shoppingCart).length !== 0) {
        this.cartNumberProduct = shoppingCart.cart_data.length;
        this.cartTotal = shoppingCart.total;

        // Show alert for current page trigger action add item to cart.
        // If user open multiple tabs in browser, show alert on tabs with path is the same.
        if (event && event.data.type === 'ADD_CART_ITEM' && event.data.path == window.location.href) {
          // Todo: Implement a notify feature or toast message instead of use alert  
          alert("Product added to cart successfully");
        }
      }
    }
  }

  private handleSessionExpired() {
    alert("You are either not logged in or your session has expired. Please log in again to continue.");
    this.logout();
  }
}
