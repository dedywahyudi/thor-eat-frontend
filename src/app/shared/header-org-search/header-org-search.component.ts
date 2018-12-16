import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { each, sum, map, get, filter} from 'lodash';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-header-org-search',
  templateUrl: './header-org-search.component.html',
  styleUrls: ['./header-org-search.component.scss']
})
export class HeaderOrgSearchComponent implements OnInit, OnChanges {
  @Input() tabs = [];
  @Input() selectedEmailLength = 0;
  @Output() sendTab = new EventEmitter();
  @Output() sendActive = new EventEmitter();
  activeTab = 0;
  divImpect = 0;
  tabsLists = {};

  divSearchPageDataKey = "div-search-page-data";

  constructor(private router: Router,
              private util: UtilService) { }

  /**
   * on changes
   * @param changes the changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedEmailLength && changes.selectedEmailLength.currentValue) {
      this.selectedEmailLength = changes.selectedEmailLength.currentValue;
    }
  }

  /**
   * on init
   */
  ngOnInit() {
    this.sendTab.emit(this.tabs);
  }

  /**
   * add new tab to tabs list
   */
  addTab() {
    this.tabs.push({
      name: 'Standard ' + (this.tabs.length + 1)
    });
    this.sendTab.emit(this.tabs);
  }

  hasImpactedDivisions() {
    this.divImpect = 0;
    each(this.tabs, (tab) => {
      if (tab.activeStandard && tab.activeStandard['divisionsData'] && tab.activeStandard['divisionsData']['boxList']) {
        this.divImpect += sum(map(tab.activeStandard['divisionsData']['boxList'],
          box => get(filter(box.checkboxList, item => item.checked), 'length', 0)));
      }
    });
    return this.divImpect > 0;
  }

  /**
   * handles switch between tabs
   * @param idx the id
   */
  changeTab(idx: number) {
    this.activeTab = idx;
    this.sendActive.emit(this.activeTab);
  }

  /**
   * handles remove tab from tabs list
   * @param idx the id
   */
  removeTab(idx: number) {
    this.tabs.splice(idx, 1);
    this.selectedEmailLength = this.selectedEmailLength - 1;
  }

  /**
   * handles send email click
   */
  clickSendEmail() {
    this.util.removeValueFromStorage(this.divSearchPageDataKey);
    this.util.storeValueInStorageByKey(this.divSearchPageDataKey, JSON.stringify(this.tabs))

    const ids = map(this.tabs, 'activeStandard.id').join(',');
    if (ids) {
      this.router.navigateByUrl(`/send-email?id=${ids}`);
    }
  }
}
