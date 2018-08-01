import { TestBed, inject } from '@angular/core/testing';

import { WebapiProductsService } from './webapi-products.service';

describe('WebapiProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebapiProductsService]
    });
  });

  it('should be created', inject([WebapiProductsService], (service: WebapiProductsService) => {
    expect(service).toBeTruthy();
  }));
});
