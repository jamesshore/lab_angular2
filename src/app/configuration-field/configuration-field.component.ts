import { Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
import { RenderTarget, RenderValues } from "../../values/render_target";
import { UserEnteredDollars } from "../../values/user_entered_dollars";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { noop } from "rxjs/util/noop";

@Component({
  selector: 'app-configuration-field',
  templateUrl: './configuration-field.component.html',
  styleUrls: ['./configuration-field.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ConfigurationFieldComponent), multi: true }
  ]
})
export class ConfigurationFieldComponent implements RenderTarget, OnChanges, ControlValueAccessor {

  @Input() value;
  title: string;
  invalidClass: boolean;

  constructor() {}

  get model(): string {
    if (this.value) return this.value.getUserText();
    else return "";
  }

  set model(newValue: string) {
    console.log("SET MODEL", newValue);
    this.value = new UserEnteredDollars(newValue);
  }

  ngOnChanges() {
    this.value.renderTo(this);
  }

  render(values: RenderValues): void {
    this.invalidClass = values.invalid;
    this.title = values.tooltip || "";
  }


  // *** ControlValueAccessor implementation -- allows use of ngModel directive with this component

  private onChange = noop;   // we need to call this when the value changes
  onBlur = noop;              // we're supposed to call this in response to blur event

  writeValue(value: UserEnteredDollars) {
    console.log("WRITE VALUE", value);
    if (value) {
      this.value = value;
      this.model = value.getUserText();
    }
    console.log("WRITE VALUE END");
  }

  // These are called by Angular during initialization
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onBlur = fn; }
}
