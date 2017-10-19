import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketCellComponent } from './stock-market-cell.component';

describe('StockMarketCellComponent', () => {
  let component: StockMarketCellComponent;
  let fixture: ComponentFixture<StockMarketCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMarketCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
