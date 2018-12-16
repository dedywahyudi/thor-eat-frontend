import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LookUpService } from '../../service/look-up.service';
import { UtilService } from '../../service/util.service';
import { DivisionService } from '../../service/division.service';
import { AppConstants } from '../../app.constants';
import { TranslationHandler } from 'angular-l10n';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit, OnChanges {
  @Input() modalType = '';
  @Input() rowData: any;
  @Input() modalProperties: any;
  @Output() close = new EventEmitter();
  @Output() createUser = new EventEmitter();
  @Output() editUser = new EventEmitter();
  @Output() createDivision = new EventEmitter();
  @Output() updateDivision = new EventEmitter();
  @Output() createOrganization = new EventEmitter();
  @Output() updateOrganization = new EventEmitter();
  @Output() confirmDelete = new EventEmitter();
  @Output() updateUser = new EventEmitter();
  @Output() confirmApprove = new EventEmitter();
  @Output() confirmReject = new EventEmitter();


  roleOptions: Array<string> = [];
  regionOptions = [];
  divisionOptions = [];
  rejectMessage = '';

  defaultDivisionOption = {id: 'Any', name: 'Select Parent Division'};

  constructor(private lookupService: LookUpService,
    private divisionService: DivisionService,
    private util: UtilService) {
  }

  /**
   * on changes
   * @param changes the changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.modalProperties && changes.modalProperties.currentValue) {
      this.modalProperties = changes.modalProperties.currentValue;
    }
  }

  /**
   * on init
   */
  ngOnInit() {
    if (this.modalType === 'create-new-user') {
      this.getRoleOptions();
      this.rowData = { role: {}, status: 'active' };
    } else if (this.modalType === 'create-new-org') {
      this.rowData = { org: '' };
    } else if (this.modalType === 'edit-user') {
      this.getRoleOptions();
      this.rowData = { role: {}, status: 'active' };
    } else if (this.modalType === 'create-new-division') {
      this.regionOptions = AppConstants.REGIONS;
      this.getAllDivision();
      this.rowData = { region: null, divisionId: null, divisionName: null,
        parentDivisionId: null, parentDivision: this.defaultDivisionOption.name };
    } else if (this.modalType === 'edit-division') {
      this.regionOptions = AppConstants.REGIONS;
      this.getAllDivision();
      const division = { region: this.rowData.region, oldDivisionId: this.rowData.id,
        divisionId: this.rowData.id, divisionName: this.rowData.name };
      if (this.rowData.parentDivision) {
        this.rowData = {
          parentDivisionId: this.rowData.parentDivision.id,
          parentDivision: this.rowData.parentDivision.name,
          ...division,
        };
      } else {
        this.rowData = {
          parentDivisionId: null,
          parentDivision: this.defaultDivisionOption.name,
          ...division
        };
      }
    } else if (this.modalType === 'edit-organization') {
      this.rowData = { organizationId: this.rowData.id, organizationName: this.rowData.name };
    }
  }

  getAllDivision() {
    this.divisionService.get().subscribe(res1 => {
      this.divisionService.get({limit: res1.total}).subscribe(res => {
        this.divisionOptions = [this.defaultDivisionOption, ...res.items];
      }, this.util.logError);
    }, this.util.logError);
  }

  /**
   * handles the cancel button click
   */
  cancel() {
    this.close.emit(false);
  }

  /**
   * handles the confirm delete user button click
   */
  confirmDeleteClick() {
    this.confirmDelete.emit(this.rowData);
  }

 /**
   * handles the confirm approve user button click
   */
  confirmApproveClick() {
    this.confirmApprove.emit(this.rowData);
  }

 /**
   * handles the confirm reject user button click
   */
  confirmRejectClick() {
    this.confirmReject.emit({rowData: this.rowData, rejectMessage: this.rejectMessage});
  }

  /**
   * handles the update user click
   */
  updateUserData() {
    this.updateUser.emit(this.rowData);
  }

  /**
   * handles the add user click
   */
  addUser() {
    const data = { ...this.rowData };
    if (data.role) {
      delete data.role.name;
    }
    this.createUser.emit(data);
  }

  /**
   * handles the add division click
   */
  addDivision() {
    if (this.modalType === 'edit-division') {
      this.updateDivision.emit(this.rowData);
    } else {
      this.createDivision.emit(this.rowData);
    }
  }

  addOrganization() {
    const data = {
      id: this.rowData.organizationId,
      name: this.rowData.organizationName
    };
    if (data.id) {
      this.updateOrganization.emit(data);
    } else {
      this.createOrganization.emit(data);
    }
  }

  /**
   * handles the dropdown value click
   * @param value the selected value
   */
  onSelectRegion(value: any) {
    this.rowData.region = value.id;
  }

  onSelectParentDivision(value: any) {
    if (value.id === 'Any') {
      this.rowData.parentDivision = this.defaultDivisionOption.name;
      this.rowData.parentDivisionId = null;
    } else {
      this.rowData.parentDivision = value.name;
      this.rowData.parentDivisionId = value.id;
      if (value.region) {
        this.rowData.region = value.region;
      } else {
        this.rowData.region = value.name;
      }
    }
  }

  /**
   * handles the dropdown value click
   * @param value the selected value
   */
  onSelectRole(value: any) {
    this.rowData['role']['id'] = value.id;
    this.rowData['role']['name'] = value.name;
  }

  /**
   * gets the role options
   */
  getRoleOptions(): void {
    this.lookupService.getAllRoles().subscribe(res => {
      this.roleOptions = res;
    }, this.util.logError);
  }
}
