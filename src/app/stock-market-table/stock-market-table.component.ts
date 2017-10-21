// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Component, OnInit } from '@angular/core';
import { StockMarketYear } from "../../domain/stock_market_year";
import { Year } from "../../values/year";
import { ValidDollars } from "../../values/valid_dollars";
import { GrowthRate } from "../../values/growth_rate";
import { TaxRate } from "../../values/tax_rate";

@Component({
  selector: 'app-stock-market-table',
  templateUrl: './stock-market-table.component.html',
  styleUrls: ['./stock-market-table.component.css']
})
export class StockMarketTableComponent implements OnInit {

  deleteme = new StockMarketYear(
    new Year(1984),
    new ValidDollars(986),
    new ValidDollars(20),
    new GrowthRate(10),
    new TaxRate(30)
  );

  constructor() { }

  ngOnInit() {
  }

}
