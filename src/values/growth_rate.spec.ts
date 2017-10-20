// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { GrowthRate } from "./growth_rate";
import { ValidDollars } from "./valid_dollars";

describe("GrowthRate", function() {

	const rate = new GrowthRate(10);

	it("calculates growth", function() {
		expect(rate.growthFor(new ValidDollars(1000))).toEqual(new ValidDollars(100));
	});

	it("converts to string", function() {
		expect(rate.toString()).toEqual("10%");
	});

});
