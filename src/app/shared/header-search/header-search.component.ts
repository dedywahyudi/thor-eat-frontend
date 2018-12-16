import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { uniqBy } from 'lodash';
import { OrganizationService } from '../../service/organization.service';
import { DivisionService } from '../../service/division.service';
import { SubDivisionService } from '../../service/sub-division.service';
import { ProductLineService } from '../../service/product-line.service';
import { ProductLineContactService } from '../../service/product-line-contact.service';
import { UtilService } from '../../service/util.service';
import { namespaceHTML } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {
  @Output() getFilter = new EventEmitter();
  @Output() resetFilter = new EventEmitter();
  standards: any;
  divisions: any;
  subDivisions: any;
  organizations: any;
  searchTxt = '';

  divisionOptions: any = [];
  subDivisionOptions: any = [];
  productLineOptions: any = [];
  productLineContactOptions: any = [];
  orgOptions: any = [];

  divisionId: string;
  subDivisionId: number;
  productLineId: number;
  organizationId: number;
  standardId: number;
  emails = '';
  keyword = '';
  description = '';
  productLine = '';

  orgOptionSelected;
  divisionOptionSelected;
  subDivisionOptionSelected;
  productLineOptionSelected;
  productLineContactOptionSelected;

  Any = 'Any';

  queryObj: any = {};
  constructor(
    private organizationService: OrganizationService,
    private divisionService: DivisionService,
    private subDivisionService: SubDivisionService,
    private productLineService: ProductLineService,
    private productLineContactService: ProductLineContactService,
    private utilService: UtilService,
  ) { }

  /**
   * on init
   */
  ngOnInit() {
    this.getdivisionOptions();
    this.getSubDivisionOptions();
    this.getOrganizationOptions();
    this.getProductLineOptions();
    this.getProductLineContactOptions();
  }

  /**
   * handles the reset button click
   */
  reset() {
    this.queryObj = {};
    this.searchTxt = '';
    this.keyword = '';
    this.emails = '';
    this.resetDropDowns();
    this.resetFilter.emit();
  }

  resetDropDowns(): void {
    this.description = '';

    this.divisionOptions = [];
    this.getdivisionOptions();
    this.divisionOptionSelected = {id:"Any", name: "Any"};

    this.subDivisionOptions = [];
    this.getSubDivisionOptions();
    this.subDivisionOptionSelected = {id:"Any", name: "Any"};

    this.productLine = '';

    this.orgOptions = [];
    this.getOrganizationOptions();
    this.orgOptionSelected = {id:"Any", name: "Any"};

    this.productLineOptions = [];
    this.getProductLineOptions();
    this.productLineOptionSelected = {id: 'Any', name: 'Any'};
  }

  /**
   * get division options
   */
  getdivisionOptions(): void {
    let options = [];
    this.divisionService.get().subscribe(res0 => {
      this.divisionService.get({limit: res0.total}).subscribe(res => {
        options.push({id: 'Any', name: 'Any'});
        options = options.concat(res.items);
        this.divisionOptions = options;
        this.divisionOptionSelected = {id: "Any", name: "Any"};
      });
    });
  }

  /**
   * get sub division options
   */
  getSubDivisionOptions(): void {
    this.subDivisionService.get().subscribe(res0 => {
      this.subDivisionService.get({limit: res0.total}).subscribe(res => {
        this.subDivisionOptions.push({id: 'Any', name: 'Any'});
        this.subDivisionOptions = this.subDivisionOptions.concat(res.items);
        this.subDivisionOptionSelected = {id: "Any", name: "Any"};
      });
    });
  }

  /**
   * get organization options
   */
  getOrganizationOptions(): void {
    this.organizationService.get().subscribe(res0 => {
      this.organizationService.get({limit: res0.total}).subscribe(res => {
        this.orgOptions.push({id: 'Any', name: 'Any'});
        this.orgOptions = this.orgOptions.concat(res.items);
        this.orgOptionSelected = {id:"Any", name: "Any"};
      });
    });
  }

  /**
   * get product line options.
   */
  getProductLineOptions(): void {
    this.productLineService.get().subscribe(res0 => {
      this.productLineService.get({limit: res0.total}).subscribe(res => {
        this.productLineOptions = res.items.map(item => item.name.split(','))
          .reduce((pre, cur) => pre.concat(cur)).join('|').toLowerCase().split('|')
          .filter((v, i, x) => x.indexOf(v) === i).map(item => ({ id: item, name: item }));
        this.productLineOptions = [{id: 'Any', name: 'Any'}, ...this.productLineOptions];
        this.productLineOptionSelected = { id: 'Any', name: 'Any' };
      }, this.utilService.logError);
    }, this.utilService.logError);
  }

  /**
   * get product line contacts options.
   */
  getProductLineContactOptions(): void {
    this.productLineContactService.get().subscribe(res0 => {
      this.productLineContactService.get({limit: res0.total}).subscribe(res => {
        this.productLineContactOptions = res.items.map(item => item.contactEmail.split(';'))
          .reduce((pre, cur) => pre.concat(cur)).join('|').toLowerCase().split('|')
          .filter((v, i, x) => x.indexOf(v) === i).map(item => ({ id: item, name: item }));
        this.productLineContactOptions = [{id: 'Any', name: 'Any'}, ...this.productLineContactOptions];
        this.productLineContactOptionSelected = {id: 'Any', name: 'Any'};
      }, this.utilService.logError);
    }, this.utilService.logError);
  }

  /**
   * handles the search button click
   */
  onSearch() {
    this.queryObj['keyword'] = this.searchTxt;
    this.queryObj['standardName'] = this.keyword;
    this.queryObj['description'] = this.description;
    this.getFilter.emit(this.queryObj);
  }

  /**
  * option selection
  * @param name - Selected option
  */
  onSelect(prop: string, selection): void {
    if (selection.id === 'Any') {
      this.queryObj[prop] = null;
    } else {
      this.queryObj[prop] = selection.id;
    }
    this.onSearch();
  }
}
