// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

import { Year } from "./year";
import { RenderTargetStub } from "./__render_target_stub";

describe("Year", function() {

	const _2010 = new Year(2010);
	const _2011 = new Year(2011);
	const _2050 = new Year(2050);

	it("increments year", function() {
		expect(_2010.nextYear()).toEqual(_2011);
	});

	it("counts years in range", function() {
		expect(_2010.numberOfYearsInclusive(_2050)).toEqual(41);
	});

	it("converts to string", function() {
		expect(_2010.toString()).toEqual("2010");
	});

	it("renders itself", function() {
		const target = new RenderTargetStub();
		_2010.renderTo(target);

		expect(target.rendering).toEqual({
			text: "2010",
			negative: false,
			invalid: false
		});
	});

});
