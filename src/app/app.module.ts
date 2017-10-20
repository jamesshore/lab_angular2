import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StockMarketTableComponent } from './stock-market-table/stock-market-table.component';
import { StockMarketRowComponent } from './stock-market-row/stock-market-row.component';
import { StockMarketCellComponent } from "./stock-market-cell/stock-market-cell.component";

@NgModule({
  declarations: [
    AppComponent,
    StockMarketTableComponent,
    StockMarketRowComponent,
    StockMarketCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
