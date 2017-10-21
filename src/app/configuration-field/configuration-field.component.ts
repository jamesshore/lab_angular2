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
  model: TextToValueConverter;
  title: string;
  invalidClass: boolean;

  constructor() {
    this.model = new TextToValueConverter(this);
  }

  ngOnChanges() {
    this.value.renderTo(this);
  }

  render(values: RenderValues): void {
    this.invalidClass = values.invalid;
    this.title = values.tooltip || "";
  }

}


class TextToValueConverter {
  constructor(private _component: ConfigurationFieldComponent) {}

  get value(): string {
    return this._component.value.getUserText();
  }

  set value(newValue: string) {
    this._component.value = new UserEnteredDollars(newValue);
  }
}
