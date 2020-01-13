import { TestBed } from '@angular/core/testing';

import { ListStorageService } from './list-storage.service';

describe('ListStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListStorageService = TestBed.get(ListStorageService);
    expect(service).toBeTruthy();
  });
});
