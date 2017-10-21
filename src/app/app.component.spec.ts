// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ConfigurationPanelComponent } from "./configuration-panel/configuration-panel.component";
import { StockMarketTableComponent } from "./stock-market-table/stock-market-table.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UserConfiguration } from "../persistence/user_configuration";
import { By } from "@angular/platform-browser";
import { StockMarketYear } from "../domain/stock_market_year";
import { StockMarketProjection } from "../domain/stock_market_projection";
import { UserEnteredDollars } from "../values/user_entered_dollars";

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [
        AppComponent, ConfigurationPanelComponent, StockMarketTableComponent
      ],
    }).compileComponents();
  }));

  it("initializes configuration panel with default configuration", () => {
    const page = TestPage.create();
    const actualConfig = page.configurationComponent.value;
    const expectedConfig = new UserConfiguration();

    expect(actualConfig.startingBalance).toEqual(expectedConfig.startingBalance);
    expect(actualConfig.startingCostBasis).toEqual(expectedConfig.startingCostBasis);
    expect(actualConfig.yearlySpending).toEqual(expectedConfig.yearlySpending);
  });

  it("initializes projection based on configuration", () => {
    const page = TestPage.create();
    expect(page.tableComponent.value).toEqual(projectionFor(new UserConfiguration()));
  });

  it("updates projection when configuration changes", () => {
    const page = TestPage.create();
    page.setStartingBalance(new UserEnteredDollars("123987"));
    expect(page.tableComponent.value).toEqual(projectionFor(page.component.config));
  });

  function projectionFor(config: UserConfiguration) {
    const firstYear = new StockMarketYear(
      UserConfiguration.STARTING_YEAR,
      config.startingBalance,
      config.startingCostBasis,
      UserConfiguration.INTEREST_RATE,
      UserConfiguration.CAPITAL_GAINS_TAX_RATE
    );
    return new StockMarketProjection(firstYear, UserConfiguration.ENDING_YEAR, config.yearlySpending);
  }

});


class TestPage {

  constructor(public _fixture) {}

  static create(): TestPage {
    const page = new TestPage(TestBed.createComponent(AppComponent));
    page._fixture.detectChanges();
    return page;
  }

  setStartingBalance(amount: UserEnteredDollars) {
    this.component.config.startingBalance = amount;
    this._fixture.detectChanges();
  }

  get component(): AppComponent {
    return this._fixture.componentInstance;
  }

  get configurationComponent(): ConfigurationPanelComponent {
    return this._fixture.debugElement.query(By.directive(ConfigurationPanelComponent)).componentInstance;
  }

  get tableComponent(): StockMarketTableComponent {
    return this._fixture.debugElement.query(By.directive(StockMarketTableComponent)).componentInstance;
  }

}

