// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Year } from "../values/year";
import { GrowthRate } from "../values/growth_rate";
import { TaxRate } from "../values/tax_rate";
import { ValidDollars } from "../values/valid_dollars";
import { Dollars } from "../values/dollars";

export class StockMarketYear {

  private _totalSellOrders: Dollars = new ValidDollars(0);

  constructor(private _year: Year,
              private _startingBalance: Dollars,
              private _startingCostBasis: Dollars,
              private _growthRate: GrowthRate,
              private _capitalGainsTaxRate: TaxRate) {
    this._totalSellOrders = new ValidDollars(0);
  }

  year(): Year {
    return this._year;
  }

  startingBalance(): Dollars {
    return this._startingBalance;
  }

  startingCostBasis(): Dollars {
    return this._startingCostBasis;
  }

  growthRate(): GrowthRate {
    return this._growthRate;
  }

  capitalGainsTaxRate(): TaxRate {
    return this._capitalGainsTaxRate;
  }

  totalSellOrders(): Dollars {
    return this._totalSellOrders;
  }

  sell(dollars: Dollars): void {
    this._totalSellOrders = this._totalSellOrders.plus(dollars);
  }

  capitalGainsTaxIncurred(): Dollars {
    return this.capitalGainsTaxRate().compoundTaxFor(this.capitalGainsSold());
  }

  totalSold(): Dollars {
    return this.totalSellOrders().plus(this.capitalGainsTaxIncurred());
  }

  growth(): Dollars {
    return this.growthRate().growthFor(this.startingBalance().minus(this.totalSold()));
  }

  endingCostBasis(): Dollars {
    const purchasesSold = this.totalSold().subtractToZero(this.startingCapitalGains());
    return this.startingCostBasis().minus(purchasesSold);
  }

  endingBalance(): Dollars {
    return this.startingBalance().plus(this.growth()).minus(this.totalSold());
  }

  nextYear(): StockMarketYear {
    return new StockMarketYear(
      this.year().nextYear(),
      this.endingBalance(),
      this.endingCostBasis(),
      this.growthRate(),
      this.capitalGainsTaxRate()
    );
  }

  private capitalGainsSold(): Dollars {
    return this.startingCapitalGains().min(this.totalSellOrders());
  }

  private startingCapitalGains(): Dollars {
    return this.startingBalance().minus(this.startingCostBasis());
  }

}
