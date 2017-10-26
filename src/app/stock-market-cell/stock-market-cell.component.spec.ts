// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Component } from "@angular/core";
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StockMarketCellComponent } from './stock-market-cell.component';
import { Year } from "../../values/year";
import { ValidDollars } from "../../values/valid_dollars";
import { RenderTarget, SelfRenderable } from "../../values/render_target";
import { InvalidDollars } from "../../values/invalid_dollars";

describe('StockMarketCellComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketCellComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  it("renders text of value", () => {
    expect(domNodeFor(new Year(1989)).textContent).toBe("1989");
 		expect(domNodeFor(new ValidDollars(-10)).textContent).toBe("($10)");
 	});

  it("renders negative values with CSS class", () => {
    expect(domNodeFor(new ValidDollars(-10)).className).toBe("negative");
    expect(domNodeFor(new ValidDollars(10)).className).toBe("");
  });

  it("renders invalid values", () => {
    const node = domNodeFor(new InvalidDollars());
    const imgNode = node.querySelector("img");

    expect(node.className).toBe("");
    expect(node.getAttribute("title")).toBe("Invalid dollar amount");
    expect(imgNode.getAttribute("src")).toBe("/assets/invalid_dollars.png");
  });

  it("updates rendering when underlying value changes", () => {
    const { fixture, testHost, node } = createComponent(new ValidDollars(-10));
    expect(node.className).toBe("negative");

    testHost.value = new ValidDollars(10);
    fixture.detectChanges();
    expect(node.className).toBe("");
  });

  it("sanitizes text", () => {
    const node = domNodeFor(new EvilValueObject());
    expect(node.innerHTML).toBe(EvilValueObject.sanitizedText);
  });

});


@Component({
  template: `
    <table><tbody><tr>
      <td app-stock-market-cell [value]="value"></td>
    </tr></tbody></table>
  `
})
class TestHostComponent {
  value: SelfRenderable;
}

function createComponent(value: SelfRenderable) {
  const fixture = TestBed.createComponent(TestHostComponent);
  const testHost = fixture.componentInstance;
  const node = fixture.debugElement.query(By.css("td")).nativeElement;

  testHost.value = value;
  fixture.detectChanges();
  return { fixture, testHost, node };
}

function domNodeFor(value: SelfRenderable) {
  const { fixture, testHost, node } = createComponent(value);
  return node;
}


class EvilValueObject implements SelfRenderable {
  static readonly evilText = "<a></a>";
  static readonly sanitizedText = "&lt;a&gt;&lt;/a&gt;";

  renderTo(target: RenderTarget) {
    target.render({
      text: EvilValueObject.evilText,
      negative: false,
      invalid: false
    });
  }

  toString() {
    return EvilValueObject.evilText;
  }

}
