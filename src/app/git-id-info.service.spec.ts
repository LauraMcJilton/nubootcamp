import { TestBed, inject } from '@angular/core/testing';

import { GitIdInfoService } from './git-id-info.service';

describe('GitIdInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GitIdInfoService]
    });
  });

  it('should be created', inject([GitIdInfoService], (service: GitIdInfoService) => {
    expect(service).toBeTruthy();
  }));
});
