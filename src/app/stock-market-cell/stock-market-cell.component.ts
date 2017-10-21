// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { RenderTarget, RenderValues, SelfRenderable } from "../../values/render_target";

declare type HtmlElement = any;

const NEGATIVE_CLASS = "negative";

@Component({
  selector: '[app-stock-market-cell]',
  template: '{{value}}',
  styleUrls: ['./stock-market-cell.component.css']
})
export class StockMarketCellComponent implements RenderTarget, OnChanges {

  @Input() value: SelfRenderable;
  private _element;

  constructor(el: ElementRef) {
    this._element = el.nativeElement;
  }

  ngOnChanges() {
    this.value.renderTo(this);
  }

  render(values: RenderValues): void {
    if (values.negative) this._element.classList.add(NEGATIVE_CLASS);
    else this._element.classList.remove(NEGATIVE_CLASS);

    if (values.invalid) {
      this._element.innerHTML = "<img src='/invalid_dollars.png' />";
      this._element.setAttribute("title", values.tooltip);
    }
  }

}
