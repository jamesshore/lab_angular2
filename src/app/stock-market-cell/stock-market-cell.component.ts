import { Component, OnInit, Input } from '@angular/core';
import { Year } from "../../values/year";

@Component({
  selector: '[app-stock-market-cell]',
  template: '{{value}}',
  styleUrls: ['./stock-market-cell.component.css']
})
export class StockMarketCellComponent implements OnInit {

  @Input() value = new Year(1234);

  constructor() {
  }

  ngOnInit() {
  }

}
