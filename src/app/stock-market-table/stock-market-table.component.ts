// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Component, Input, OnChanges } from '@angular/core';
import { StockMarketYear } from "../../domain/stock_market_year";
import { StockMarketProjection } from "../../domain/stock_market_projection";

@Component({
  selector: 'app-stock-market-table',
  templateUrl: './stock-market-table.component.html',
  styleUrls: ['./stock-market-table.component.css']
})
export class StockMarketTableComponent implements OnChanges {

  @Input() value: StockMarketProjection;
  years: StockMarketYear[];

  constructor() { }

  ngOnChanges() {
    this.years = [];
    for (let i = 0; i < this.value.numberOfYears(); i++) {
      this.years.push(this.value.getYearOffset(i));
    }
  }

}
