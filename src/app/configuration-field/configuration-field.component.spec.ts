import { async, TestBed } from '@angular/core/testing';

import { ConfigurationFieldComponent } from './configuration-field.component';
import { Component } from "@angular/core";
import { Dollars } from "../../values/dollars";
import { ValidDollars } from "../../values/valid_dollars";
import { UserEnteredDollars } from "../../values/user_entered_dollars";
import { InvalidDollars } from "../../values/invalid_dollars";

const IRRELEVANT_DOLLARS = new UserEnteredDollars("irrelevant dollars");
const IRRELEVANT_LABEL = "irrelevant label";

describe('ConfigurationFieldComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationFieldComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  it("displays label", () => {
    const { fixture } = createComponent(IRRELEVANT_DOLLARS, "my label");
    expect(labelOf(fixture)).toBe("my label:");
  });

  it("renders valid values", () => {
    const textField = textFieldFor(new UserEnteredDollars("123"));

    expect(textField.value).toBe("123");
    expect(textField.className).toBe("");
    expect(textField.attributes["title"].value).toBe("");
  });

  it("renders invalid values with a warning icon", () => {
    const textField = textFieldFor(new UserEnteredDollars("xxx"));

    expect(textField.value).toBe("xxx");
    expect(textField.className).toBe("invalid");
    expect(textField.getAttribute("title")).toBe("Invalid dollar amount");
  });

  it("changes rendering when user input changes", () => {
    const { fixture, testHost } = createComponent(new UserEnteredDollars("123"), IRRELEVANT_LABEL);
    expect(textFieldOf(fixture).className).toBe("");

    testHost.value = new UserEnteredDollars("xxx");
    fixture.detectChanges();
    expect(textFieldOf(fixture).className).toBe("invalid");
  });
});


@Component({
  template: "<app-configuration-field [value]='value'>{{label}}</app-configuration-field>"
})
class TestHostComponent {
  value: UserEnteredDollars;
  label: string;
}

function createComponent(value: UserEnteredDollars, label: string) {
  const fixture = TestBed.createComponent(TestHostComponent);
  const testHost = fixture.componentInstance;

  testHost.value = value;
  testHost.label = label;
  fixture.detectChanges();
  return { fixture, testHost };
}

function labelOf(fixture) {
  return fixture.debugElement.nativeElement.querySelector("label").textContent;
}

function textFieldFor(dollars: UserEnteredDollars) {
  const { fixture } = createComponent(dollars, IRRELEVANT_LABEL);
  return textFieldOf(fixture);
}

function textFieldOf(fixture) {
  return fixture.debugElement.nativeElement.querySelector("input");
}
