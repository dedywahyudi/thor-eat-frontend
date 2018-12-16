import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent {

  @Input() placeholder: string;
  @Input() hasShowPassword = false;
  @Input() type: string;
  @Input() name: string;
  @Input() className: string;
  @Input() isSearch: boolean;
  @Input() value: any;
  @Input() maxLength;
  @Input() readOnly;
  @Output() keyUp = new EventEmitter();
  @Output() pressEnter = new EventEmitter();

  showPassword = false;

  /**
  * value send to the parent component
  * @param {any} event object
  */
  onKey(event: any) {
    if (event.key === 'Enter') {
      this.pressEnter.emit();
    } else {
      this.keyUp.emit(this.value);
    }
  }

  /**
   * handles the show hide password button click
   */
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  /**
   * handles type search cross button click
   */
  search() {
    this.keyUp.emit(this.value);
  }
}
