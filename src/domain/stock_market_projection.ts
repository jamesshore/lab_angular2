// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Year } from "../values/year";
import { StockMarketYear } from "./stock_market_year";

export class StockMarketProjection {

  private _startingYear: Year;
  private _endingYear: Year;
  private _years: StockMarketYear[];

  constructor(firstYear: StockMarketYear, endingYear: Year, amountSoldEachYear) {
    this._startingYear = firstYear.year();
    this._endingYear = endingYear;
    this._years = this.calculateYears(firstYear, amountSoldEachYear);
  }

  numberOfYears(): number {
    return this._startingYear.numberOfYearsInclusive(this._endingYear);
  }

  getYearOffset(offset): StockMarketYear {
    if (offset < 0 || offset >= this.numberOfYears()) {
      throw new Error("Offset needs to be between 0 and " + (this.numberOfYears() - 1) + "; was " + offset);
    }

    return this._years[offset];
  }

  private calculateYears(firstYear, amountSoldEachYear): StockMarketYear[] {
    const result = new Array(this.numberOfYears());

    result[0] = firstYear;
    result[0].sell(amountSoldEachYear);
    for (let i = 1; i < this.numberOfYears(); i++) {
      result[i] = result[i - 1].nextYear();
      result[i].sell(amountSoldEachYear);
    }

    return result;
  }

}
