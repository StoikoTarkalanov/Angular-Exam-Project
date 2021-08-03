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

  get isUserLogged(): boolean {
    return !!this.user;
  }

  serverURL = environment.serverURL;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'X-Parse-Application-Id': 'N6ZatMb3uAHX4UTQwr3QinDCHxkmBEkK5DdkXbaW',
    'X-Parse-REST-API-Key': 'h943r4OXk0J023y3ndlaAcY0urbapLTw10LJoOtn',
    'X-Parse-Revocable-Session': '1',
    'Content-Type': 'application/json'
  });
  options = { headers: this.headers };

  // tslint:disable-next-line: typedef
  getUserData() {
    return this.http.get<IUser>(`${this.serverURL}/classes/Users`, this.options).pipe(
      tap(user => this.user = user)
    );
  }

  // tslint:disable-next-line: typedef
  register(content: { name: string, password: string }) {
    return this.http.post<IUser>(`${this.serverURL}/classes/Users`, content, this.options).pipe(
      tap(user => this.user = user)
    );
  }

  // tslint:disable-next-line: typedef
  logout() {
    // need to set users in sessin or localStorage
    return this.http.delete<IUser>(`${this.serverURL}/classes/Users`, this.options).pipe(
      tap(user => this.user = null)
    );
  }
}
