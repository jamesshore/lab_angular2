// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

export interface RenderTarget {
  render(values: RenderValues): void;
}

interface RenderValues {
  text: string;
  negative: boolean;
  invalid: boolean;
  tooltip?: string;
}
