import { Component, OnInit } from '@angular/core';
// import { Year } from "../../values/year";

@Component({
  selector: '[app-stock-market-cell]',
  template: '{{value}}',
  styleUrls: ['./stock-market-cell.component.css']
})
export class StockMarketCellComponent implements OnInit {

  value = "temp";

  constructor() {
  }

  ngOnInit() {
  }

}
