// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketRowComponent } from './stock-market-row.component';
import { StockMarketCellComponent } from "../stock-market-cell/stock-market-cell.component";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { StockMarketYear } from "../../domain/stock_market_year";
import { TaxRate } from "../../values/tax_rate";
import { GrowthRate } from "../../values/growth_rate";
import { ValidDollars } from "../../values/valid_dollars";
import { Year } from "../../values/year";

describe('StockMarketRowComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketRowComponent, TestHostComponent, StockMarketCellComponent ]
    })
    .compileComponents();
  }));

  it("renders all the cells for a single year in the stock market", () => {
    const year = new StockMarketYear(
      new Year(1984),
      new ValidDollars(986),
      new ValidDollars(20),
      new GrowthRate(10),
      new TaxRate(30)
    );
    const { fixture } = createComponent(year);
    const values = cellValues(fixture);

    expect(values[0]).toEqual(year.year());
    expect(values[1]).toEqual(year.startingBalance());
    expect(values[2]).toEqual(year.startingCostBasis());
    expect(values[3]).toEqual(year.totalSellOrders().flipSign());
    expect(values[4]).toEqual(year.capitalGainsTaxIncurred().flipSign());
    expect(values[5]).toEqual(year.growth());
    expect(values[6]).toEqual(year.endingBalance());
  });

  it("updates when year changes", () => {
    const originalYear = new StockMarketYear(
      new Year(1984),
      new ValidDollars(986),
      new ValidDollars(20),
      new GrowthRate(10),
      new TaxRate(30)
    );
    const { fixture, testHost } = createComponent(originalYear);

    const newYear = new StockMarketYear(
      new Year(2948),
      new ValidDollars(1),
      new ValidDollars(2),
      new GrowthRate(3),
      new TaxRate(4)
    );
    testHost.value = newYear;
    fixture.detectChanges();

    expect(cellValues(fixture)[0]).toEqual(newYear.year());
  });

});


@Component({
  template: "<table><tbody><tr app-stock-market-row [value]='value'></tr></tbody></table>"
})
class TestHostComponent {
  value: StockMarketYear;
}

function createComponent(value: StockMarketYear) {
  const fixture = TestBed.createComponent(TestHostComponent);
  const testHost = fixture.componentInstance;

  testHost.value = value;
  fixture.detectChanges();
  return { fixture, testHost };
}

function cellValues(fixture) {
  const cells = fixture.debugElement.queryAll(By.directive(StockMarketCellComponent));
  return cells.map((cell) => cell.componentInstance.value);
}
