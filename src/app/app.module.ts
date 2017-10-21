import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StockMarketTableComponent } from './stock-market-table/stock-market-table.component';
import { StockMarketRowComponent } from './stock-market-row/stock-market-row.component';
import { StockMarketCellComponent } from "./stock-market-cell/stock-market-cell.component";
import { ConfigurationFieldComponent } from './configuration-field/configuration-field.component';
import { ConfigurationPanelComponent } from './configuration-panel/configuration-panel.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    StockMarketTableComponent,
    StockMarketRowComponent,
    StockMarketCellComponent,
    ConfigurationFieldComponent,
    ConfigurationPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
