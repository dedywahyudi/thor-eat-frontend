import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recent-standards-list',
  templateUrl: './recent-standards-list.component.html',
  styleUrls: ['./recent-standards-list.component.scss']
})
export class RecentStandardsListComponent {
  @Output() standard = new EventEmitter();
  @Input() recentStandards;

  /**
   * handles the recent selection click
   * @param data the selected data
   */
  selectStandard(data) {
    this.standard.emit(data.id);
  }
}
