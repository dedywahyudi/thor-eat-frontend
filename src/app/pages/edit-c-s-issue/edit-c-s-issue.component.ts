import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-c-s-issue',
  templateUrl: './edit-c-s-issue.component.html',
  styleUrls: ['./edit-c-s-issue.component.scss']
})
export class EditCSIssueComponent {
  activeTab = 2;
  isOffcanvas = {
    value: true
  };

  isOpenModal: any;
  modalType = '';
  modalProperties: any = {};

  constructor() { }

  sendModalData(data) {
    this.isOpenModal = true;
    this.modalType = data.type;
    this.modalProperties = data.prop;
  }

}
