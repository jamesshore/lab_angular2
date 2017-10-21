// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StockMarketTableComponent } from './stock-market-table.component';
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { StockMarketProjection } from "../../domain/stock_market_projection";
import { StockMarketRowComponent } from "../stock-market-row/stock-market-row.component";
import { By } from "@angular/platform-browser";
import { StockMarketCellComponent } from "../stock-market-cell/stock-market-cell.component";
import { StockMarketYear } from "../../domain/stock_market_year";
import { TaxRate } from "../../values/tax_rate";
import { GrowthRate } from "../../values/growth_rate";
import { ValidDollars } from "../../values/valid_dollars";
import { Year } from "../../values/year";

describe('StockMarketTableComponent', () => {

  const FIRST_YEAR = new StockMarketYear(
    new Year(2010),
    new ValidDollars(10000),
    new ValidDollars(3000),
    new GrowthRate(10),
    new TaxRate(25)
  );
  const IRRELEVANT_YEAR = new Year(2010);
  const IRRELEVANT_DOLLARS = new ValidDollars(-1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ StockMarketTableComponent, TestHostComponent, StockMarketRowComponent, StockMarketCellComponent ]
    })
    .compileComponents();
  }));

  it("renders first year", () => {
    const rows = rowValuesFor(new StockMarketProjection(FIRST_YEAR, IRRELEVANT_YEAR, IRRELEVANT_DOLLARS));
    expect(rows[0]).toEqual(FIRST_YEAR);
  });

  it("renders multiple years", () => {
    const projection = new StockMarketProjection(FIRST_YEAR, new Year(2050), IRRELEVANT_DOLLARS);
    const rows = rowValuesFor(projection);
    expect(rows.length).toEqual(41);
    expect(rows[40]).toEqual(projection.getYearOffset(40));
  });

});


@Component({
  template: "<app-stock-market-table [value]='value'></app-stock-market-table>"
})
class TestHostComponent {
  value: StockMarketProjection;
}

function createComponent(value: StockMarketProjection) {
  const fixture = TestBed.createComponent(TestHostComponent);
  const testHost = fixture.componentInstance;

  testHost.value = value;
  fixture.detectChanges();
  return { fixture, testHost };
}

function rowValues(fixture) {
  const rows = fixture.debugElement.queryAll(By.directive(StockMarketRowComponent));
  return rows.map((cell) => cell.componentInstance.value);
}

function rowValuesFor(value: StockMarketProjection) {
  const { fixture } = createComponent(value);
  return rowValues(fixture);
}
