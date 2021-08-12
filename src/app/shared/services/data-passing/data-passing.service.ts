import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPassingService {
  private dataSource = new BehaviorSubject('Default');
  stream = this.dataSource.asObservable();

  changeData(data): void {
    this.dataSource.next(data);
  }
}
