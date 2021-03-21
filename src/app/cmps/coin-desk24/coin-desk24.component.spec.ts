import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinDesk24Component } from './coin-desk24.component';

describe('CoinDesk24Component', () => {
  let component: CoinDesk24Component;
  let fixture: ComponentFixture<CoinDesk24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinDesk24Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinDesk24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
