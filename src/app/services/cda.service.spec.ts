import { TestBed } from '@angular/core/testing';

import { CDAService } from './cda.service';

describe('CDAService', () => {
  let service: CDAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CDAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
