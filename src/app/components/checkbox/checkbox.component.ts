import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() label: string;
  @Input() isChecked: boolean;
  @Input() value: string;
  @Output() getChange = new EventEmitter();
  @Output() getLabelClick = new EventEmitter();
  @Input() className: string;
  @Input() disabled = false;
  @Input() data: any = {};

  /**
   * handles the checkbox change event
   */
  change() {
    this.getChange.emit(this.isChecked);
  }

  /**
   * handles the label click
   * @param value the value
   */
  labelClick(value) {
    this.getLabelClick.emit(value);
  }
}
