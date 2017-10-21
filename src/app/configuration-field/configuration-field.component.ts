import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { RenderTarget, RenderValues } from "../../values/render_target";
import { UserEnteredDollars } from "../../values/user_entered_dollars";

@Component({
  selector: 'app-configuration-field',
  templateUrl: './configuration-field.component.html',
  styleUrls: ['./configuration-field.component.css']
})
export class ConfigurationFieldComponent implements RenderTarget, OnChanges {

  @Input() value: UserEnteredDollars;
  @Output() onChange = new EventEmitter<UserEnteredDollars>();

  title: string;
  invalidClass: boolean;

  constructor() {}

  get model(): string {
    return this.value.getUserText();
  }

  set model(newValue: string) {
    this.value = new UserEnteredDollars(newValue);
    this.onChange.emit(this.value);
  }

  ngOnChanges() {
    this.value.renderTo(this);
  }

  render(values: RenderValues): void {
    this.invalidClass = values.invalid;
    this.title = values.tooltip || "";
  }

  simulateChange(newValue: string) {
    this.model = newValue;
  }

}
