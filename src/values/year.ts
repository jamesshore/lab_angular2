// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

export class Year {

  constructor(private year: number) {
  }

  nextYear(): Year {
    return new Year(this.year + 1);
  }

  numberOfYearsInclusive(endingYear: Year): number {
    return endingYear.year - this.year + 1;
  }

  toString(): string {
    return this.year + "";
  }

  renderTo(target: any): void {
    target.render({
      text: this.toString(),
      negative: false,
      invalid: false
    });
  }

}
