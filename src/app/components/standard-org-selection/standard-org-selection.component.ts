import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { uniqBy, each, find, extend, forEach } from 'lodash';
import { OrganizationService } from '../../service/organization.service';
import { UtilService } from '../../service/util.service';
import { StandardDivisionService } from '../../service/standard-division.service';

@Component({
  selector: 'app-standard-org-selection',
  templateUrl: './standard-org-selection.component.html',
  styleUrls: ['./standard-org-selection.component.scss']
})
export class StandardOrgSelectionComponent implements OnInit, OnChanges {
  @Output() standard = new EventEmitter();
  @Output() changeOrganization = new EventEmitter();
  @Input() tab;

  recent: any;
  activeOrg: any;
  standards: any;
  standards_shown: any;
  organizations: any;

  orgOptions: Array<string> = [];

  preloaded = false;
  organizationId: number;
  activeStd = -1;
  searchText = '';

  constructor(
    private organizationService: OrganizationService,
    private standardDivisionService: StandardDivisionService,
    private util: UtilService) { }

  /**
   * on init
   */
  ngOnInit() {
    if (this.tab.preloaded) {
      this.activeOrg = this.tab.activeStandard.organization.name;
      this.organizationId = this.tab.activeStandard.organization.id;
      this.activeStd = this.tab.activeStandard.id;
      const standardName = this.tab.activeStandard.name;

      this.preloaded = true;
      this.getStandardOptions();
      this.changeOrganization.emit();
      const st = {
        standard: { ...this.tab.activeStandard }
      }
      this.standard.emit(st);
    }
    this.getOrgOptions();
  }

  /**
   * handles the changes if a recent standard is selected
   * @param changes the changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.tab && changes.tab.currentValue) {
      this.tab = changes.tab.currentValue;

      if (this.tab.activeStd) {
        // get standard division based on the selected standard id
        this.standardDivisionService.get({ standardId: this.tab.activeStd, limit: 1 }).subscribe(res => {
          this.recent = res.items[0];
          this.recent.standard.description = this.recent.standard.description.slice(0, 50);
          this.activeOrg = extend(this.recent.standard.organization, { type: 'recent-org' });
        }, this.util.logError);
      }
    }
  }

  /**
   * gets the organization options
   */
  getOrgOptions(): void {
    this.organizationService.get().subscribe(res0 => {
      this.organizationService.get({limit: res0.total}).subscribe(res => {
        this.orgOptions = res.items;
      }, this.util.logError);
    }, this.util.logError);
  }

  /**
   * gets the standard options
   */
  getStandardOptions(): void {
    this.standardDivisionService.get({ limit: 1, organizationId: this.organizationId }).subscribe(res0 => {
      this.standardDivisionService.get({limit: res0.total, organizationId: this.organizationId}).subscribe(res => {
        res.items = uniqBy(res.items, 'standard.name', 'standard.description');
        each(res.items, i => {
          i.standard.description = i.standard.description;
        });
        this.standards = res.items;
        this.standards_shown = res.items;
        this.searchText = '';
        if (this.activeOrg && this.activeOrg.id == this.organizationId) {
          if (!find(this.standards, {id: this.recent.id})) {
            this.standards.unshift(this.recent);
          }
          this.selectStandard(this.recent);
        }
      }, this.util.logError);
    }, this.util.logError);
  }

  /**
   * handles the dropdown selection
   * @param prop the property
   * @param value the selected value
   */
  onSelect(prop: string, value: any): void {
    this.organizationId = value.id;
    if (prop === 'organizationId') {
      this.getStandardOptions();
      this.searchText = '';
      this.changeOrganization.emit();
    }
  }

  /**
  * keyword type
  */
  onSearch() {
    this.standards_shown = [];

    if ((this.standards === undefined) || (this.searchText === '')) {
      this.standards_shown = this.standards;
      return;
    }
    forEach(this.standards, (item) => {
      if (item.standard['name'].toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0
        || item.standard['description'].toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0) {
        this.standards_shown.push(item);
      }
    });
  }

  /**
  * handles the option selection
  * @param data the selected data
  */
  selectStandard(data) {
    this.activeStd = data.id;
    this.standard.emit(data);
  }
}
