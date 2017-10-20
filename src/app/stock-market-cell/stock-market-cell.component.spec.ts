import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StockMarketCellComponent } from './stock-market-cell.component';
import { Year } from "../../values/year";
import { ValidDollars } from "../../values/valid_dollars";

describe('StockMarketCellComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketCellComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  it("renders text of value", () => {
    expect(domNodeFor(new Year(1989)).textContent).toEqual("1989");
 		expect(domNodeFor(new ValidDollars(-10)).textContent).toEqual("($10)");
 	});

  it("renders negative values with CSS class", () => {
    expect(domNodeFor(new ValidDollars(-10)).className).toEqual("negative");
    expect(domNodeFor(new ValidDollars(10)).className).toEqual("");
  });

  function domNodeFor(value) {
    const fixture = TestBed.createComponent(TestHostComponent);
    const testHost = fixture.componentInstance;

    testHost.value = value;
    fixture.detectChanges();
    return fixture.debugElement.query(By.css("td")).nativeElement;
  }

});


@Component({
  template: `
    <table><tbody><tr>
      <td app-stock-market-cell [value]="value"></td>
    </tr></tbody></table>
  `
})
class TestHostComponent {
  value: any;
}
