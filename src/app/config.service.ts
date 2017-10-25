import { Injectable } from '@angular/core';
import { UserConfiguration } from "../persistence/user_configuration";
import { ConfigurationServer } from "../persistence/configuration_server";

@Injectable()
export class ConfigService {

  getConfig(callback: Function): void {
    new ConfigurationServer().simulateGetFromServer(callback);
  }

}

export class FakeConfigService {

  config: UserConfiguration;

  getConfig(callback: Function): void {
    ConfigurationServer.createFake(this.config).simulateGetFromServer(callback);
  }

}
