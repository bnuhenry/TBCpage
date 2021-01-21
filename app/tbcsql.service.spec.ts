import { TestBed } from '@angular/core/testing';

import { TbcsqlService } from './tbcsql.service';

describe('TbcsqlService', () => {
  let service: TbcsqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbcsqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
