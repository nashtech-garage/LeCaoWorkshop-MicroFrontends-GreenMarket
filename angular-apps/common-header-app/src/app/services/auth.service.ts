import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  })
};

const mediaHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': '*/*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public identityApiUrl = environment.identityApiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.identityApiUrl + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.identityApiUrl + 'api/account', {
      name,
      email,
      password
    }, httpOptions);
  }

  getToken(username: string, password: string): Observable<any> {
    const user = new HttpParams()
      .set('client_id', "microFE")
      .set('client_secret', "secret")
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('scope', 'api.read');

    return this.http.post(this.identityApiUrl + 'connect/token', user, mediaHttpOptions);
  }
}
