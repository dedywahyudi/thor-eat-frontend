import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Location } from '@angular/common';
import { map, forEach } from 'lodash';
import { StandardService } from '../../service/standard.service';
import { UtilService } from '../../service/util.service';
import { OrganizationService } from '../../service/organization.service';
import { StandardDivisionService } from '../../service/standard-division.service';
import { AuthService } from '../../service/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-send-mail-form',
  templateUrl: './send-mail-form.component.html',
  styleUrls: ['./send-mail-form.component.scss']
})
export class SendMailFormComponent implements OnInit, OnChanges {
  @Input() mailContent;
  @Output() sending = new EventEmitter();
  @Input() hideStandardSelected;
  sendStep = 0;

  mailModel: any = {
    subjectTemplate: null,
    body: null,
    standardIds: null,
    cc: [],
    to: [],
    standardDivisionIds: [],
    subject: '',
  };

  // quill-editor customOptions
  customOptions = {
    toolbar: [
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }],
      ['link', 'image', 'video'],
    ]
  };

  standardsSelected = [];

  stOptions: Array<string> = [];
  stList: Array<string> = [];
  organizationOptions: Array<string> = [];

  mailToTags = [];
  mailFrom: '';

  emailValidators = [(control) => {
    const emails = control.value.split(',');
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (_.some(emails, email => !regex.test(email))) {
      return {email: 'invalid email address'};
    }
    return null;
  }];
  errorMessages = {
    'email': 'Enter valid email adress!'
  };

  constructor(
    private location: Location,
    private standardService: StandardService,
    private standardDivisionService: StandardDivisionService,
    private organizationService: OrganizationService,
    private util: UtilService,
    private auth: AuthService) { }

  /**
   * On changes
   * @param changes the changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.mailContent.currentValue) {
      this.mailModel.subject = changes.mailContent.currentValue.subject;
      this.mailModel.body = changes.mailContent.currentValue.body;
      this.mailModel.standardIds = changes.mailContent.currentValue.standardIds;
      this.mailModel.subjectTemplate = changes.mailContent.currentValue.subjectTemplate;
      forEach(this.mailModel.standardIds, (standardId) => {
        this.standardService.getById(standardId).subscribe(res => {
          const standardName = res.name;
          this.standardDivisionService.get({standardName}).subscribe(res1 => {
            forEach(res1.items, (standardDivision) => {
              if (standardDivision.division.parentDivision === null && standardDivision.division.region) {
                let contacts = [];
                // populate contacts with data from product line contact emails
                if (standardDivision.productLine && standardDivision.productLine.productLineContacts) {
                  contacts = standardDivision.productLine.productLineContacts.map((c) => c.contactEmail);
                }
                this.standardsSelected.push({
                  'newAdded': false,
                  'name': standardDivision.standard.name,
                  'id': standardDivision.division.id,
                  'division': standardDivision.division.name,
                  'organization': standardDivision.standard.organization,
                  'contacts': contacts,
                  'standardDivisionId': standardDivision.id,
                });
                this.mailModel.subject = this.mailModel.subjectTemplate + this.standardsSelected.map((item1) => item1.name)
                  .filter((v, i, a) => a.indexOf(v) === i).join(',');
                this.mailModel.to = this.mailModel.to.concat(contacts).filter((v, i, a) => a.indexOf(v) === i);
                this.mailToTags = this.mailToTags.concat(contacts).filter((v, i, a) => a.indexOf(v) === i);
              }
            });
          }, this.util.logError);
        }, this.util.logError);
      });
    }
  }

  /**
   * on init
   */
  ngOnInit() {
    this.getStandardOptions();
    this.getOrganizationOptions();

    if (this.auth.isLoggedIn()) {
      this.mailFrom = this.auth.getCurrentUser().email;
    }
  }

  /**
   * handles the send button click
   */
  clickSend() {
    const data = { ...this.mailModel };
    forEach(this.standardsSelected, (item) => data.standardDivisionIds.push(item.standardDivisionId));
    if (data.to.length && data.subject && data.body) {
      if (data.cc.length) {
        data.cc = data.cc.split(',');
      }
      console.log(data);
      this.sending.emit(data);
    }
  }

  /**
   * handles the add button click
   */
  addItem() {
    this.standardsSelected.push({
      'newAdded': true,
      'id': '',
      'division': ''
    });
  }

  /**
   * removes the item
   * @param index the selected item index
   */
  removeItem(index) {
    this.standardsSelected.splice(index, 1);
    this.mailModel.to = [];
    this.mailToTags = [];
    this.standardsSelected.map(item => this.mailModel.to = this.mailModel.to.concat(item.contacts).filter((v, i, a) => a.indexOf(v) === i));
    this.standardsSelected.map(item => this.mailToTags = this.mailToTags.concat(item.contacts).filter((v, i, a) => a.indexOf(v) === i));
    this.mailModel.subject = this.mailModel.subjectTemplate + this.standardsSelected.map((item1) => item1.name)
                  .filter((v, i, a) => a.indexOf(v) === i).join(',');
  }

  /**
   * gets the standard options
   */
  getStandardOptions(): void {
    this.standardService.get().subscribe(res => {
      this.stOptions = res.items;
    }, this.util.logError);
  }

  /**
   * data get from organization
   */
  getOrganizationOptions(): void {
    this.organizationService.get().subscribe(res0 => {
      this.organizationService.get({ limit: res0.total }).subscribe(res => {
        this.organizationOptions = res.items;
      });
    });
  }

  /**
   * handles the option selected
   * @param item the item
   * @param value the selected value
   */
  onSelect(item, value) {
    this.standardDivisionService.get({ standardId: value.id }).subscribe(res => {
      if (res.items && res.items.length) {
        const division = res.items[0].division;
        let contacts = [];

        // populate contacts with data from product line contact emails
        if (res.items[0].productLine && res.items[0].productLine.productLineContacts) {
          contacts = res.items[0].productLine.productLineContacts.map((c) => c.contactEmail);
        }

        item['id'] = division.id;
        item['division'] = division.name;
        item['contacts'] = contacts;
        item['standardDivisionId'] = res.items[0].id;
        item['name'] = res.items[0].standard.name;

        // update recipients
        this.mailModel.to = this.mailModel.to.concat(contacts).filter((v, i, a) => a.indexOf(v) === i);
        this.mailToTags = this.mailToTags.concat(contacts).filter((v, i, a) => a.indexOf(v) === i);

        // update subject
        this.mailModel.subject = this.mailModel.subjectTemplate + this.standardsSelected.map((item1) => item1.name)
                  .filter((v, i, a) => a.indexOf(v) === i).join(',');
      }
    }, this.util.logError);
  }

  /**
   * handles the org selection
   * @param item the item
   * @param value the selected value
   */
  onSelectOrg(item, value) {
    this.standardService.get({limit:1, organizationId: value.id }).subscribe(res0 => {
      this.standardService.get({limit: res0.total, organizationId: value.id}).subscribe(res => {
        item['stOptions'] = [];
        item['stOptions'] = res.items;
      }, this.util.logError);
    }, this.util.logError);
  }

  /**
   * handles the cancel button click
   */
  clickCancel() {
    this.location.back();
  }

  /**
   * handle recipients add event.
   * @param event the event.
   */
  onRecipientsAdded(event: any) {
    this.mailModel.to.pop();
    this.mailModel.to.push(...event.value.split(','));
  }

  /**
   * handle recipients delete event.
   * @param event the event
   */
  onRecipientsRemoved(event) {
    for (let i = 0; i < this.mailModel.to.length; i++) {
      if (this.mailModel.to[i] === event.value || this.mailModel.to[i] === event) {
        this.mailModel.to.splice(i, 1);
        break;
      }
    }
  }
}
