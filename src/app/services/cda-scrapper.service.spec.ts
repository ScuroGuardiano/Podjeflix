import { TestBed } from '@angular/core/testing';

import { CdaScrapperService } from './cda-scrapper.service';

describe('CdaScrapperService', () => {
  let service: CdaScrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdaScrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
