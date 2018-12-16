import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html'
})
export class UserManagementTableComponent {
  @Input() data: Array<any>;
  @Input() paginate: PaginationInstance;
  @Output() adding = new EventEmitter();
  @Output() editing = new EventEmitter();
  @Output() deleting = new EventEmitter();
  @Output() getFilter = new EventEmitter();
  @Output() printing = new EventEmitter();
  searchTxt = '';
  isThChk = false;
  isModal = false;
  activeIndex = -1;

  /**
   * handles check & unCheck all
   * @param value the selected checkbox
   */
  thToggleCheck(value) {
    _.forEach(this.data, (item, idx) => {
      item.isChecked = value;
    });
  }

  /**
   * handles the checkbox selection
   * @param idx the id
   * @param value the value
   */
  changeCheckbox(idx: number, value: boolean): void {
    // unCheck thead cheackbox, if any of body chkbox is uncheck
    this.data[idx].isChecked = value;
    const isTh = this.data.every((item) => {
      return item.isChecked;
    });
    this.isThChk = isTh;
  }

  /**
   * handles the add button click
   */
  addRow() {
    this.adding.emit(true);
  }

  /**
   * handles the edit click
   * @param item the item id
   */
  editRow(item) {
    this.editing.emit(item);
  }

  /**
   * handles the delete button click
   * @param item the item id
   */
  deleteRow(item) {
    this.deleting.emit(item);
  }

  /**
   * handles on filter functionality
   */
  onFilter() {
    this.getFilter.emit(this.searchTxt);
  }

  /**
   * handles the print event.
   */
  print() {
    this.printing.emit();
  }
}
