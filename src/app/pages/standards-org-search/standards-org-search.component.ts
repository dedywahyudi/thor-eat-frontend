import { Component, OnInit } from '@angular/core';
import { filter, chain, each } from 'lodash';
import { StandardService } from '../../service/standard.service';
import { UtilService } from '../../service/util.service';
import { StandardDivisionService } from '../../service/standard-division.service';
import { DivisionService } from '../../service/division.service';

@Component({
  selector: 'app-standards-org-search',
  templateUrl: './standards-org-search.component.html',
  styleUrls: ['./standards-org-search.component.scss']
})
export class StandardsOrgSearchComponent implements OnInit {
  isOffcanvas = {
    value: true
  };
  divisions: any;
  activeStandard: any;
  tabs = [];
  defaultTabs = [{
    name: 'Standard 1',
    activeStandard: undefined,
  }];
  selectedEmailLength = 0;
  activeTab = 0;
  recentStandards: any = [];
  isLoaded = false;

  divSearchPageDataKey = "div-search-page-data";

  constructor(private standardService: StandardService,
    private standardDivisionService: StandardDivisionService,
    private divisionService: DivisionService,
    private util: UtilService) { }

  /**
   * on init
   */
  ngOnInit() {
    var temp = this.util.getValueFromStorageByKey(this.divSearchPageDataKey);
    if (temp) {
      let tempTabs = JSON.parse(temp);
      for (let i = 0; i < tempTabs.length; i++) {
        tempTabs[i].preloaded = true;
        tempTabs[i].tabId = i;
      }
      this.tabs = tempTabs;
      this.util.removeValueFromStorage(this.divSearchPageDataKey);
      this.getSelectedEmailLength();
    } else {
      this.tabs = this.defaultTabs;
    }

    if (this.tabs[0].name === 'Standard 1') {
      // get top 2 standards
      this.standardService.get({
        sortColumn: 'createdDate',
        sortDirection: 'desc',
        limit: 2
      }).subscribe(res => {
        this.recentStandards = res.items;
      }, this.util.logError);
    }
  }

  /**
   * handles the division selection
   * @param standard the selected standard
   */
  selectDivision(standard: any, tabId: any) {
    this.tabs[tabId || this.activeTab].activeStandard = standard.standard;
    this.tabs[tabId || this.activeTab].name = standard.standard.name;
    this.getSelectedEmailLength();

    const boxListData: any = [];

    // get division with regions
    this.divisionService.getStatistics(standard.standard.id).subscribe(res => {
      const regions = Object.keys(res);
      let ctr = 1;
      for (let i = 0; i < regions.length; i++) {
        const singleBox = {
          title: regions[i],
          checkboxList: [],
        };
        const divisions = res[regions[i]];
        for (let j = 0; j < divisions.length; j++) {
          const division = divisions[j];
          // filter out same contact
          division.contacts = division.contacts.map(x => x.contactEmail).filter((v, x, a) => a.indexOf(v) === x);
          singleBox.checkboxList.push({
            checkId: ctr++,
            checkLabel: division.division.name,
            checked: division.checked,
            checkNumber: division.contacts.length,
            contacts: division.contacts});
        }
        boxListData.push(singleBox);
      }
      this.tabs[tabId || this.activeTab].activeStandard['divisionsData'] = { boxList: boxListData };
      this.isLoaded = true;
    }, this.util.logError);
  }

  /**
   * gets the tab
   * @param tabs the tab
   */
  getTab(tabs: any) {
    this.tabs = [...tabs];
  }

  /**
   * handles the header tab click
   * @param activeTab the active tab number
   */
  getActive(activeTab: number) {
    this.activeTab = activeTab;
  }

  /**
   * resets the selection
   */
  resetSelection(tabId: any) {
    // this.tabs[tabId || this.activeTab].activeStandard = null;
    this.getSelectedEmailLength();
  }

  /**
   * gets the number of selected email
   */
  getSelectedEmailLength() {
    this.selectedEmailLength = filter(this.tabs, p => p.activeStandard).length;
  }

  /**
   * handles the recent standard selection
   * @param standard the active standard
   */
  selectActiveStandard(standardId: number) {
    this.tabs[this.activeTab]['activeStd'] = standardId;
    this.tabs[this.activeTab] = Object.assign({}, this.tabs[this.activeTab]);
  }
}
