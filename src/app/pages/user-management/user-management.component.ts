import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AppConstants } from '../../app.constants';
import { PaginationInstance } from 'ngx-pagination';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  isOffcanvas = {
    value: true
  };
  results: Array<any>;
  isOpenModal: any;
  modalType = '';
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
    id: 'user-management-view',
    itemsPerPage: AppConstants.DEFAULT_RECORD_LIMIT,
    currentPage: 1,
    totalItems: 0
  };

  allUsers = [];
  public allPagination: PaginationInstance = {
    id: 'user-management-view-all',
    itemsPerPage: 0,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private userService: UserService,
    private util: UtilService) { }

  /**
   * on init
   */
  ngOnInit() {
    this.getResults();
  }

  /**
   * handles the click event
   * @param item the selected item
   */
  setRowData(item) {
    if (this.modalType === 'edit-user') {
      this.isOpenModal = true;
      if (this.modalProperties && this.modalProperties.error) {
        this.modalProperties.error = null;
      }
      this.userService.getById(item.id).subscribe(res => {
        this.rowData = res;
      }, this.util.logError);
    } else if (this.modalType === 'delete-user-row') {
      this.rowData.id = item.id;
      this.isOpenModal = true;
    }
  }

  /**
   * handles the create new user click
   * @param event the event
   */
  openCreateUserModal(event) {
    if (this.modalProperties && this.modalProperties.error) {
      this.modalProperties.error = null;
    }
    this.modalType = 'create-new-user';
    this.isOpenModal = event;
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
   * gets the result
   */
  getResults(): void {
    this.isOpenModal = false;
    this.userService.get(this.filterCriteria).subscribe(res => {
      window.scrollTo(0, 0);
      this.results = res.items;
      this.paginationOptions.totalItems = res.total;
    }, this.util.logError);
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
   * handles the add user button click
   * @param user the user data
   */
  addUser(user) {
    this.userService.create(user).subscribe(() => {
      this.isOpenModal = false;
      this.modalProperties.title = 'New User Created';
      this.modalProperties.body = `User ${user.username} created successfully`;
      this.modalType = 'success';
      this.isOpenModal = true;
      setTimeout(() => {
        this.isOpenModal = false;
        this.getResults();
      }, 6000);
    }, (error) => {
      this.modalProperties.error = error.error.message;
      this.util.logError(error);
    });
  }

  /**
   * handles the confirm delete
   * @param id the user id
   */
  deleteUser(id) {
    this.userService.delete(id.id).subscribe(() => {
      this.isOpenModal = false;
      this.modalProperties.title = 'Deleted';
      this.modalProperties.body = 'User has been deleted successfully';
      this.modalType = 'success';
      this.isOpenModal = true;
      this.getResults();
      setTimeout(() => {
        this.isOpenModal = false;
      }, 2000);
    }, this.util.logError);
  }

  /**
   * handles the update user click
   * @param item the user
   */
  updateUser(item) {
    this.userService.update(item.id, item).subscribe(res => {
      this.isOpenModal = false;
      this.modalProperties.title = 'Updated';
      this.modalProperties.body = 'User has been updated successfully';
      this.modalType = 'success';
      this.isOpenModal = true;
      this.getResults();
      setTimeout(() => {
        this.isOpenModal = false;
      }, 2000);
    }, (error) => {
      this.modalProperties.error = error.error.message;
      this.util.logError(error);
    });
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
   * print all users to PDF.
   */
  printAllUsers() {
    this.userService.get({ limit: this.paginationOptions.totalItems }).subscribe(res => {
      this.allUsers = res.items;
      this.allPagination.itemsPerPage = res.total;
      this.allPagination.totalItems = res.total;
      setTimeout(() => window.print(), 1000);
    }, this.util.logError);
  }
}
