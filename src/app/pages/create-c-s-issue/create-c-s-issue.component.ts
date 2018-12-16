import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-c-s-issue',
  templateUrl: './create-c-s-issue.component.html',
  styleUrls: ['./create-c-s-issue.component.scss']
})
export class CreateCSIssueComponent {
  activeTab = 2;
  isOffcanvas = {
    value: true
  };

  constructor() { }
}
