import { TestBed } from '@angular/core/testing';

import { ApiSensorService } from './api-sensor.service';

describe('ApiSensorService', () => {
  let service: ApiSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
