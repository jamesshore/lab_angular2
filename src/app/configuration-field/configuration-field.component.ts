import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  model: TemporaryModel;
  stringModel: string = "stringModel_initial_value";


  private target: RenderTarget;

  constructor() {
    this.target = new MyRenderTarget(this);
    this.model = new TemporaryModel(this);
  }

  ngOnChanges() {
    this.value.renderTo(this.target);
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

  constructor(private _component: ConfigurationFieldComponent) {}

  get value(): string {
    if (this._component.value) return this._component.value.getUserText();
    else return "";
  }

  set value(newValue: string) {
    console.log(`SET: --> ${newValue}`);
    this._component.value = new UserEnteredDollars(newValue);
  }

}
