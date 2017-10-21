import { Component, Input, OnChanges } from '@angular/core';
import { RenderTarget, RenderValues } from "../../values/render_target";
import { UserEnteredDollars } from "../../values/user_entered_dollars";

@Component({
  selector: 'app-configuration-field',
  templateUrl: './configuration-field.component.html',
  styleUrls: ['./configuration-field.component.css']
})
export class ConfigurationFieldComponent implements OnChanges {

  @Input() value: UserEnteredDollars;
  title: string;
  invalidClass: boolean;
  deleteme = new TemporaryModel("initial");

  private target: RenderTarget;

  constructor() {
    console.log("START");
    this.value = new UserEnteredDollars("foo");
    this.target = new MyRenderTarget(this);
  }

  ngOnChanges() {
    this.value.renderTo(this.target);
    console.log("ON CHANGES", this.value);
  }

}


class MyRenderTarget implements RenderTarget {

  constructor(private component) {}

  render(values: RenderValues): void {
    this.component.invalidClass = values.invalid;
    this.component.title = values.tooltip || "";
  }

}



class TemporaryModel {

  constructor(private _value: string) {}

  get value(): string { return this._value; }

  set value(newValue: string) {
    console.log(`SET: ${this._value} --> ${newValue}`);
    this._value = newValue;
  }

}
