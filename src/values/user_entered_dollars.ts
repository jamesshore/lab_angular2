// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

import { Dollars } from "./dollars";
import { ValidDollars } from "./valid_dollars";
import { InvalidDollars } from "./invalid_dollars";
import { RenderTarget } from "./render_target";

export class UserEnteredDollars extends Dollars {

  private _userText: string;
  private _backingDollars: Dollars;

  constructor(text: string) {
    super();
    this._userText = text;
    this._backingDollars = this.parse(text);
  }

  isValid(): boolean { return this._backingDollars.isValid(); }
  toNumber(): number { return this._backingDollars.toNumber(); }
  plus(operand: Dollars): Dollars { return this._backingDollars.plus(operand); }
  minus(operand: Dollars): Dollars { return this._backingDollars.minus(operand); }
  subtractToZero(operand: Dollars): Dollars { return this._backingDollars.subtractToZero(operand); }
  flipSign(): Dollars { return this._backingDollars.flipSign(); }
  percentage(percent: number): Dollars { return this._backingDollars.percentage(percent); }
  min(operand: Dollars): Dollars { return this._backingDollars.min(operand); }
  toString(): string { return this._backingDollars.toString(); }

  getUserText(): string {
    return this._userText;
  }

  renderTo(target: RenderTarget): void {
    this._backingDollars.renderTo(target);
  }

  private parse(text: string): Dollars {
  	let parenthesis = false;
  	if (startsWith("(")) {
  		text = text.substr(1);
  		parenthesis = true;
  	}
  	if (endsWith(")")) {
  		text = text.substr(0, text.length - 1);
  		parenthesis = true;
  	}
  	if (parenthesis) text = "-" + text;

  	if (startsWith("$")) text = text.substr(1);
  	if (startsWith("-$")) text = "-" + text.substr(2);
  	text = text.replace(/,/g, "");

  	if (text === "" || text === "-") return new ValidDollars(0);

  	if (text.match(/[^\d\.\-]/)) return new InvalidDollars();

  	const number = parseFloat(text);
  	if (isNaN(number)) return new InvalidDollars();
  	else return ValidDollars.create(number);


  	function startsWith(start) {
  		// This code courtesy of CMS, http://stackoverflow.com/a/646643
  		return text.slice(0, start.length) === start;
  	}

  	function endsWith(end) {
  		// This code courtesy of CMS, http://stackoverflow.com/a/646643
  		return text.slice(-end.length) === end;
  	}
  }

}
