// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { UserEnteredDollars } from "./user_entered_dollars";
import { ValidDollars } from "./valid_dollars";
import { RenderTargetStub } from "./__render_target_stub";

describe("UserEnteredDollars", function() {

	const valid = new UserEnteredDollars("10");
	const invalid = new UserEnteredDollars("xx");
	const _0 = new ValidDollars(0);
	const _10 = new ValidDollars(10);
	const _20 = new ValidDollars(20);
	const _minus10 = new ValidDollars(-10);


	describe("string parsing", function() {
		it("parses numbers", function() {
			expect(parse("")).toEqual(0);
			expect(parse("42")).toEqual(42);
			expect(parse("42.13")).toEqual(42.13);
		});

		it("parses dollar signs", function() {
			expect(parse("$42")).toEqual(42);
			expect(parse("$")).toEqual(0);
		});

		it("parses commas", function() {
			expect(parse("1,234")).toEqual(1234);
			expect(parse("1,234,567")).toEqual(1234567);
			expect(parse(",,,4,,,,,,2,,,")).toEqual(42);
		});

		it("parses negative signs", function() {
			expect(parse("-42")).toEqual(-42);
			expect(parse("-$42")).toEqual(-42);
			expect(parse("$-42")).toEqual(-42);
			expect(parse("-")).toEqual(0);
			expect(parse("-$")).toEqual(0);
			expect(parse("$-")).toEqual(0);
		});

		it("parses parentheses", function() {
			expect(parse("(42)")).toEqual(-42);
			expect(parse("($42)")).toEqual(-42);
			expect(parse("$(42)")).toEqual("invalid");

			expect(parse("(-42)")).toEqual("invalid");
			expect(parse("-(42)")).toEqual("invalid");

			expect(parse("$-(42)")).toEqual("invalid");
			expect(parse("$(-42)")).toEqual("invalid");
			expect(parse("-$(42)")).toEqual("invalid");
			expect(parse("-($42)")).toEqual("invalid");
			expect(parse("(-$42)")).toEqual("invalid");
			expect(parse("($-42)")).toEqual("invalid");

			expect(parse("(42")).toEqual(-42);
			expect(parse("42)")).toEqual(-42);

			expect(parse("(")).toEqual(0);
			expect(parse(")")).toEqual(0);
			expect(parse("()")).toEqual(0);
		});

		it("parses illegals", function() {
			expect(parse("x")).toEqual("invalid");
			expect(parse("40e2")).toEqual("invalid");
			expect(parse("40x")).toEqual("invalid");
			expect(parse("NaN")).toEqual("invalid");
		});

		function parse(string) {
			const parsed = new UserEnteredDollars(string);
			return parsed.isValid() ? parsed.toNumber() : "invalid";
		}
	});


	describe("logic", function() {
		it("can be valid or invalid", function() {
			expect(valid.isValid()).toEqual(true);
			expect(invalid.isValid()).toEqual(false);
		});

		it("converts to underlying data type (for 'Dollars family' use only)", function() {
			expect(valid.toNumber()).toEqual(10);
		});

		it("adds", function() {
			expect(valid.plus(valid)).toEqual(_20);
		});

		it("subtracts", function() {
			expect(valid.minus(valid)).toEqual(_0);
		});

		it("subtracts with a floor of zero (this comes up more often than you might think)", function() {
			expect(valid.subtractToZero(new UserEnteredDollars("20"))).toEqual(_0);
		});

		it("flips the sign", function() {
			expect(valid.flipSign()).toEqual(_minus10);
		});

		it("calculates percentage amount", function() {
			expect(valid.percentage(200)).toEqual(_20);
		});

		it("determines lesser of two values", function() {
			expect(valid.min(_0)).toEqual(_0);
		});
	});


	describe("string conversion", function() {
		it("uses backing data type", function() {
			expect(valid + "").toEqual(_10 + "");
		});

		it("converts out-of-bounds numbers to invalid dollars", function() {
		  expect(new UserEnteredDollars(`${ValidDollars.MAX_VALUE + 1}`).isValid()).toBe(false);
    });
	});


	describe("rendering", function() {
		it("remembers user's exact text", function() {
			expect(new UserEnteredDollars("   x y z  ").getUserText()).toEqual("   x y z  ");
		});

		it("uses backing data type", function() {
			const userTarget = new RenderTargetStub();
			const numberTarget = new RenderTargetStub();

			valid.renderTo(userTarget);
			_10.renderTo(numberTarget);
			expect(userTarget).toEqual(numberTarget);
		});
	});

});
