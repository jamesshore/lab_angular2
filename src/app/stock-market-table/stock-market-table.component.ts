// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Component, Input, OnInit } from '@angular/core';
import { StockMarketYear } from "../../domain/stock_market_year";
import { Year } from "../../values/year";
import { ValidDollars } from "../../values/valid_dollars";
import { GrowthRate } from "../../values/growth_rate";
import { TaxRate } from "../../values/tax_rate";
import { StockMarketProjection } from "../../domain/stock_market_projection";

@Component({
  selector: 'app-stock-market-table',
  templateUrl: './stock-market-table.component.html',
  styleUrls: ['./stock-market-table.component.css']
})
export class StockMarketTableComponent implements OnInit {

  @Input() value: StockMarketProjection;
  years: StockMarketYear[];

  constructor() { }

  ngOnInit() {
    this.years = [];
    for (let i = 0; i < this.value.numberOfYears(); i++) {
      this.years.push(this.value.getYearOffset(i));
    }
  }

}
