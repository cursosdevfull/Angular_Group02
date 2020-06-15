import { TestBed } from '@angular/core/testing';

import { ClientRequestService } from './client-request.service';

describe('ClientRequestService', () => {
  let service: ClientRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
