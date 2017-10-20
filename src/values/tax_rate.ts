// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Dollars } from "./dollars";

export class TaxRate {

  private _rate: number;

  constructor(rateAsPercentage: number) {
    this._rate = rateAsPercentage;
  }

  simpleTaxFor(dollars: Dollars): Dollars {
    return dollars.percentage(this._rate);
  }

  compoundTaxFor(dollars: Dollars): Dollars {
    const compoundRate = (100 / (100 - this._rate)) - 1;
    return dollars.percentage(compoundRate * 100);
  }

  toString(): string {
    return this._rate + "%";
  }

}
