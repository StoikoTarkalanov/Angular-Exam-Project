import { TestBed } from '@angular/core/testing';

import { NetworkLoadInterceptor } from './network-load.interceptor';

describe('NetworkLoadInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NetworkLoadInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NetworkLoadInterceptor = TestBed.inject(NetworkLoadInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
