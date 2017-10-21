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
export class StockMarketCellComponent implements OnChanges {

  @Input() value: SelfRenderable;
  private renderTarget: RenderTarget;

  constructor(private el: ElementRef) {
    this.renderTarget = new MyRenderTarget(el.nativeElement);
  }

  ngOnChanges() {
    this.value.renderTo(this.renderTarget);
  }

}

class MyRenderTarget implements RenderTarget {

  constructor(private element: HtmlElement) {}

  render(values: RenderValues): void {
    if (values.negative) this.element.classList.add(NEGATIVE_CLASS);
    else this.element.classList.remove(NEGATIVE_CLASS);

    if (values.invalid) {
      this.element.innerHTML = "<img src='/invalid_dollars.png' />";
      this.element.attributes["title"] = values.tooltip;
    }
  }

}
