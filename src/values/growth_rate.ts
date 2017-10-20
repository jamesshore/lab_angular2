// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Dollars } from "./dollars";

export class GrowthRate {

  private _rate: number;

  constructor(rateAsPercentage: number) {
  	this._rate = rateAsPercentage;
  }

  growthFor(dollars: Dollars): Dollars {
	  return dollars.percentage(this._rate);
  }

  toString(): string {
	  return this._rate + "%";
  }

}
