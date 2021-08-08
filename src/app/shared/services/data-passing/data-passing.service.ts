import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPassingService {
  private dataSource = new Subject();
  stream = this.dataSource.asObservable();

  dataPass(data): void {
    this.dataSource.next(data);
  }
}
