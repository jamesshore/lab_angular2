import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StockMarketCellComponent } from './stock-market-cell.component';
import { Year } from "../../values/year";

describe('StockMarketCellComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketCellComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("renders value", () => {
    testHost.value = new Year(1984);
    fixture.detectChanges();
    const cell = fixture.debugElement.query(By.css("td"));

 		expect(cell.nativeElement.innerHTML).toEqual("1984");
 		expect(cell.nativeElement.classList.contains("negative")).toEqual(false);
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
  value: any;
}
