import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { AppConstants } from '../../app.constants';

import { UtilService } from '../../service/util.service';
import { DivisionService } from '../../service/division.service';
import { StandardService } from '../../service/standard.service';

@Component({
  selector: 'app-division-table',
  templateUrl: './division-table.component.html',
  styleUrls: ['./division-table.component.scss']
})
export class DivisionTableComponent implements OnInit {
  isOpenModal = false;
  modalType = '';
  rowData = {};
  modalProperties: any = {
    title: '',
    body: ''
  };

  expandIndex = -1;

  // pagination options
  public paginationOptions: PaginationInstance = {
    id: 'division-table-view',
    itemsPerPage: AppConstants.DEFAULT_RECORD_LIMIT,
    currentPage: 1,
    totalItems: 0
  };

  data = [];
  filterCriteria: any = {
    limit: AppConstants.DEFAULT_RECORD_LIMIT,
    keyword: null,
    offset: 0
  };

  constructor(private utilService: UtilService,
    private divisionService: DivisionService,
    private standardService: StandardService) { }

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.isOpenModal = false;
    this.divisionService.get(this.filterCriteria).subscribe(res => {
      window.scrollTo(0, 0);
      this.data = res.items;
      this.paginationOptions.totalItems = res.total;
      this.data.map(item => {
        this.divisionService.getChildren(item.id).subscribe(res1 => {
          item.children = res1;
        }, this.utilService.logError);
      });
    }, this.utilService.logError);
  }

  onFilter() {
    this.filterCriteria.offset = 0;
    this.paginationOptions.currentPage = 1;
    this.getResults();
  }

  expand(index, event) {
    if (this.expandIndex !== index) {
      this.expandIndex = index;
    } else {
      this.expandIndex = -1;
    }
  }

  addRow() {
    this.modalType = 'create-new-division';
    this.modalProperties.error = null;
    this.modalProperties.title = 'Create New Division or Sub-Division';
    this.isOpenModal = true;
  }

  editRow(item) {
    event.stopPropagation();
    this.modalProperties.error = null;
    this.modalType = 'edit-division';
    this.rowData = item;
    if (item.parentDivision) {
      this.modalProperties.title = 'Edit Sub-Division';
    } else {
      this.modalProperties.title = 'Edit Division';
    }
    this.isOpenModal = true;
  }

  deleteRow(item, event) {
    event.stopPropagation();
    this.modalProperties.error = null;
    this.modalType = 'delete-division-row';
    this.rowData = item;
    this.isOpenModal = true;
  }

  createDivision(division) {
    const model = {
      divisionId: division.divisionId,
      name: division.divisionName,
      edition: division.region,
      description: division.parentDivisionId,
    };
    this.standardService.create(model).subscribe(() => {
      this.isOpenModal = false;
      if (division.parentDivisionId) {
        this.modalProperties.title = 'New Sub-Division Created';
        this.modalProperties.body = `Request to create Sub-Division ${division.divisionName} submitted successfully`;
      } else {
        this.modalProperties.title = 'New Division Created';
        this.modalProperties.body = `Request to create Division ${division.divisionName} submitted successfully`;
      }
      this.modalType = 'success';
      this.isOpenModal = true;
    }, (error) => {
      this.modalProperties.error = error.error.message;
      this.utilService.logError(error);
    });
  }

  editDivision(division) {
    const model = {
      divisionId: [division.oldDivisionId, division.divisionId].join(','),
      name: division.divisionName,
      edition: division.region,
      description: division.parentDivisionId,
    };
    this.standardService.update(division.divisionId, model).subscribe(() => {
      this.isOpenModal = false;
      if (division.parentDivisionId) {
        this.modalProperties.title = 'Update Sub-Division';
        this.modalProperties.body = `Request to update Sub-Division ${division.divisionName} submitted successfully`;
      } else {
        this.modalProperties.title = 'Update Division';
        this.modalProperties.body = `Request to update Division ${division.divisionName} submitted successfully`;
      }
      this.modalType = 'success';
      this.isOpenModal = true;
    }, (error) => {
      this.modalProperties.error = error.error.message;
      this.utilService.logError(error);
    });
  }

  deleteDivision(division) {
    console.log(division);
    this.standardService.delete(division.id, 'division').subscribe(() => {
      this.isOpenModal = false;
      if (division.parentDivision) {
        this.modalProperties.title = 'Delete Sub-Division';
        this.modalProperties.body = `Request to delete Sub-Division ${division.name} submitted successfully`;
      } else {
        this.modalProperties.title = 'Delete Division';
        this.modalProperties.body = `Request to delete Division ${division.name} submitted successfully`;
      }
      this.modalType = 'success';
      this.isOpenModal = true;
    }, (error) => {
      this.modalProperties.error = error.error.message;
      this.utilService.logError(error);
    });
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
}
