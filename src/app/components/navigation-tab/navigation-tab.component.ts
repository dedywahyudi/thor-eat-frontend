import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-navigation-tab',
  templateUrl: './navigation-tab.component.html',
  styleUrls: ['./navigation-tab.component.scss']
})
export class NavigationTabComponent {
  @Input() tabType: string;
  @Output() toggleNav = new EventEmitter();

  activeTab = 1;

  /**
   * handles the tab click
   * @param value the selected tav value
   */
  toggleMenu(value: number) {
    this.activeTab = value;
    this.toggleNav.emit(value);
  }
}
