import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketRowComponent } from './stock-market-row.component';

describe('StockMarketRowComponent', () => {
  let component: StockMarketRowComponent;
  let fixture: ComponentFixture<StockMarketRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMarketRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
