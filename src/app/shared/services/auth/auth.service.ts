import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUser | null | undefined = undefined;

  get isUserLogged(): string {
    return sessionStorage.getItem('AuthToken');
  }

  get username(): string {
    return sessionStorage.getItem('username');
  }

  serverURL = environment.serverURL;
  constructor(
    private http: HttpClient,
  ) { }

  // tslint:disable-next-line: typedef
  configureOptions() {
    let headers = new HttpHeaders({
      'X-Parse-Application-Id': 'dFxIY2XnTxo9DSNikYonqUYtpMgqieDC16TOt7Aw',
      'X-Parse-REST-API-Key': 'mNJF3iuWeDCMDRyFwGrDhrtthmQWE7OpWmgF9SEm',
      'X-Parse-Revocable-Session': '1',
      'Content-Type': 'application/json'
    });

    const token = this.isUserLogged;
    if (token != null) {
      headers = headers.set('X-Parse-Session-Token', `${token}`);
    }

    const options = { headers };
    return options;
  }

  register(content: { username: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(`${this.serverURL}/users`, content, this.configureOptions()).pipe(
      tap(user => {
        this.user = user;
        sessionStorage.setItem('username', content.username);
        sessionStorage.setItem('AuthToken', user.sessionToken);
        sessionStorage.setItem('userId', user.objectId);
      })
    );
  }

  login(content: { username: string, password: string }): Observable<IUser> {
    return this.http.post<IUser>(`${this.serverURL}/login`, content, this.configureOptions()).pipe(
      tap(user => {
        this.user = user;
        sessionStorage.setItem('username', content.username);
        sessionStorage.setItem('AuthToken', user.sessionToken);
        sessionStorage.setItem('userId', user.objectId);
      })
    );
  }

  logout(): Observable<IUser> {
    return this.http.post<IUser>(`${this.serverURL}/logout`, {}, this.configureOptions()).pipe(
      tap(user => {
        this.user = null;
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('AuthToken');
      })
    );
  }
}
