import { Component, Input, OnInit } from '@angular/core';
import { StockMarketYear } from "../../domain/stock_market_year";

@Component({
  selector: '[app-stock-market-row]',
  templateUrl: './stock-market-row.component.html',
  styleUrls: ['./stock-market-row.component.css']
})
export class StockMarketRowComponent implements OnInit {

  @Input() value: StockMarketYear;

  constructor() { }

  ngOnInit() {
  }

}
