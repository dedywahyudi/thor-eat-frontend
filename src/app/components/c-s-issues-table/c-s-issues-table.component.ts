import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewChecked, OnInit
} from '@angular/core';
import * as _ from 'lodash';
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-c-s-issues-table',
  templateUrl: './c-s-issues-table.component.html',
  styleUrls: ['./c-s-issues-table.component.scss']
})
export class CSIssuesTableComponent implements AfterViewChecked, OnInit {
  @Input() topData: Array<any>;
  @Input() data: Array<any>;
  @Input() totalRows = 0;
  @Input() paginate: PaginationInstance;
  @Input() showReadAll = {
    'shown': true,
    'checked': false,
    'unreadTopNumber': 0,
    'unreadNumber': 0
  };
  @Output() createdByMe = new EventEmitter();
  @Output() clickDelete = new EventEmitter();
  @Output() printing = new EventEmitter();
  isTopThChk = false;
  isThChk = false;
  isModal = false;
  showOnlyMe = false;
  currentUser: any;

  showSendMail = false;
  emailIds = null;

  activeIndex = -1;

  @ViewChild('topIssues') topIssuesEl: ElementRef;
  @ViewChild('allIssuesTitle') allIssuesTitleEl: ElementRef;
  @ViewChild('allIssuesColumns') allIssuesColumnsEl: ElementRef;
  @ViewChild('bg') bgEl: ElementRef;
  @ViewChild('resultsHeader') resultsColumnsEl: ElementRef;
  @ViewChild('resultsTitle') resultsTitleEl: ElementRef;
  topIssuesHeight: number;

  constructor(private auth: AuthService, private router: Router, private renderer: Renderer2) { }

  /**
   * on init
   */
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.currentUser = this.auth.getCurrentUser();
    }
  }

  /**
   * handles check & unCheck all on top
   * @param value the value
   */
  thTopToggleCheck(value) {
    _.forEach(this.topData, (item, idx) => {
      this.topData[idx].isChecked = value;
    });
    this.topCheckBoxChangeHandler();
  }

    /**
   * calculates and set vertical position to make table title and header fixed.
   */
  ngAfterViewChecked(): void {
    this.renderer.setStyle(this.resultsTitleEl.nativeElement, 'top', 147  + 'px');

    const thElements = this.resultsColumnsEl.nativeElement.querySelectorAll('th');
    _.forEach(thElements, (thEl) => {
      this.renderer.setStyle(thEl, 'top', 187 + 'px');
    });
  }

  /**
   * handles check & unCheck all
   * @param value the value
   */
  thToggleCheck(value) {
    _.forEach(this.data, (item, idx) => {
      this.data[idx].isChecked = value;
    });
    const data = _.uniqBy(this.data, 'standardId');
    const ids = _.filter(data, i => i.isChecked).map(function (elem) {
      return elem.standardId;
    }).join(',');
    this.emailIds = ids;
    if (this.emailIds) {
      this.showSendMail = true;
    } else {
      this.showSendMail = false;
    }
    this.bottomCheckBoxChangeHandler();
  }

  /**
   * handles the top checkbox change event
   * @param idx the id
   * @param value the value
   */
  checkBoxTopChange(idx: number, value: boolean): void {
    // unCheck thead cheackbox, if any of body chkbox is uncheck
    this.topData[idx].isChecked = value;
    const isTh = this.topData.every((item) => {
      return item.isChecked;
    });
    this.isTopThChk = isTh;
    this.topCheckBoxChangeHandler();
  }

  /**
   * handles the checkbox change event
   * @param idx the id
   * @param value the value
   */
  checkBoxChange(idx: number, value: boolean): void {
    // unCheck thead cheackbox, if any of body chkbox is uncheck
    this.data[idx].isChecked = value;
    const isTh = this.data.every((item) => {
      return item.isChecked;
    });
    this.isThChk = isTh;
    this.bottomCheckBoxChangeHandler();
  }

  /**
   * handles the show issues created by me `checkbox` click
   * @param value the value i.e. `true` or `false`
   */
  checkShowOnlyMe(event) {
    this.showOnlyMe = event;
    this.createdByMe.emit(event);
  }

  /**
   * handles the open more table row click
   * @param idx the selected item id
   * @param e the event
   */
  openMore(idx: number, e) {
    e.stopPropagation();
    this.activeIndex = idx;
  }

  /**
   * handles the delete button click
   * @param item the selected item
   */
  delete(item) {
    this.clickDelete.emit(item);
  }

  sendEmail() {
    this.router.navigateByUrl(`/send-email?id=${this.emailIds}`);
  }

  /**
  * dropdown click on outside
  */
  @HostListener('document: click', ['$event'])
  onClick() {
    this.activeIndex = -1;
  }

  /**
   * handles the up checkbox change
   */
  private topCheckBoxChangeHandler() {
    const ids = _.filter(this.topData, i => i.isChecked === true && i.standardId).map(function (elem) {
      return elem.standardId;
    }).join(',');
    this.emailIds = ids;
    if (this.emailIds) {
      this.showSendMail = true;
    } else {
      this.showSendMail = false;
    }
  }

  /**
   * handles the bottom checkbox change
   */
  private bottomCheckBoxChangeHandler() {
    const ids = _.filter(this.data, i => i.isChecked === true && i.standardId).map(function (elem) {
      return elem.standardId;
    }).join(',');
    this.emailIds = ids;
    if (this.emailIds) {
      this.showSendMail = true;
    } else {
      this.showSendMail = false;
    }
  }

  /**
   * handle print event.
   */
  print() {
    this.printing.emit();
  }
}
