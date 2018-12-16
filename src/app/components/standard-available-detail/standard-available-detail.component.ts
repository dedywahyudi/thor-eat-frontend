import { Component, Input, HostListener } from '@angular/core';
import { each, chain, sum, map, get, filter, forEach} from 'lodash';

@Component({
  selector: 'app-standard-available-detail',
  templateUrl: './standard-available-detail.component.html',
  styleUrls: ['./standard-available-detail.component.scss']
})
export class StandardAvailableDetailComponent {
  @Input() divisions: any;
  @Input() activeStandard = {
    divisionsData: []
  };
  @Input() tabId: any;
  @Input() activeTab: any;

  activeIndex = -1;
  activeCheckId = 0;
  popupX = 0;
  popupY = 0;

  ngOnInit() {

  }

  /**
   * check number of the box
   * @param checkbox the checkbox
   * @param box the box
   * @param event the event
   */
  checkNumber(checkbox, box, event) {
    let number = 0;

    checkbox['checked'] = event;
    forEach(box['checkboxList'], (item) => {
      if (item.checked) {
        number++;
      }
    });

    box['checkedNumber'] = number;
  }

  /**
   * get total impacted divisions count
   */
  getImpactedDivisions() {
    return sum(map(this.activeStandard['divisionsData']['boxList'],
      box => get(filter(box.checkboxList, item => item.checked), 'length', 0)));
  }

  /**
   * gets the total contacts length
   * @param data the data
   */
  getTotalContactsLength(data) {
    let total = 0;
    each(data.checkboxList, (i) => {
      if (i.contacts.length) {
        total += i.contacts.length;
      }
    });
    return total;
  }

  /**
   * handles the label click
   * @param value the value
   * @param idx the id
   */
  clickLabel(value, id) {
    this.activeIndex = id;
    console.log(value);
  }

  /**
   * handles the close more email button click
   * @param idx the selected item id
   */
  closeMore(idx: number) {
    this.activeIndex = idx;
  }

  getEmailList(item) {
    return chain(item.contacts).value();
  }

  /**
  * dropdown click on outside
  */
  @HostListener('document: click', ['$event'])
  onClick() {
    this.activeIndex = -1;
  }

  showContacts(checkId, e) {
    this.activeCheckId = checkId;
    this.popupX = e.clientX - 260;
    this.popupY = e.clientY + 10;
  }

  hideContacts() {
    this.activeCheckId = 0;
  }

}
