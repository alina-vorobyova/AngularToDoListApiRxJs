import { TestBed } from '@angular/core/testing';

import { ListFacadeService } from './list-facade.service';

describe('ListFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListFacadeService = TestBed.get(ListFacadeService);
    expect(service).toBeTruthy();
  });
});
