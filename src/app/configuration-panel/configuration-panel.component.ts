// Copyright (c) 2017 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

import { Component, Input, OnInit } from '@angular/core';
import { UserConfiguration } from "../../persistence/user_configuration";

@Component({
  selector: 'app-configuration-panel',
  templateUrl: './configuration-panel.component.html',
  styleUrls: ['./configuration-panel.component.css']
})
export class ConfigurationPanelComponent implements OnInit {

  @Input() value: UserConfiguration;

  constructor() { }

  ngOnInit() {
  }

}
