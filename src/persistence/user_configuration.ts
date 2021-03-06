// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { UserEnteredDollars } from "../values/user_entered_dollars";
import { Year } from "../values/year";
import { GrowthRate } from "../values/growth_rate";
import { TaxRate } from "../values/tax_rate";
import { ValidDollars } from "../values/valid_dollars";

export class UserConfiguration {

  static readonly DEFAULT_STARTING_BALANCE = new UserEnteredDollars("10000");
  static readonly DEFAULT_STARTING_COST_BASIS = new UserEnteredDollars("7000");
  static readonly DEFAULT_YEARLY_SPENDING = new UserEnteredDollars("695");

  static readonly STARTING_YEAR = new Year(2010);
  static readonly INTEREST_RATE = new GrowthRate(10);
  static readonly CAPITAL_GAINS_TAX_RATE = new TaxRate(25);
  static readonly ENDING_YEAR = new Year(2050);

  private _changeHandlers: Function[];
  private _startingBalance: UserEnteredDollars;
  private _startingCostBasis: UserEnteredDollars;
  private _yearlySpending: UserEnteredDollars;

  constructor() {
    this._changeHandlers = [];
    this._startingBalance = UserConfiguration.DEFAULT_STARTING_BALANCE;
    this._startingCostBasis = UserConfiguration.DEFAULT_STARTING_COST_BASIS;
    this._yearlySpending = UserConfiguration.DEFAULT_YEARLY_SPENDING;

    // setInterval(() => {
    // 	this.yearlySpending = new UserEnteredDollars(this._yearlySpending.plus(new ValidDollars(1)).toString());
    // }, 500);
  }

  get startingBalance(): UserEnteredDollars {
    return this._startingBalance;
  }

  set startingBalance(dollars: UserEnteredDollars) {
    this._startingBalance = dollars;
    this.triggerChangeEvent();
  }

  get startingCostBasis(): UserEnteredDollars {
    return this._startingCostBasis;
  }

  set startingCostBasis(dollars: UserEnteredDollars) {
    this._startingCostBasis = dollars;
    this.triggerChangeEvent();
  }

  get yearlySpending(): UserEnteredDollars {
    return this._yearlySpending;
  }

  set yearlySpending(dollars: UserEnteredDollars) {
    this._yearlySpending = dollars;
    this.triggerChangeEvent();
  }

  onChange(callback: Function): void {
    this._changeHandlers.push(callback);
  }

  private triggerChangeEvent(): void {
    this._changeHandlers.forEach(function (handler) {
      handler(self);
    });
  }

}
