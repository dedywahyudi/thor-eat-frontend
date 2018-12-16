import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  @Input() placeholder: string;
  @Input() type: string;
  @Input() name: string;
  @Input() className: string;
  @Input() isDate: boolean;
  @Input() isSendMail: boolean;
  @Input() value: any;
  @Output() dateTimeChange = new EventEmitter();

  /**
  * value send to the parent component
  * @param {any} event object
  */
  getDate(event: any) {
    this.dateTimeChange.emit(this.value);
  }
}
