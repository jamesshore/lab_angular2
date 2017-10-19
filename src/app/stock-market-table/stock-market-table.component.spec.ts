import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketTableComponent } from './stock-market-table.component';

describe('StockMarketTableComponent', () => {
  let component: StockMarketTableComponent;
  let fixture: ComponentFixture<StockMarketTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMarketTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
