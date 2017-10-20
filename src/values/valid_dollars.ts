// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

import { Dollars } from "./dollars";
import { InvalidDollars } from "./invalid_dollars";
import { RenderTarget } from "./render_target";

export class ValidDollars extends Dollars {

  private _amount: number;

  static create(amount: number): Dollars {
    if (this.inRange(amount)) return new ValidDollars(amount);
    return new InvalidDollars();
  }

  constructor(amount: number) {
    super();
    this._amount = amount;
  }

  isValid(): boolean {
    return true;
  }

  toNumber(): number {
    return this._amount;
  }

  plus(operand: Dollars): Dollars {
    return this.arithmetic(operand, (left, right) => {
      return left + right;
    });
  }

  minus(operand: Dollars): Dollars {
    return this.arithmetic(operand, (left, right) => {
      return left - right;
    });
  }

  subtractToZero(operand: Dollars): Dollars {
    return this.arithmetic(operand, (left, right) => {
      return Math.max(0, left - right);
    });
  }

  flipSign(): Dollars {
    let amount = this._amount * -1;
    if (amount === -0) amount = +0;     // Normalize -0 to +0
    return new ValidDollars(amount);
  }

  percentage(operand: number): Dollars {
    return new ValidDollars(this._amount * operand / 100);
  }

  min(operand: Dollars): Dollars {
    return this.arithmetic(operand, (left, right) => {
      return Math.min(left, right);
    });
  }

  toString(): string {
    let result = this.absoluteValueString(this._amount);
    if (this._amount < 0) result = "(" + result + ")";
    return result;
  }

  renderTo(target: RenderTarget): void {
    target.render({
      text: this.toString(),
      negative: (this._amount <= -0.5),
      invalid: false
    });
  }

  private absoluteValueString(amount: number): string {
    // The following regex courtesy of Elias Zamaria, http://stackoverflow.com/a/2901298
    const unformatted = "" + Math.round(Math.abs(amount));
    const formatted = unformatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + formatted;
  }

  private arithmetic(operand: Dollars, fn: (left: number, right: number) => number): Dollars {
    if (!operand.isValid()) return new InvalidDollars();

    return new ValidDollars(fn(this._amount, operand.toNumber()));
  }

  private static inRange(value: number) {
    return (value >= this.MIN_VALUE) && (value <= this.MAX_VALUE);
  }
}
