import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RenderTarget, RenderValues } from "../../values/render_target";
import { UserEnteredDollars } from "../../values/user_entered_dollars";

@Component({
  selector: 'app-configuration-field',
  templateUrl: './configuration-field.component.html',
  styleUrls: ['./configuration-field.component.css']
})
export class ConfigurationFieldComponent implements RenderTarget, OnChanges {

  @Input() value: UserEnteredDollars;
  title: string;
  invalidClass: boolean;

  constructor() {}

  get model(): string {
    return this.value.getUserText();
  }

  set model(newValue: string) {
    this.value = new UserEnteredDollars(newValue);
  }

  ngOnChanges() {
    this.value.renderTo(this);
  }

  render(values: RenderValues): void {
    this.invalidClass = values.invalid;
    this.title = values.tooltip || "";
  }

}
