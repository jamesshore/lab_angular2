// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { UserConfiguration } from "./user_configuration";

export class ConfigurationServer {

  static createFake(fakeServerConfig) {
    return new FakeConfigurationServer(fakeServerConfig);
  }

  simulateGetFromServer(callback: Function): void {
    setTimeout(() => {
      const config = new UserConfiguration();
      // config.startingBalance = new UserEnteredDollars("4242");
      // config.startingCostBasis = new UserEnteredDollars("4200");
      // config.yearlySpending = new UserEnteredDollars("420");
      callback(config);
    }, 1000);
  }

}

class FakeConfigurationServer {

  constructor(private readonly _config: UserConfiguration) {}

  simulateGetFromServer(callback: Function): void {
    callback(this._config);
  }

}
