import {
  Component,
  OnInit
} from '@angular/core';
import { AppConstants } from '../../app.constants';
import { StandardDivisionService } from '../../service/standard-division.service';
import { PaginationInstance } from 'ngx-pagination';
import { UtilService } from '../../service/util.service';
import { StandardService } from '../../service/standard.service';

@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.scss']
})
export class KeywordSearchComponent implements OnInit {
  isOffcanvas = {
    value: true
  };
  results: Array<any>;

  email: string;
  isMail: any;
  isOpenModal: any;
  modalType = 'print';

  rowData: any = {};

  // modal properties
  modalProperties: any = {
    title: '',
    body: ''
  };

  // filter criteria
  filterCriteria: any = {
    limit: AppConstants.DEFAULT_RECORD_LIMIT,
    keyword: null,
    offset: null,
    organizationId: null,
    // productLineId: null,
    subDivisionId: null,
    email: null,
    standardId: null,
    divisionId: null,
    ids: null,
    isApproved: true
  };

  // pagination options
  public paginationOptions: PaginationInstance = {
    id: 'keyword-search-view',
    itemsPerPage: AppConstants.DEFAULT_RECORD_LIMIT,
    currentPage: 1,
    totalItems: 0
  };

  allStandards = [];
  public allPagination: PaginationInstance = {
    id: 'keyword-search-view-all',
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    private standardDivisionService: StandardDivisionService,
    private util: UtilService,
    private standardService: StandardService) { }

  /**
   * on init
   */
  ngOnInit() {
    this.getResults();
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
   * gets the results
   */
  getResults(): void {
    console.log(this.filterCriteria);
    this.standardDivisionService.get(this.filterCriteria).subscribe(res => {
      console.log(res.items);
      window.scrollTo(0, 0);
      this.results = res.items;
      this.paginationOptions.totalItems = res.total;
    }, this.util.logError);
  }

  /**
   * handles the search button
   * @param filter the selected filter
   */
  getQueryResult(filter): void {
    this.filterCriteria.organizationId = filter.organizationId;
    this.filterCriteria.standardId = filter.standardId;
    this.filterCriteria.divisionId = filter.divisionId;
    this.filterCriteria.subDivisionId = filter.subDivisionId;
    this.filterCriteria.productLine = filter.productLine;
    this.filterCriteria.keyword = filter.keyword;
    this.filterCriteria.email = filter.email;
    this.filterCriteria.standardName = filter.standardName;
    this.filterCriteria.standardId = filter.standardId;
    this.filterCriteria.description = filter.description;
    this.filterCriteria.offset = 0;
    this.paginationOptions.currentPage = 1;
    this.getResults();
  }


  /**
   * handles the delete button click
   * @param id the selected item id
   */
  deleteStandardDivision(item) {
    this.standardService.delete(item.id).subscribe(res => {
      this.isOpenModal = false;
      this.modalProperties.title = 'Deleted';
      this.modalProperties.body = 'Delete request has been created successfully';
      this.modalType = 'success';
      this.isOpenModal = true;
      this.getResults();
      setTimeout(() => {
        this.isOpenModal = false;
      }, 2000);
    }, (error) => {
      this.util.logError(error);
      this.isOpenModal = false;
    });
  }

  /**
   * handles the click event
   * @param item the selected item
   */
  setRowData(item) {
    this.rowData.id = item.id;
    this.isOpenModal = true;
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
   * handles the filter reset button click
   */
  reset() {
    this.filterCriteria = {
      limit: AppConstants.DEFAULT_RECORD_LIMIT,
      keyword: null,
      offset: null,
      organizationId: null,
      // productLineId: null,
      subDivisionId: null,
      email: null,
      standardId: null,
      divisionId: null,
      ids: null,
      isApproved: true
    };
    this.getResults();
  }

  /**
   * print all standard divisions to pdf.
   */
  printAllStandardDivisions() {
    this.standardDivisionService.get({limit: this.paginationOptions.totalItems, isApproved: true}).subscribe(res1 => {
      this.allStandards = res1.items;
      this.allPagination.itemsPerPage = this.allStandards.length;
      this.allPagination.totalItems = this.allStandards.length;
      setTimeout(() => window.print(), 5000);
    }, this.util.logError);
  }
}
