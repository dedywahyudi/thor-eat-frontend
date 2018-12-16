import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-division-organization',
  templateUrl: './division-organization.component.html',
  styleUrls: ['./division-organization.component.scss']
})
export class DivisionOrganizationComponent implements OnInit {
  activeTab = 1;
  isOffcanvas = {
    value: true
  };

  constructor() { }

  /**
   * handles the form tab click
   * @param value the selected tab value
   */
  toggleForm(value: number) {
    this.activeTab = value;
  }

  ngOnInit() {
  }
}
