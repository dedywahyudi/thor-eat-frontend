import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { AppConstants } from '../../app.constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalPages: number;
  @Input() activePage: number;
  @Input() paginate: PaginationInstance;
  @Input() showReadAll = {
    'shown': false,
    'checked': false,
    'unreadTopNumber': 0,
    'unreadNumber': 0
  };
  @Output() goto = new EventEmitter();
  @Output() readAll = new EventEmitter();
  @Output() clickChangePageSize = new EventEmitter();
  numbers = [];

  // pagination option dropdown
  paginationOptions: any = {
    perPageRecord: AppConstants.PER_PAGE_RECORDS,
    defaultSelected: AppConstants.DEFAULT_RECORD_LIMIT
  };

  /**
   * handles the read all checkbox click
   * @param event the event
   */
  readAllCheck() {
    this.readAll.emit();
  }

  /**
   * handles the page number click
   * @param {number} pageNumber the page number
   */
  changePage(pageNumber: number) {
    if (pageNumber !== this.paginate.currentPage) {
      this.goto.emit(pageNumber);
    }
  }

  /**
   * handles the change page size
   * @param pageSize the selected page size
   */
  changePageSize(pageSize) {
    this.paginationOptions.defaultSelected = pageSize;
    this.clickChangePageSize.emit(pageSize);
  }
}
