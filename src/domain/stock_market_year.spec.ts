// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Year } from "../values/year";
import { ValidDollars } from "../values/valid_dollars";
import { GrowthRate } from "../values/growth_rate";
import { TaxRate } from "../values/tax_rate";
import { StockMarketYear } from "./stock_market_year";

const YEAR = new Year(2010);
const STARTING_BALANCE = new ValidDollars(10000);
const STARTING_COST_BASIS = new ValidDollars(3000);
const INTEREST_RATE = new GrowthRate(10);
const CAPITAL_GAINS_TAX_RATE = new TaxRate(25);

describe("StockMarketYear", function() {

	let year: StockMarketYear;

	beforeEach(function() {
		year = new StockMarketYear(YEAR, STARTING_BALANCE, STARTING_COST_BASIS, INTEREST_RATE, CAPITAL_GAINS_TAX_RATE);
	});

	it("provides initial values", function() {
		expect(year.year()).toEqual(YEAR);
		expect(year.startingBalance()).toEqual(STARTING_BALANCE);
		expect(year.startingCostBasis()).toEqual(STARTING_COST_BASIS);
		expect(year.growthRate()).toEqual(INTEREST_RATE);
		expect(year.capitalGainsTaxRate()).toEqual(CAPITAL_GAINS_TAX_RATE);
	});

	it("accumulates total sold", function() {
		expect(year.totalSellOrders() + "").toEqual("$0");

		year.sell(new ValidDollars(3000));
		expect(year.totalSellOrders() + "").toEqual("$3,000");

		year.sell(new ValidDollars(750));
		year.sell(new ValidDollars(1350));
		expect(year.totalSellOrders() + "").toEqual("$5,100");
	});

	it("calculates capital gains tax, including tax on withdrawals made to cover capital gains", function() {
		year.sell(new ValidDollars(4000));
		expect(year.capitalGainsTaxIncurred() + "").toBe("$1,333");
		expect(year.totalSold() + "").toBe("$5,333");
	});

	it("treats all sales as subject to capital gains tax until all capital gains have been sold", function () {
		year.sell(new ValidDollars(500));
		expect(year.capitalGainsTaxIncurred() + "").toBe("$167");

		const capitalGains = STARTING_BALANCE.minus(STARTING_COST_BASIS);
		year.sell(capitalGains);
		expect(year.capitalGainsTaxIncurred() + "").toBe("$2,333");

		year.sell(new ValidDollars(1000));
		expect(year.capitalGainsTaxIncurred() + "").toBe("$2,333");
	});

	it("calculates growth (sales, including capital gains tax, don't grow)", function() {
		expect(year.growth() + "").toBe("$1,000");

		year.sell(new ValidDollars(2000));
		expect(year.growth() + "").toBe("$733");
	});

	it("calculates ending cost basis (sales less than capital gains do not reduce cost basis)", function() {
		year.sell(new ValidDollars(500));
		expect(year.endingCostBasis()).toEqual(STARTING_COST_BASIS);

		year.sell(new ValidDollars(6500));
		// total sold (including tax): 9333
		// capital gains: 7000
		// cost basis reduced by: 9333 - 7000 = 2333
		// starting cost basis: 3000
		// expected cost basis: 3000 - 2333 = 667
		expect(year.endingCostBasis() + "").toBe("$667");

		year.sell(new ValidDollars(1000));
		expect(year.endingCostBasis() + "").toBe("($333)");
	});

	it("calculates balance at end of year, including sales, tax, and growth", function() {
		expect(year.endingBalance() + "").toBe("$11,000");

		year.sell(new ValidDollars(1000));
		expect(year.endingBalance() + "").toBe("$9,533");
	});

	it("next year's starting values equal this year's ending values", function() {
		const nextYear = year.nextYear();

		expect(nextYear.year()).toEqual(new Year(2011));
		expect(nextYear.startingBalance()).toEqual(year.endingBalance());
		expect(nextYear.startingCostBasis()).toEqual(year.endingCostBasis());
		expect(nextYear.growthRate()).toEqual(year.growthRate());
		expect(nextYear.capitalGainsTaxRate()).toEqual(year.capitalGainsTaxRate());
	});

});
