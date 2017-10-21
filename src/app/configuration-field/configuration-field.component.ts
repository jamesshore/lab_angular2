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

  private target: RenderTarget;

  constructor() {
    this.target = new MyRenderTarget(this);
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
