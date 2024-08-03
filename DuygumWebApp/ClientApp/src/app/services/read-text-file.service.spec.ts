import { TestBed } from '@angular/core/testing';

import { ReadTextFileService } from './read-text-file.service';

describe('ReadTextFileService', () => {
  let service: ReadTextFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadTextFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
