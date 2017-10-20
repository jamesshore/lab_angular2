// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

import { Dollars } from "./dollars";
import { RenderTarget } from "./render_target";

export class InvalidDollars extends Dollars {

  private _invalid: string;

  constructor() {
    super();
    this._invalid = "invalid dollars";
  }

  isValid(): boolean {
    return false;
  }

  toNumber(): never {
    throw new Error("Unreachable code executed: InvalidDollars.toNumber()");
  }

  plus(operand: Dollars): Dollars { return new InvalidDollars(); }
  minus(operand: Dollars): Dollars { return new InvalidDollars(); }
  subtractToZero(operand: Dollars): Dollars { return new InvalidDollars(); }
  percentage(percent: number): Dollars { return new InvalidDollars(); }
  min(operand: Dollars): Dollars { return new InvalidDollars(); }
  flipSign(): Dollars { return new InvalidDollars(); }

  renderTo(target: RenderTarget): void {
  	target.render({
  		text: "$???",
  		negative: false,
  		invalid: true,
  		tooltip: "Invalid dollar amount"
  	});
  }

  toString(): string {
    return "$???";
  }

}

