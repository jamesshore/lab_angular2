// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Component, NgZone } from '@angular/core';
import { StockMarketProjection } from "../domain/stock_market_projection";
import { StockMarketYear } from "../domain/stock_market_year";
import { UserConfiguration } from "../persistence/user_configuration";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  config = new UserConfiguration();
  projection = this.projectionFor(this.config);

  constructor(zone: NgZone) {
    this.config.onChange(() => {
      this.projection = this.projectionFor(this.config);
    });
  }

  private projectionFor(config: UserConfiguration) {
    const firstYear = new StockMarketYear(
      UserConfiguration.STARTING_YEAR,
      config.startingBalance,
      config.startingCostBasis,
      UserConfiguration.INTEREST_RATE,
      UserConfiguration.CAPITAL_GAINS_TAX_RATE
    );
    return new StockMarketProjection(firstYear, UserConfiguration.ENDING_YEAR, config.yearlySpending);
  }

}
