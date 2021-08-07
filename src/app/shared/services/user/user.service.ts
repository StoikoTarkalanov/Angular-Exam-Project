import { Injectable } from '@angular/core';
import { IBook } from '../../interfaces/book';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';

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
      'X-Parse-Application-Id': 'dFxIY2XnTxo9DSNikYonqUYtpMgqieDC16TOt7Aw',
      'X-Parse-REST-API-Key': 'mNJF3iuWeDCMDRyFwGrDhrtthmQWE7OpWmgF9SEm',
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

  getAllBooks(): Observable<IBook> {
    return this.http.get<IBook>(`${this.serverURL}/classes/Books`, this.configureOptions());
  }

  getBookById(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.serverURL}/classes/Books/${id}`, this.configureOptions());
  }

  create(content: { name: string, image: string, content: string, userId: string }): Observable<IBook> {
    return this.http.post<IBook>(`${this.serverURL}/classes/Books`, content, this.configureOptions());
  }

  edit(content: { name: string, image: string, content: string }): Observable<IBook> {
    return this.http.put<IBook>(`${this.serverURL}/users`, content, this.configureOptions()); // not working
  }

  delete(id: string): Observable<IBook> {
    return this.http.delete<IBook>(`${this.serverURL}/classes/Books/${id}`, this.configureOptions());
  }
}
