import { Injectable } from '@angular/core';
import { UserConfiguration } from "../persistence/user_configuration";

@Injectable()
export class ConfigService {

  getConfig(callback: Function): void {
    UserConfiguration.simulateGetFromServer(callback);
  }

}
