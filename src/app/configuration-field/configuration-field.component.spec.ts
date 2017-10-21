import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ConfigurationFieldComponent } from './configuration-field.component';
import { Component } from "@angular/core";
import { Dollars } from "../../values/dollars";
import { ValidDollars } from "../../values/valid_dollars";
import { UserEnteredDollars } from "../../values/user_entered_dollars";
import { InvalidDollars } from "../../values/invalid_dollars";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

const IRRELEVANT_DOLLARS = new UserEnteredDollars("irrelevant dollars");
const IRRELEVANT_LABEL = "irrelevant label";

describe('ConfigurationFieldComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationFieldComponent, TestHostComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  it("displays label", fakeAsync(() => {
    const { fixture } = createComponent(IRRELEVANT_DOLLARS, "my label");
    expect(labelOf(fixture)).toBe("my label:");
  }));

  it("renders valid values", fakeAsync(() => {
    const textField = textFieldFor(new UserEnteredDollars("123"));

    expect(textField.value).toBe("123");
    expect(textField.classList.contains("invalid")).toBe(false);
    expect(textField.attributes["title"].value).toBe("");
  }));

  it("renders invalid values with a warning icon", fakeAsync(() => {
    const textField = textFieldFor(new UserEnteredDollars("xxx"));

    expect(textField.value).toBe("xxx");
    expect(textField.classList.contains("invalid")).toBe(true);
    expect(textField.getAttribute("title")).toBe("Invalid dollar amount");
  }));

  it("changes rendering when value changes", fakeAsync(() => {
    const { fixture, testHost } = createComponent(new UserEnteredDollars("123"), IRRELEVANT_LABEL);
    expect(textFieldOf(fixture).classList.contains("invalid")).toBe(false);

    testHost.value = new UserEnteredDollars("xxx");
    fixture.detectChanges();
    expect(textFieldOf(fixture).classList.contains("invalid")).toBe(true);
  }));

  it("updates value when field changes due to user input", fakeAsync(() => {
    const { fixture, component } = createComponent(new UserEnteredDollars("original"), IRRELEVANT_LABEL);
    const textField = textFieldOf(fixture);
    expect(textField.value).toBe("original");

    setInputValue(textField, "updated");
    expect(component.value).toEqual(new UserEnteredDollars("updated"));
  }));

  it("sends event when field changes", fakeAsync(() => {
    const { fixture, testHost } = createComponent(new UserEnteredDollars("original"), IRRELEVANT_LABEL);
    const textField = textFieldOf(fixture);

    setInputValue(textField, "42");
    expect(testHost.lastEvent).toEqual(new UserEnteredDollars("42"));
  }));

  function setInputValue(domElement, value: string) {
    domElement.value = value;
    domElement.dispatchEvent(new Event("input"));
  }

  it("simulates field change (for testing purposes)", fakeAsync(() => {
    const { testHost, component } = createComponent(new UserEnteredDollars("original"), IRRELEVANT_LABEL);

    component.simulateChange("99");
    expect(testHost.lastEvent).toEqual(new UserEnteredDollars("99"));
  }));
});


@Component({
  template: "<app-configuration-field [value]='value' (onChange)='onChange($event)'>" +
    "{{label}}" +
  "</app-configuration-field>"
})
class TestHostComponent {
  lastEvent: UserEnteredDollars;
  value: UserEnteredDollars;
  label: string;
  onChange(event: UserEnteredDollars) {
    this.lastEvent = event;
  }
}

function createComponent(value: UserEnteredDollars, label: string) {
  const fixture = TestBed.createComponent(TestHostComponent);
  const testHost = fixture.componentInstance;
  const component = fixture.debugElement.query(By.directive(ConfigurationFieldComponent)).componentInstance;

  testHost.value = value;
  testHost.label = label;
  fixture.detectChanges();
  tick();

  return { fixture, testHost, component };
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
