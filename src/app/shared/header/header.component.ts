import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { findIndex, forEach } from 'lodash';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { HistoryService } from '../../service/history.service';
import { AppConstants } from '../../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() pageType: string;
  @Input() title: string;
  @Input() tabs: any;
  @Input() selectedEmailLength = 0;
  @Output() getFilter = new EventEmitter();
  @Output() resetFilter = new EventEmitter();
  @Output() sendTab = new EventEmitter();
  @Output() sendActive = new EventEmitter();

  isLoggedIn = false;
  showNotify = false;
  notifyData = [];

  subscription: Subscription;
  languages: any[] = AppConstants.LANGUAGES;
  langOptions = [];
  selectedLaguage = 'English';
  selectedLaguageCode = 'en';
  constructor(
    private router: Router,
    private location: Location,
    public locale: LocaleService,
    public translation: TranslationService,
    public pageTitle: Title,
    private auth: AuthService,
    private historyService: HistoryService
  ) { }

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
    if (this.auth.isLoggedIn()) {
      this.isLoggedIn = true;
    }

    // get already selected language from cookie
    const cokkieSplit = document.cookie.match(new RegExp('(^| )' + 'defaultLocale' + '=([^;]+)'));
    if (cokkieSplit) {
      this.selectedLaguageCode = cokkieSplit[2].split('-')[1];
    }

    this.getLanguage();
    this.getData();
    this.getNotifyData();
  }

  /**
   * gets the notification data
   */
  getNotifyData(): void {
    this.historyService.get({
      limit: 30,
      sortColumn: 'modifiedDate',
      sortDirection: 'desc'
    }).subscribe(res => {
      this.notifyData = res.items;
    });
  }

  /**
   * gets the languages
   */
  getData(): void {
    forEach(this.languages, (item) => {
      this.langOptions.push(item.name);
      if (this.selectedLaguageCode === item.countryCode) {
        this.selectedLaguage = item.name;
      }
    });
  }

  /**
   * get language while pageload
   */
  getLanguage() {
    // When the language changes, refreshes the document title with the new translation.
    this.subscription = this.translation.translationChanged().subscribe(() => {
      this.pageTitle.setTitle(this.translation.translate('Title'));
    });
  }

  /**
   * on filter
   * @param obj the selected filter
   */
  onFilter(obj) {
    this.getFilter.emit(obj);
  }

  /**
   * handles the back page click
   */
  backPage() {
    this.location.back();
  }

  /**
   * handles the reset button click
   */
  reset() {
    this.resetFilter.emit();
  }

  /**
  * option selection
  * @param name - Selected option
  */
  selectLocale(name: string): void {
    this.selectedLaguage = name;
    const idx = findIndex(this.languages, { name: name });
    this.locale.setDefaultLocale(this.languages[idx].code, this.languages[idx].countryCode);
  }

  /**
   * handles the login button click
   */
  login() {
    this.router.navigate(['/login']);
  }

  /**
   * handles the logout button click
   */
  logout() {
    this.auth.logout();
  }

  /**
   * get tab from org tabs
   * @param tab the tab
   */
  getTab(tab: any) {
    this.sendTab.emit(tab);
  }

  /**
   * get active tab from org tabs
   * @param activeTab the active tab
   */
  getActive(activeTab: number) {
    this.sendActive.emit(activeTab);
  }

  showNotification() {
    this.showNotify = !this.showNotify;
    this.getNotifyData();
  }
}
