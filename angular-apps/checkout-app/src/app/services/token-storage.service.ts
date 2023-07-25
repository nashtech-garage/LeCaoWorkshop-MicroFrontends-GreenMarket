import { Injectable } from '@angular/core';
import jwt_decode, {JwtPayload} from "jwt-decode";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return JSON.parse('{}');
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  isValidToken(): boolean {
    const currentToken = this.getToken();
    if (!currentToken) {
      return false;
    }

    try {
      const decodedToken: JwtPayload = jwt_decode(currentToken);
      if (!decodedToken) { return false; }

      const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
      if (decodedToken.exp !== null &&
          decodedToken.exp !== undefined) {
        return decodedToken.exp > currentTimestamp;
      }
    } catch (e) {
      console.log((e as Error).message);
    }

    return false;
  }
}
