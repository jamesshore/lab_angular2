// Copyright (c) 2014-2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { RenderValues } from "./render_target";

export class RenderTargetStub {

  public rendering: RenderValues;

  render(values: RenderValues): void {
    this.rendering = values;
  }

}
