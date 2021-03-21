import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTypeBalancePreviewComponent } from './coin-type-balance-preview.component';

describe('CoinTypeBalancePreviewComponent', () => {
  let component: CoinTypeBalancePreviewComponent;
  let fixture: ComponentFixture<CoinTypeBalancePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinTypeBalancePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinTypeBalancePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
