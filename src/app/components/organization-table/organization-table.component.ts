import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { AppConstants } from '../../app.constants';

import { UtilService } from '../../service/util.service';
import { OrganizationService } from '../../service/organization.service';
import { StandardService } from '../../service/standard.service';

@Component({
  selector: 'app-organization-table',
  templateUrl: './organization-table.component.html',
  styleUrls: ['./organization-table.component.scss']
})
export class OrganizationTableComponent implements OnInit {
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
    private organizationService: OrganizationService,
    private standardService: StandardService) { }

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.isOpenModal = false;
    this.organizationService.get(this.filterCriteria).subscribe(res => {
      window.scrollTo(0, 0);
      this.data = res.items;
      this.paginationOptions.totalItems = res.total;
    }, this.utilService.logError);
  }

  onFilter() {
    this.filterCriteria.offset = 0;
    this.paginationOptions.currentPage = 1;
    this.getResults();
  }

  addRow() {
    this.modalType = 'create-new-organization';
    this.modalProperties.error = null;
    this.isOpenModal = true;
  }

  editRow(item) {
    this.modalProperties.error = null;
    this.modalType = 'edit-organization';
    this.rowData = item;
    this.isOpenModal = true;
  }

  deleteRow(item) {
    this.modalProperties.error = null;
    this.modalType = 'delete-organization-row';
    this.rowData = item;
    this.isOpenModal = true;
  }

  createOrganization(organization) {
    const model = {
      name: organization.name
    };
    this.standardService.create(model).subscribe(() => {
      this.isOpenModal = false;
      this.modalProperties.title = 'New Organization Created';
      this.modalProperties.body = `Request to create Organization ${organization.name} submitted successfully`;
      this.modalType = 'success';
      this.isOpenModal = true;
    }, (error) => {
      this.modalProperties.error = error.error.message;
      this.utilService.logError(error);
    });
  }

  editOrganization(organization) {
    const model = {
      name: organization.name
    };
    this.standardService.update(organization.id, organization).subscribe(() => {
      this.isOpenModal = false;
      this.modalProperties.title = 'Update Organization';
      this.modalProperties.body = `Request to update Organization ${organization.name} submitted successfully`;
      this.modalType = 'success';
      this.isOpenModal = true;
    }, (error) => {
      this.modalProperties.error = error.error.message;
      this.utilService.logError(error);
    });
  }

  deleteOrganization(organization) {
    this.standardService.delete(organization.id, 'organization').subscribe(() => {
      this.isOpenModal = false;
      this.modalProperties.title = 'Delete Organization';
      this.modalProperties.body = `Request to delete Organization ${organization.name} submitted successfully`;
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
