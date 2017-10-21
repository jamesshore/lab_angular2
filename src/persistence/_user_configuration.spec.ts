// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { UserConfiguration } from "./user_configuration";
import { UserEnteredDollars } from "../values/user_entered_dollars";

describe("UserConfiguration", function() {

	let config: UserConfiguration;
	const newValue = new UserEnteredDollars("new value");

	beforeEach(function() {
		config = new UserConfiguration();
	});

	it("has defaults", function() {
		expect(config.getStartingBalance()).toBe(UserConfiguration.DEFAULT_STARTING_BALANCE);
		expect(config.getStartingCostBasis()).toBe(UserConfiguration.DEFAULT_STARTING_COST_BASIS);
		expect(config.getYearlySpending()).toBe(UserConfiguration.DEFAULT_YEARLY_SPENDING);
	});

	describe("change event", function() {

		let eventTriggered = false;

		beforeEach(function() {
			config.onChange(function() {
				eventTriggered = true;
			});
		});

		it("triggers when starting balance changes", function() {
			config.setStartingBalance(newValue);
			expect(eventTriggered).toBe(true);
			expect(config.getStartingBalance()).toBe(newValue);
		});

		it("triggers when starting cost basis changes", function() {
			config.setStartingCostBasis(newValue);
			expect(eventTriggered).toBe(true);
			expect(config.getStartingCostBasis()).toBe(newValue);
		});

		it("triggers when yearly spending changes", function() {
			config.setYearlySpending(newValue);
			expect(eventTriggered).toBe(true);
			expect(config.getYearlySpending()).toBe(newValue);
		});

		it("supports multiple observers", function() {
			let secondHandlerTriggered = false;
			config.onChange(function() {
				secondHandlerTriggered = true;
			});

			config.setStartingBalance(newValue);
			expect(secondHandlerTriggered).toBe(true);
		});
	});

});
