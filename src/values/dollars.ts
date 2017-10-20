// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

import { RenderTarget } from "./render_target";
import { InvalidDollars } from "./invalid_dollars";
import { ValidDollars } from "./valid_dollars";

// This is a pure superclass. It's used for type checking purposes.
export abstract class Dollars {

  static readonly MAX_VALUE = 1000000000;
  static readonly MIN_VALUE = -1000000000;

  static create(amount: number): Dollars {
    if (this.inRange(amount)) return new ValidDollars(amount);
    else return new InvalidDollars();
  }

  abstract flipSign(): Dollars;
  abstract isValid(): boolean;
  abstract toNumber(): number;
  abstract plus(operand: Dollars): Dollars;
  abstract minus(operand: Dollars): Dollars;
  abstract subtractToZero(operand: Dollars): Dollars;
  abstract percentage(percent: number): Dollars;
  abstract min(operand: Dollars): Dollars;
  abstract renderTo(target: RenderTarget): void;

  private static inRange(value: number) {
    return (value >= this.MIN_VALUE) && (value <= this.MAX_VALUE);
  }

}
