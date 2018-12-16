import { Component, OnInit, NgZone } from '@angular/core';
import { CnsIssueService } from '../../service/cns-issue.service';
import { AppConstants } from '../../app.constants';
import { PaginationInstance } from 'ngx-pagination';
import { DivisionService } from '../../service/division.service';
import { UtilService } from '../../service/util.service';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-c-s-issues',
  templateUrl: './c-s-issues.component.html',
  styleUrls: ['./c-s-issues.component.scss']
})
export class CSIssuesComponent implements OnInit {
  isOffcanvas = {
    value: true
  };
  topResults: Array<any>;
  results: Array<any>;
  rowData: any = {};
  modalProperties: any = {
    title: '',
    body: ''
  };

  searchText = '';
  isOpenModal: any;
  modalType = '';
  showReadAll = {
    'shown': true,
    'checked': false,
    'unreadTopNumber': 0,
    'unreadNumber': 0
  };

  regionOptions: any = [];
  divisionOptions: any = [{ id: 'Any', name: 'Any' }];
  Any = 'Any';

  // filter criteria
  filterCriteria: any = {
    limit: AppConstants.DEFAULT_RECORD_LIMIT,
    keyword: null,
    offset: 0,
    createdByMe: null,
    region: null,
    divisionId: null
  };

  // pagination options
  public paginationOptions: PaginationInstance = {
    id: 'cns-issue-view',
    itemsPerPage: AppConstants.DEFAULT_RECORD_LIMIT,
    currentPage: 1,
    totalItems: 0
  };

  // all cns issues use to print.
  allCnSIssues = [];
  public allPagination: PaginationInstance = {
    id: 'cns-issue-view-all',
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private cnsIssueService: CnsIssueService,
    private divisionService: DivisionService,
    private util: UtilService,
  ) { }

  /**
   * on init
   */
  ngOnInit() {
    this.getTopIssue();
    this.getResults();
    this.getRegionOptions();
    this.getDivisionOptions();
  }

  /**
   * gets top issue
   * @param createdByMe checks if created by me
   */
  getTopIssue(createdByMe?: boolean) {
    const criteria: any = {
      priority: 1,
      sortColumn: 'createdDate',
      sortDirection: 'desc',
      limit: 3
    };
    if (createdByMe) {
      criteria.createdByMe = true;
    }
    this.cnsIssueService.get(criteria).subscribe(res => {
      this.topResults = res.items;
    }, this.util.logError);
  }

  /**
   * handles the read all button click
   */
  readAll() {
    _.forEach(this.results, (item) => {
      if(!item.read){
        item.isChecked = true;
      }
    });

    let unreadissues = _.filter(this.results,(item, i) => {
        return !item.read;
    });

    let requestObservables = unreadissues.map((item) => {
        return this.cnsIssueService.update(item.id,{
          ...item,
          read: true
        });
    })

    forkJoin(requestObservables).subscribe((success) => {
      this.getTopIssue();
      this.getResults();
    });
  }

  /**
   * handles the dropdown change
   * @param prop the selected dropdown name
   * @param value the selected value
   */
  onSelect(prop, value: any) {
    if (prop === 'regionSelected') {
      if (value.id === 'Any') {
        this.filterCriteria.region = null;
        this.filterCriteria.divisionId = null;
      } else {
        this.filterCriteria.region = value.name;
      }
      this.getQueryResult();
    }

    if (prop === 'divisionSelected') {
      if (value.id === 'Any') {
        this.filterCriteria.divisionId = null;
      } else {
        this.filterCriteria.divisionId = value.id;
      }
      this.getQueryResult();
    }
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
   * gets region options
   */
  getRegionOptions(): void {
    this.regionOptions.push({ id: 'Any', name: 'Any' });
    this.regionOptions = this.regionOptions.concat(AppConstants.REGIONS);
  }

  /**
   * gets division options
   * @param the selected region
   */
  getDivisionOptions(): void {
    this.divisionService.getAll().subscribe(division => {
      this.divisionOptions = [];
      this.divisionOptions.push({ id: 'Any', name: 'Any' });
      this.divisionOptions = this.divisionOptions.concat(division.items);
    }, this.util.logError);
  }

  /**
   * gets the result
   */
  getResults(): void {
    this.cnsIssueService.get(this.filterCriteria).subscribe(res => {
      window.scrollTo(0, 0);
      this.results = res.items;
      this.paginationOptions.totalItems = res.total;
    }, this.util.logError);
  }

  /**
   * handles the search textbox `keyup` event
   */
  getQueryResult(): void {
    this.filterCriteria.keyword = this.searchText;
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
   * handles the show issues created by me `checkbox` click
   * @param value the value i.e. `true` or `false`
   */
  showIssuesCreatedByMe(value) {
    this.filterCriteria.createdByMe = value;
    this.filterCriteria.offset = 0;
    this.getResults();
    this.getTopIssue(this.filterCriteria.createdByMe);
  }

  /**
   * handles the delete button click
   * @param item the selected item
   */
  setRowData(item) {
    this.modalType = 'delete-user-row';
    this.rowData.id = item.id;
    this.isOpenModal = true;
  }

  /**
   * handles the delete confirm
   * @param id the selected id
   */
  deleteCnsIssue(issue) {
    this.cnsIssueService.delete(issue.id).subscribe(() => {
      this.modalProperties.title = 'Deleted';
      this.modalProperties.body = 'Cns Issue has been deleted successfully';
      this.modalType = 'success';
      this.isOpenModal = true;
      this.getResults();
      this.getTopIssue(this.filterCriteria.createdByMe);
      setTimeout(() => {
        this.isOpenModal = false;
      }, 2000);
    }, (error) => {
      this.util.logError(error);
      this.isOpenModal = false;
    });
  }

  /**
   * print all cns issues to pdf.
   */
  printAllCnsIssue() {
    this.cnsIssueService.get({ limit: this.paginationOptions.totalItems }).subscribe(res => {
      this.allCnSIssues = res.items;
      this.allPagination.totalItems = res.total;
      this.allPagination.itemsPerPage = res.total;
      setTimeout(() => window.print(), 1000);
    }, this.util.logError);
  }
}
