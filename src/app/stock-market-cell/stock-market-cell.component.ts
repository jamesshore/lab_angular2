import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { RenderTarget, RenderValues, SelfRenderable } from "../../values/render_target";

declare type HtmlElement = any;

const NEGATIVE_CLASS = "negative";

@Component({
  selector: '[app-stock-market-cell]',
  template: '{{value}}',
  styleUrls: ['./stock-market-cell.component.css']
})
export class StockMarketCellComponent implements OnInit {

  @Input() value: SelfRenderable;
  private renderTarget: RenderTarget;

  constructor(private el: ElementRef) {
    this.renderTarget = new MyRenderTarget(el.nativeElement);
  }

  ngOnInit() {
    this.value.renderTo(this.renderTarget);
  }

}

class MyRenderTarget implements RenderTarget {

  constructor(private nativeElement: HtmlElement) {}

  render(values: RenderValues): void {
    if (values.negative) this.nativeElement.classList.add(NEGATIVE_CLASS);
    else this.nativeElement.classList.remove(NEGATIVE_CLASS);
  }

}
