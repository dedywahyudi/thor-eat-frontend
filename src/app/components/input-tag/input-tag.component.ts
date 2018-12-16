import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-tag',
  templateUrl: './input-tag.component.html',
  styleUrls: ['./input-tag.component.scss']
})
export class InputTagComponent {
  @Input() className: string;
}
