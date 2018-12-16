import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.scss']
})
export class DataInputComponent {
  activeTab = 1;
  isOffcanvas = {
    value: true
  };
  isOpenModal: any;
  modalType = '';
  modalProperties: any = {};

  constructor() { }

  /**
   * handles the form tab click
   * @param value the selected tab value
   */
  toggleForm(value: number) {
    this.activeTab = value;
  }

  /**
   * handles the cancel button click
   * @param value the value
   */
  cancel(value: number) {
    this.activeTab = null;
    setTimeout((() => { this.activeTab = value; }).bind(this), 300)
  }

  sendModalData(data) {
    this.isOpenModal = true;
    this.modalType = data.type;
    this.modalProperties = data.prop;
  }
}
