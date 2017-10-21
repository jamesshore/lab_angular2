// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationPanelComponent } from './configuration-panel.component';
import { Component } from "@angular/core";
import { UserConfiguration } from "../../persistence/user_configuration";
import { ConfigurationFieldComponent } from "../configuration-field/configuration-field.component";
import { By } from "@angular/platform-browser";
import { UserEnteredDollars } from "../../values/user_entered_dollars";
import { FormsModule } from "@angular/forms";

describe('ConfigurationPanelComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationPanelComponent, TestHostComponent, ConfigurationFieldComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  it("contains three fields with appropriate defaults", () => {
    const fields = fieldValuesFor(new UserConfiguration());
    expect(fields[0]).toEqual(UserConfiguration.DEFAULT_STARTING_BALANCE);
    expect(fields[1]).toEqual(UserConfiguration.DEFAULT_STARTING_COST_BASIS);
    expect(fields[2]).toEqual(UserConfiguration.DEFAULT_YEARLY_SPENDING);
  });

  it("updates fields when user configuration is replaced", () => {
    const original = new UserConfiguration();
    const { fixture, testHost } = createComponent(original);

    const updated = new UserConfiguration();
    updated.startingBalance = new UserEnteredDollars("new configuration");
    testHost.value = updated;
    fixture.detectChanges();

    const fields = fieldValuesOf(fixture);
    expect(fields[0]).toEqual(updated.startingBalance);
  });

  it("updates fields when user configuration changes", () => {
    const config = new UserConfiguration();
    const { fixture } = createComponent(config);

    config.startingBalance = new UserEnteredDollars("changed configuration");
    fixture.detectChanges();

    const fields = fieldValuesOf(fixture);
    expect(fields[0]).toEqual(new UserEnteredDollars("changed configuration"));
  });

  // it("updates user configuration when field changes (due to user input)", (done) => {
  //   const config = new UserConfiguration();
  //   const { fixture } = createComponent(config);
  //
  //   const fields = fixture.debugElement.queryAll(By.directive(ConfigurationFieldComponent));
  //
  //   const elements = fieldElementsOf(fixture);
  //   elements[0].value = "foo";
  //   fields[0].triggerEventHandler("input", null);
  //   // elements[1].value = "bar";
  //   // elements[2].value = "baz";
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     console.log("PROMISE FULFILLED");
  //     expect(config.startingBalance).toEqual(new UserEnteredDollars("foo"));
  //     done();
  //     console.log("DONE CALLED");
  //   });
  //   console.log("PROMISE IN FLIGHT");
  // });

});


@Component({
  template: "<app-configuration-panel [value]='value'></app-configuration-panel>"
})
class TestHostComponent {
  value: UserConfiguration;
}

function createComponent(value: UserConfiguration) {
  const fixture = TestBed.createComponent(TestHostComponent);
  const testHost = fixture.componentInstance;

  testHost.value = value;
  fixture.detectChanges();
  return { fixture, testHost };
}

function fieldElementsOf(fixture) {
  const fields = fixture.debugElement.queryAll(By.directive(ConfigurationFieldComponent));
  return fields.map((field) => field.nativeElement);
}

function fieldElementsFor(value: UserConfiguration) {
  const { fixture } = createComponent(value);
  return fieldElementsOf(fixture);
}

function fieldValuesOf(fixture) {
  const fields = fixture.debugElement.queryAll(By.directive(ConfigurationFieldComponent));
  return fields.map((field) => field.componentInstance.value);
}

function fieldValuesFor(value: UserConfiguration) {
  const { fixture } = createComponent(value);
  return fieldValuesOf(fixture);
}
