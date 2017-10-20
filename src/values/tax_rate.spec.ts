// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { TaxRate } from "./tax_rate";
import { ValidDollars } from "./valid_dollars";

describe("TaxRate", function() {

	const rate = new TaxRate(25);

	it("determines the base tax", function() {
		expect(rate.simpleTaxFor(new ValidDollars(1000))).toEqual(new ValidDollars(250));
	});

	it("determines the total cost incurred if you pay tax on the tax (by selling to cover)", function() {
		expect(rate.compoundTaxFor(new ValidDollars(1000)) + "").toEqual("$333");
	});

	it("converts to string", function() {
		expect(rate.toString()).toEqual("25%");
	});

});
