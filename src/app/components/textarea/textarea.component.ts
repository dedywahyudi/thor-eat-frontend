import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {

  @Input() placeholder: string;
  @Input() type: string;
  @Input() name: string;
  @Input() className: string;
  @Input() isSearch: boolean;
  @Input() value: any;
  @Input() maxLength;
  @Output() keyUp = new EventEmitter();

  /**
  * value send to the parent component
  * @param {any} event object
  */
  onKey(event: any) {
    this.keyUp.emit(this.value);
  }
}
