import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl = 'https://parseapi.back4app.com/classes/users';

  constructor(private http: HttpClient) { }

  register(model: any) {
    const headers = new HttpHeaders({
      'X-Parse-Application-Id': 'BCrUQVkk80pCdeImSXoKXL5ZCtyyEZwbN7mAb11f',
      'X-Parse-REST-API-Key': 'swrFFIXJlFudtF3HkZPtfybDFRTmS7sPwvGUzQ9w',
      'Content-Type': 'application/json'
    });
    const options = { headers };
    return this.http.post(this.registerUrl, model, options);
  }
}
