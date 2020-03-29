import { TestBed, inject } from '@angular/core/testing';

import { SwStoreService } from './sw-store.service';

describe('SwStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwStoreService]
    });
  });

  it('should be created', inject([SwStoreService], (service: SwStoreService) => {
    expect(service).toBeTruthy();
  }));
});
