import {
  Component, Input, Output, EventEmitter,
  HostListener, OnChanges, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnChanges {
  @Input() options: Array<any>;
  @Input() selected: any;
  @Input() className: string;
  @Input() placeholder: string;
  @Output() optSelect = new EventEmitter();
  isOpen = false;

  /**
   * handles the changes
   * @param changes the changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && changes.options.currentValue) {
      this.options = changes.options.currentValue;
      if (this.options && this.options.length === 1 && this.options[0].id === 'Any') {
        this.selected = 'Any';
      }
    }
    if (changes.selected && changes.selected.currentValue
      && changes.selected.currentValue.type === 'recent-org') {
      this.optionSelect(changes.selected.currentValue, null);
    }
  }

  /**
  * option selection
  * @param {any} selectedOption - text
  * @param {number} idx - current index of item
  * @param {any} event - object
  */
  optionSelect(selectedOption: any, e: any) {
    if (e) e.stopPropagation();
    if (this.className === 'standard-dropdown' || this.className === 'single-dropdown') {
      this.selected = selectedOption;
    } else {
      this.selected = selectedOption.name;
    }
    this.placeholder = '';
    this.isOpen = false;
    this.optSelect.emit(selectedOption);
  }

  /**
  * toggle the dropdown
  * @param {any} event object
  */
  toggle(e: any) {
    e.stopPropagation();
    // close all previously opened dropdowns, before open
    const allElems = document.querySelectorAll('.dropdown-wrapper');
    for (let i = 0; i < allElems.length; i++) {
      allElems[i].classList.remove('is-open');
    }
    this.isOpen = !this.isOpen;
  }

  /**
  * dropdown click on outside
  */
  @HostListener('document: click', ['$event'])
  onClick() {
    this.isOpen = false;
  }
}
