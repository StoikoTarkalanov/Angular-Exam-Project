import { Injectable } from '@angular/core';
import { IBook } from '../../interfaces/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverURL = environment.serverURL;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // tslint:disable-next-line: typedef
  configureOptions() {
    let headers = new HttpHeaders({
      'X-Parse-Application-Id': 'BCrUQVkk80pCdeImSXoKXL5ZCtyyEZwbN7mAb11f',
      'X-Parse-REST-API-Key': 'swrFFIXJlFudtF3HkZPtfybDFRTmS7sPwvGUzQ9w',
      'Content-Type': 'application/json'
    });

    const token = this.authService.isUserLogged;
    if (token != null) {
      // console.log(token);
      headers = headers.set('X-Parse-Session-Token', `${token}`);
    }

    const options = { headers };
    return options;
  }

  // tslint:disable-next-line: typedef
  create(content: { name: string, image: string, content: string }) {
    return this.http.post<IBook>(`${this.serverURL}/users`, content, this.configureOptions());
  }

  // tslint:disable-next-line: typedef
  edit(content: { name: string, image: string, content: string }) {
    return this.http.put<IBook>(`${this.serverURL}/users`, content, this.configureOptions());
  }
}
