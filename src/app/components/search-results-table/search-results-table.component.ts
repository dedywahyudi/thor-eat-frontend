import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  Renderer2,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { some, filter, forEach } from 'lodash';
import { PaginationInstance } from 'ngx-pagination';
import { AuthService } from '../../service/auth.service';
import { StandardService } from '../../service/standard.service';
import { clearResolutionOfComponentResourcesQueue } from '@angular/core/src/metadata/resource_loading';

@Component({
  selector: 'app-search-results-table',
  templateUrl: './search-results-table.component.html'
})
export class SearchResultsTableComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input() data: Array<any>;
  @Input() paginate: PaginationInstance;
  @Output() deleting = new EventEmitter();
  @Output() mailOpen = new EventEmitter();
  @Output() printing = new EventEmitter();
  @ViewChild('resultsHeader') resultsColumnsEl: ElementRef;
  @ViewChild('resultsTitle') resultsTitleEl: ElementRef;
  isThChk = false;
  isModal = false;
  isLoggedIn = false;
  activeIndex = -1;
  canSendEmail = false;

  constructor(private router: Router,
    private auth: AuthService,
    private standardService: StandardService,
    private renderer: Renderer2) { }

  /**
   * on init
   */
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  /**
   * on changes.
   * @param changes the changes.
   */
  ngOnChanges(changes) {
    this.data = changes.data.currentValue;
    this.data = this.data.map((i) => {
      return {
        ...i,
        firstThreeEmails: i.productLine ? this.getFirstThreeEmails(i.productLine.productLineContacts) : [],
      };
    });
  }
  /**
   * calculates and set vertical position to make table title and header fixed.
   */
  ngAfterViewChecked(): void {
    this.renderer.setStyle(this.resultsTitleEl.nativeElement, 'top', 232  + 'px');

    const thElements = this.resultsColumnsEl.nativeElement.querySelectorAll('th');
    forEach(thElements, (thEl) => {
      this.renderer.setStyle(thEl, 'top', 275 + 'px');
    });
  }

  /**
   * handles check & unCheck all
   * @param value the selected checkbox
   */
  thToggleCheck(value) {
    forEach(this.data, (item, idx) => {
      this.data[idx].isChecked = value;
    });
    if (value) {
      this.canSendEmail = true;
    } else {
      this.canSendEmail = false;
    }
  }

  /**
   * handles the checkbox selection
   * @param idx the id
   * @param value the value
   */
  changeCheckbox(idx: number, value: boolean): void {
    // unCheck thead cheackbox, if any of body chkbox is uncheck
    this.data[idx].isChecked = value;
    const isTh = this.data.every((item) => {
      return item.isChecked;
    });
    this.isThChk = isTh;

    if (some(this.data, ['isChecked', true])) {
      this.canSendEmail = true;
    } else {
      this.canSendEmail = false;
    }
  }

  /**
   * handles the delete button click
   * @param item the selected item
   */
  deleteRow(item) {
    this.deleting.emit(item);
  }

  /**
   * handles open more email button click
   * @param idx the selected item id
   * @param e the event
   */
  openMore(idx: number, e) {
    e.stopPropagation();
    this.activeIndex = idx;
    this.mailOpen.emit(idx);
  }

  /**
   * handles the close more email button click
   * @param idx the selected item id
   * @param e the event
   */
  closeMore(idx: number, e) {
    this.activeIndex = idx;
    this.mailOpen.emit(idx);
  }

  /**
  * dropdown click on outside
  */
  @HostListener('document: click', ['$event'])
  onClick() {
    this.activeIndex = -1;
  }

  /**
   * gets the first three emails
   * @param email the email
   */
  getFirstThreeEmails(email) {
    if (email) {
      const length = email.length >= 3 ? 3 : email.length;
      return email.slice(0, length);
    }
    return [];
  }

  /**
   * handles the send mail button click
   */
  sendMail() {
    const ids = filter(this.data, i => i.isChecked).map(function (elem) {
      return elem.id;
    }).join(',');
    this.router.navigateByUrl(`/send-email?id=${ids}`);
  }

  /**
   * handles the print event.
   */
  print() {
    this.printing.emit();
  }
}
