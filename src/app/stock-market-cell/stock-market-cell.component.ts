import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-stock-market-cell]',
  templateUrl: './stock-market-cell.component.html',
  styleUrls: ['./stock-market-cell.component.css']
})
export class StockMarketCellComponent implements OnInit {

  value = "Hi!";

  constructor() {
  }

  ngOnInit() {
  }

}
