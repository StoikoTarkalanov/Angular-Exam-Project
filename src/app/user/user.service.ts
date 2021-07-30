import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces';

@Injectable()
export class UserService {
  user: IUser | undefined;

  constructor() { }

  register(name: string, password: string) {

  }
}
