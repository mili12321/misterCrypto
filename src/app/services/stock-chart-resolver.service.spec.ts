import { TestBed } from '@angular/core/testing';

import { StockChartResolverService } from './stock-chart-resolver.service';

describe('StockChartResolverService', () => {
  let service: StockChartResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockChartResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
