import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { filter } from 'lodash';
import { PaginationInstance } from 'ngx-pagination';
import { AppConstants } from '../../app.constants';
import * as _ from 'lodash';

@Component({
  selector: 'app-change-requests-table',
  templateUrl: './change-requests-table.component.html'
})
export class ChangeRequestsTableComponent {
  @Input() data: Array<any>;
  @Input() paginate: PaginationInstance;
  @Output() getFilter = new EventEmitter();
  @Output() approveOrReject = new EventEmitter();
  @Output() printing = new EventEmitter();

  searchTxt = '';
  isThChk = false;
  showMail = false;
  changeRequestStatus = AppConstants.CHANGE_REQUEST_STATUS;

  constructor() { }

  /**
   * handles the header checkbox click
   * @param value the value
   */
  thToggleCheck(value) {
    _.forEach(this.data, (item, idx) => {
      this.data[idx].isChecked = value;
    });
    this.showMail = value;
  }

  /**
   * handles the checkbox change event
   * @param idx the id
   * @param value the value
   */
  changeCheckBox(idx: number, value: boolean): void {
    // unCheck thead cheackbox, if any of body chkbox is uncheck
    this.data[idx].isChecked = value;
    const isTh = this.data.every((item) => {
      return item.isChecked;
    });
    this.isThChk = isTh;
    if (filter(this.data, i => i.isChecked).length) {
      this.showMail = true;
    } else {
      this.showMail = false;
    }
  }

  /**
   * handles on filter functionality
   */
  onFilter() {
    this.getFilter.emit(this.searchTxt);
  }

  /**
   * handles the approve click
   * @param item the selected item
   */
  approve(item) {
    this.approveOrReject.emit({ action: 'approve', item });
  }

  /**
   * handles the reject click
   * @param item the selected item
   */
  reject(item) {
    this.approveOrReject.emit({ action: 'reject', item });
  }

  /**
   * handles the print event.
   */
  print() {
    this.printing.emit();
  }
}
