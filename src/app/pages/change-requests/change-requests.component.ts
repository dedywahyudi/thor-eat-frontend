import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChangeRequestService } from '../../service/change-request.service';
import { AppConstants } from '../../app.constants';
import { PaginationInstance } from 'ngx-pagination';
import { UtilService } from '../../service/util.service';
import { UserService } from '../../service/user.service';
import { each, map } from 'lodash';

@Component({
  selector: 'app-change-requests',
  templateUrl: './change-requests.component.html',
  styleUrls: ['./change-requests.component.scss']
})
export class ChangeRequestsComponent implements OnInit {
  isOffcanvas = {
    value: true
  };
  results: Array<any>;
  isOpenModal: any;
  modalType = '';

  maxErrorMessageLen = 100;

  rowData: any = {};
  modalProperties: any = {
    title: '',
    body: ''
  };

  filterCriteria: any = {
    limit: AppConstants.DEFAULT_RECORD_LIMIT,
    keyword: null,
    offset: 0
  };

  // pagination options
  public paginationOptions: PaginationInstance = {
    id: 'change-request-view',
    itemsPerPage: AppConstants.DEFAULT_RECORD_LIMIT,
    currentPage: 1,
    totalItems: 0
  };

  allRequests = [];
  public allPagination: PaginationInstance = {
    id: 'change-request-view-all',
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private changeRequestService: ChangeRequestService,
    private userService: UserService,
    private util: UtilService) { }

  /**
   * on init
   */
  ngOnInit() {
    this.getResults();
  }

  /**
   * gets the result
   */
  getResults(): void {
    this.changeRequestService.get(this.filterCriteria).subscribe(res => {
      console.log(res);
      window.scrollTo(0, 0);
      this.results = res.items;
      this.paginationOptions.totalItems = res.total;
    }, this.util.logError);
  }

  /**
   * handles the pagination click
   * @param pageNum the page number
   */
  setPage(pageNum: number) {
    this.filterCriteria.offset = this.filterCriteria.limit * (pageNum - 1);
    this.paginationOptions.currentPage = pageNum;
    this.getResults();
  }

  /**
   * handles the search text box functionality
   * @param keyword the searched keyword
   */
  getQueryResult(keyword): void {
    this.filterCriteria.offset = 0;
    this.paginationOptions.currentPage = 1;
    this.filterCriteria.keyword = keyword;
    this.getResults();
  }

  /**
   * handles the page size change
   * @param pageSize the page number
   */
  changePageSize(pageSize) {
    this.filterCriteria.offset = 0;
    this.filterCriteria.limit = pageSize;
    this.paginationOptions.currentPage = 1;
    this.paginationOptions.itemsPerPage = pageSize;
    this.getResults();
  }

  /**
   * handles the approve or reject click
   * @param data the selected data
   */
  approveOrReject(data) {
    if (data.action === 'approve') {
      this.rowData = data;
      this.modalType = 'approve';
      this.isOpenModal = true;
    } else if (data.action === 'reject') {
      this.rowData = data;
      this.modalType = 'reject';
      this.isOpenModal = true;
    }
  }

 /**
   * handles the approve button callback
  */
 confirmApprove(data) {
  this.changeRequestService.approve(data.item.id).subscribe((res) => {
    this.modalType = 'approve-reject-success';
    this.modalProperties.title = 'Change Request Approved';
    if (data.item.recordType === 'Standard') {
      this.modalProperties.message = `Standard "${data.item.pendingStandard.name}" approved!
    Email notification sent to these following emails:`;
    } else if (data.item.recordType === 'Division') {
      const label = data.item.pendingStandard.description ? 'Sub-Division' : 'Division';
      this.modalProperties.message = `${label} "${data.item.pendingStandard.name}" approved!
      Email notification sent to these following emails:`;
    } else {
      this.modalProperties.message = `Organization "${data.item.pendingStandard.name}" approved!
      Email notification sent to these following emails:`;
    }
    this.modalProperties.emailAddress = res.filter((v, i, a) => a.indexOf(v) === i);
    this.isOpenModal = true;
    this.getResults();
  }, (error) => {
    const msg = error.error.message.length > this.maxErrorMessageLen ?
        error.error.message.substr(0, this.maxErrorMessageLen) + ' ...' : error.error.message;
    let props = {};
    if (error.status === 500) {
      props = {
        title: 'Failed!',
        shortmessage: 'Oops failed to approve request. 1) You need remove related standard before can remove division or organization.'
          + ' 2) You need to check the email address is valid.',
        message: msg
      };
    } else if (error.status === 400) {
      props = {
        title: 'Failed!',
        shortmessage: 'Oops failed to approve request. '
          + 'You need check the parameter duplicated when create or update division and organization',
        message: msg
      };
    }
    this.modalProperties = props;
    this.modalType = 'failed';
    this.isOpenModal = true;
    this.util.logError(error);
  });
}

  /**
   * handles the reject button callback
   */
  confirmReject(obj) {
    const data = obj.rowData;
    this.changeRequestService.reject(data.item.id, obj.rejectMessage).subscribe((res) => {
      this.modalType = 'approve-reject-success';
      this.modalProperties.title = 'Change Rejected';
      if (data.item.recordType === 'Standard') {
        this.modalProperties.message = `Standard "${data.item.pendingStandard.name}" rejected!
      Email notification sent to these following emails:`;
      } else if (data.item.recordType === 'Division') {
        const label = data.item.pendingStandard.description ? 'Sub-Division' : 'Division';
        this.modalProperties.message = `${label} "${data.item.pendingStandard.name}" rejected!
        Email notification sent to these following emails:`;
      } else {
        this.modalProperties.message = `Organization "${data.item.pendingStandard.name}" rejected!
        Email notification sent to these following emails:`;
      }
      this.modalProperties.emailAddress = res.filter((v, i, a) => a.indexOf(v) === i);
      this.isOpenModal = true;
      this.getResults();
    }, this.util.logError);
  }

  /**
   * print all change requests.
   */
  printAllChangeRequests() {
    this.changeRequestService.get({limit: this.paginationOptions.totalItems}).subscribe(res => {
      this.allRequests = res.items;
      this.allPagination.itemsPerPage = res.total;
      this.allPagination.totalItems = res.total;
      setTimeout(() => window.print(), 1000);
    });
  }
}
