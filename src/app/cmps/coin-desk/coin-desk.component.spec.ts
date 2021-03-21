import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinDeskComponent } from './coin-desk.component';

describe('CoinDeskComponent', () => {
  let component: CoinDeskComponent;
  let fixture: ComponentFixture<CoinDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinDeskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
