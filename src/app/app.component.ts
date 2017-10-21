import { Component } from '@angular/core';
import { StockMarketProjection } from "../domain/stock_market_projection";
import { StockMarketYear } from "../domain/stock_market_year";
import { GrowthRate } from "../values/growth_rate";
import { ValidDollars } from "../values/valid_dollars";
import { Year } from "../values/year";
import { TaxRate } from "../values/tax_rate";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  deleteme = new StockMarketProjection(new StockMarketYear(new Year(2010),
      new ValidDollars(10000),
      new ValidDollars(3000),
      new GrowthRate(10),
      new TaxRate(25)
    ), new Year(2050), new ValidDollars(36)
  );
}
