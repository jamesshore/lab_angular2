// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { TaxRate } from "../values/tax_rate";
import { GrowthRate } from "../values/growth_rate";
import { ValidDollars } from "../values/valid_dollars";
import { Year } from "../values/year";
import { StockMarketYear } from "./stock_market_year";
import { StockMarketProjection } from "./stock_market_projection";

const STARTING_YEAR = new Year(2010);
const ENDING_YEAR = new Year(2050);
const STARTING_BALANCE = new ValidDollars(10000);
const COST_BASIS = new ValidDollars(7000);
const GROWTH_RATE = new GrowthRate(10);
const CAPITAL_GAINS_TAX_RATE = new TaxRate(25);

describe("StockMarketProjection", function() {

	let firstYear: StockMarketYear;

	beforeEach(function() {
		firstYear = new StockMarketYear(STARTING_YEAR, STARTING_BALANCE, COST_BASIS, GROWTH_RATE, CAPITAL_GAINS_TAX_RATE);
	});

	it("contains multiple years", function() {
		const projection = new StockMarketProjection(firstYear, ENDING_YEAR, new ValidDollars(0));

		expect(projection.numberOfYears()).toBe(41);
		expect(projection.getYearOffset(0).startingBalance()).toEqual(STARTING_BALANCE);
		expect(projection.getYearOffset(1).startingBalance() + "").toBe("$11,000");
		expect(projection.getYearOffset(40).year()).toEqual(new Year(2050));
	});

	it("sells a standard amount every year", function() {
		const projection = new StockMarketProjection(firstYear, ENDING_YEAR, new ValidDollars(10));

		expect(projection.getYearOffset(0).totalSellOrders() + "").toBe("$10");
		expect(projection.getYearOffset(1).totalSellOrders() + "").toBe("$10");
		expect(projection.getYearOffset(40).totalSellOrders() + "").toBe("$10");
	});

	it("does not have a cumulative rounding error in interest calculations", function() {
		const projection = new StockMarketProjection(firstYear, ENDING_YEAR, new ValidDollars(0));
		expect(projection.getYearOffset(40).endingBalance() + "").toBe("$497,852");
	});

	it("capital gains tax calculation works the same way as spreadsheet", function() {
		const projection = new StockMarketProjection(firstYear, ENDING_YEAR, new ValidDollars(695));
		expect(projection.getYearOffset(40).endingBalance() + "").toBe("$2,067");
	});

});
