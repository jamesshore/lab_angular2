// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { ValidDollars } from "./valid_dollars";
import { UserEnteredDollars } from "./user_entered_dollars";
import { RenderTargetStub } from "./__render_target_stub";
import { InvalidDollars } from "./invalid_dollars";

describe("InvalidDollars", function() {

	const invalid = new InvalidDollars();
	const valid = new ValidDollars(20);
	const user = new UserEnteredDollars("20");

	describe("logic", function() {
		it("is never valid", function() {
			expect(invalid.isValid()).toEqual(false);
		});

		it("addition is always invalid", function() {
			expect(invalid.plus(valid)).toEqual(invalid);
			expect(invalid.plus(invalid)).toEqual(invalid);
			expect(invalid.plus(user)).toEqual(invalid);
		});

		it("subtraction is always invalid", function() {
			expect(invalid.minus(valid)).toEqual(invalid);
			expect(invalid.minus(invalid)).toEqual(invalid);
			expect(invalid.minus(user)).toEqual(invalid);
		});

		it("subtracting to zero is always invalid", function() {
			expect(invalid.subtractToZero(valid)).toEqual(invalid);
			expect(invalid.subtractToZero(invalid)).toEqual(invalid);
			expect(invalid.subtractToZero(user)).toEqual(invalid);
		});

		it("flipping the sign is always invalid", function() {
			expect(invalid.flipSign()).toEqual(invalid);
		});

		it("percentage is always invalid", function() {
			expect(invalid.percentage(20)).toEqual(invalid);
		});

		it("min is always invalid", function() {
			expect(invalid.min(valid)).toEqual(invalid);
			expect(invalid.min(invalid)).toEqual(invalid);
			expect(invalid.min(user)).toEqual(invalid);
		});
	});


	describe("string conversion", function() {
		it("uses question marks", function() {
			expect(invalid + "").toEqual("$???");
		});
	});


	describe("rendering", function() {
		let target: RenderTargetStub;

		beforeEach(function() {
			target = new RenderTargetStub();
			invalid.renderTo(target);
		});

		it("is always invalid", function() {
			expect(target.rendering).toEqual({
				text: "$???",
				negative: false,
				invalid: true,
				tooltip: "Invalid dollar amount"
			});
		});
	});


});
