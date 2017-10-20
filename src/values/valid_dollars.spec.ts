// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { ValidDollars } from "./valid_dollars";
import { InvalidDollars } from "./invalid_dollars";
import { UserEnteredDollars } from "./user_entered_dollars";
import { RenderTargetStub } from "./__render_target_stub";

const MAX_VALID = new ValidDollars(ValidDollars.MAX_VALUE);
const MIN_VALID = new ValidDollars(ValidDollars.MIN_VALUE);

describe("ValidDollars", function() {

	const _0 = new ValidDollars(0);
	const _10 = new ValidDollars(10);
	const _20 = new ValidDollars(20);
	const _30 = new ValidDollars(30);
	const _50 = new ValidDollars(50);
	const _100 = new ValidDollars(100);
	const _minus20 = new ValidDollars(-20);
	const invalid = new InvalidDollars();
	const user20 = new UserEnteredDollars("20");

	describe("logic", function() {

		it("prevents dollars from being constructed outside of valid range", function() {
			expect(ValidDollars.create(ValidDollars.MAX_VALUE + 1)).toEqual(new InvalidDollars());
			expect(ValidDollars.create(ValidDollars.MIN_VALUE - 1)).toEqual(new InvalidDollars());
		});

		it("is always valid", function() {
			expect(_10.isValid()).toEqual(true);
		});

		it("converts to underlying data type (for 'Dollars family' use only)", function() {
			expect(new ValidDollars(12.34567891).toNumber()).toEqual(12.34567891);
		});

		it("adds", function() {
			expect(_10.plus(_20)).toEqual(_30);
			expect(_10.plus(invalid)).toEqual(invalid);
			expect(_10.plus(user20)).toEqual(_30);
		});

		it("subtracts", function() {
			expect(_50.minus(_30)).toEqual(_20);
			expect(_30.minus(_50)).toEqual(_minus20);
			expect(_50.minus(invalid)).toEqual(invalid);
			expect(_50.minus(user20)).toEqual(_30);
		});

		it("subtracts with a floor of zero (this comes up more often than you might think)", function() {
			expect(_50.subtractToZero(_30)).toEqual(_20);
			expect(_30.subtractToZero(_50)).toEqual(_0);
			expect(_30.subtractToZero(invalid)).toEqual(invalid);
			expect(_30.subtractToZero(user20)).toEqual(_10);
		});

		it("flips the sign", function() {
			expect(_0.flipSign()).toEqual(_0);
			expect(_20.flipSign()).toEqual(_minus20);
			expect(_minus20.flipSign()).toEqual(_20);
		});

		it("calculates percentage amount", function() {
			expect(_100.percentage(20)).toEqual(_20);
		});

		it("determines lesser of two values", function() {
			expect(_20.min(_30)).toEqual(_20);
			expect(_30.min(_20)).toEqual(_20);
			expect(_30.min(invalid)).toEqual(invalid);
			expect(_30.min(user20)).toEqual(_20);
		});
	});


	describe("string conversion", function() {
		it("ignores pennies", function() {
			expect(new ValidDollars(10.10) + "").toEqual("$10");
			expect(new ValidDollars(9.90) + "").toEqual("$10");
			expect(new ValidDollars(10.5) + "").toEqual("$11");
			expect(new ValidDollars(-0.5) + "").toEqual("($1)");
		});

		it("formats long numbers with commas", function() {
			expect(new ValidDollars(1234) + "").toEqual("$1,234");
			expect(new ValidDollars(12345678) + "").toEqual("$12,345,678");
			expect(new ValidDollars(123456789) + "").toEqual("$123,456,789");
		});

		it("formats negative numbers with parentheses", function() {
			expect(_minus20 + "").toEqual("($20)");
			expect(_0 + "").toEqual("$0");
		});
	});


	describe("rendering", function() {
		let target: RenderTargetStub;

		beforeEach(function() {
			target = new RenderTargetStub();
		});

		it("converts to string", function() {
			_20.renderTo(target);
			expect(target.rendering.text).toEqual(_20.toString());
		});

		it("handles sign", function() {
			_20.renderTo(target);
			expect(target.rendering.negative).toEqual(false);

			_minus20.renderTo(target);
			expect(target.rendering.negative).toEqual(true);
		});

		it("treats zero, and negative values that round up to zero, as positive", function() {
			_0.renderTo(target);
			expect(target.rendering.negative).toEqual(false);

			new ValidDollars(-0.49).renderTo(target);
			expect(target.rendering.negative).toEqual(false);

			new ValidDollars(-0.5).renderTo(target);
			expect(target.rendering.negative).toEqual(true);
		});

		it("is never invalid", function() {
			_20.renderTo(target);
			expect(target.rendering.invalid).toEqual(false);
			expect(target.rendering.tooltip).toEqual(undefined);
		});
	});

});
