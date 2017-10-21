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
    const testHost = TestHostComponent.create(IRRELEVANT_DOLLARS, "my label");
    expect(testHost.labelDom.textContent).toBe("my label:");
  }));

  it("renders valid values", fakeAsync(() => {
    const textField = TestHostComponent.textFieldFor(new UserEnteredDollars("123"));

    expect(textField.value).toBe("123");
    expect(textField.classList.contains("invalid")).toBe(false);
    expect(textField.attributes["title"].value).toBe("");
  }));

  it("renders invalid values with a warning icon", fakeAsync(() => {
    const textField = TestHostComponent.textFieldFor(new UserEnteredDollars("xxx"));

    expect(textField.value).toBe("xxx");
    expect(textField.classList.contains("invalid")).toBe(true);
    expect(textField.getAttribute("title")).toBe("Invalid dollar amount");
  }));

  it("changes rendering when value changes", fakeAsync(() => {
    const testHost = TestHostComponent.create(new UserEnteredDollars("123"), IRRELEVANT_LABEL);
    const textField = testHost.textFieldDom;
    expect(textField.classList.contains("invalid")).toBe(false);

    testHost.updateValue(new UserEnteredDollars("xxx"));
    expect(textField.classList.contains("invalid")).toBe(true);
  }));

  it("updates value when field changes due to user input", fakeAsync(() => {
    const testHost = TestHostComponent.create(new UserEnteredDollars("original"), IRRELEVANT_LABEL);

    testHost.simulateUserInput("updated");
    expect(testHost.component.value).toEqual(new UserEnteredDollars("updated"));
  }));

  it("sends event when field changes due to user input", fakeAsync(() => {
    const testHost = TestHostComponent.create(new UserEnteredDollars("original"), IRRELEVANT_LABEL);

    testHost.simulateUserInput("42");
    expect(testHost.lastEvent).toEqual(new UserEnteredDollars("42"));
  }));

  it("simulates field change (for testing purposes)", fakeAsync(() => {
    const testHost = TestHostComponent.create(new UserEnteredDollars("original"), IRRELEVANT_LABEL);

    testHost.component.simulateChange("99");
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

  private _fixture;

  static create(value: UserEnteredDollars, label: string) {
    const fixture = TestBed.createComponent(TestHostComponent);
    const testHost = fixture.componentInstance;

    testHost.value = value;
    testHost.label = label;
    testHost._fixture = fixture;
    fixture.detectChanges();
    tick();

    return testHost;
  }

  static textFieldFor(value: UserEnteredDollars) {
    const testHost = this.create(value, IRRELEVANT_LABEL);
    return testHost.textFieldDom;
  }

  updateValue(newValue: UserEnteredDollars) {
    this.value = newValue;
    this._fixture.detectChanges();
  }

  simulateUserInput(newValue: string) {
    const textField = this.textFieldDom;
    textField.value = newValue;
    textField.dispatchEvent(new Event("input"));
  }

  get component(): ConfigurationFieldComponent {
    return this._fixture.debugElement.query(By.directive(ConfigurationFieldComponent)).componentInstance;
  }

  get labelDom() {
    return this._fixture.debugElement.nativeElement.querySelector("label");
  }

  get textFieldDom() {
    return this._fixture.debugElement.nativeElement.querySelector("input");
  }

}
