import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTypeBalanceComponent } from './coin-type-balance.component';

describe('CoinTypeBalanceComponent', () => {
  let component: CoinTypeBalanceComponent;
  let fixture: ComponentFixture<CoinTypeBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinTypeBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinTypeBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
