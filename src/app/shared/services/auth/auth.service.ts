import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUser | null | undefined = undefined;

  // tslint:disable-next-line: typedef
  get isUserLogged() {
    // console.log(sessionStorage.getItem('AuthToken'));
    return sessionStorage.getItem('AuthToken');
  }

  // tslint:disable-next-line: member-ordering
  serverURL = environment.serverURL;
  constructor(
    private http: HttpClient,
  ) { }

  // tslint:disable-next-line: typedef
  configureOptions() {
    let headers = new HttpHeaders({
      'X-Parse-Application-Id': 'BCrUQVkk80pCdeImSXoKXL5ZCtyyEZwbN7mAb11f',
      'X-Parse-REST-API-Key': 'swrFFIXJlFudtF3HkZPtfybDFRTmS7sPwvGUzQ9w',
      'Content-Type': 'application/json'
    });

    // may be need for session in back4app
    // if (param === 'register') {
    //   headers = headers.set('X-Parse-Revocable-Session', '1');
    // } else

    const token = this.isUserLogged;
    if (token != null) {
      console.log(token);
      headers = headers.set('X-Parse-Session-Token', `${token}`);
    }

    const options = { headers };
    console.log(options);
    return options;
  }

  // tslint:disable-next-line: typedef
  register(content: { username: string, password: string }) {
    return this.http.post<IUser>(`${this.serverURL}/users`, content, this.configureOptions()).pipe(
      tap(user => {
        this.user = user;
        sessionStorage.setItem('username', content.username);
        sessionStorage.setItem('AuthToken', user.sessionToken);
        sessionStorage.setItem('userId', user.objectId);
      })
    );
  }

  // tslint:disable-next-line: typedef
  login(content: { username: string, password: string }) {
    return this.http.post<IUser>(`${this.serverURL}/login`, content, this.configureOptions()).pipe(
      tap(user => {
        this.user = user;
        sessionStorage.setItem('username', content.username);
        sessionStorage.setItem('AuthToken', user.sessionToken);
        sessionStorage.setItem('userId', user.objectId);
      })
    );
  }

  // tslint:disable-next-line: typedef
  logout() {
    return this.http.post<IUser>(`${this.serverURL}/logout`, {}, this.configureOptions()).pipe(
      tap(user => {
        this.user = null;
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('AuthToken');
        sessionStorage.removeItem('userId');
      })
    );
  }
}
