import { TestBed, inject } from '@angular/core/testing';

import { WebapiCategoriesService } from './webapi-categories.service';

describe('WebapiCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebapiCategoriesService]
    });
  });

  it('should be created', inject([WebapiCategoriesService], (service: WebapiCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
