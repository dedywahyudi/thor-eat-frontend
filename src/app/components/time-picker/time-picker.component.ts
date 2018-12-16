import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent {

  @Input() placeholder: string;
  @Input() type: string;
  @Input() name: string;
  @Input() value: any;
  @Input() className: string;
  @Input() isTime: boolean;
  @Output() timeChange = new EventEmitter();

  /**
  * value send to the parent component
  * @param {any} event object
  */
  getTime(event: any) {
    this.timeChange.emit(this.value);
  }
}
