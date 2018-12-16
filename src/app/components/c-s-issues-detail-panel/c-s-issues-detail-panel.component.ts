import { Component, OnInit, Input } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'app-c-s-issues-detail-panel',
  templateUrl: './c-s-issues-detail-panel.component.html',
  styleUrls: ['./c-s-issues-detail-panel.component.scss']
})
export class CSIssuesDetailPanelComponent {
  @Input() data = {
    'description': '',
    'standard': {
      'id': null,
      'name': null,
      'organization': {
        'id': null,
        'name': null
      }
    }
  };

  descriptionHide: boolean;
  financialImpactHide: boolean;
  actionPlanHide: boolean;
  offensiveDefensiveHide: boolean;
  impactSummaryHide: boolean;
  itemTypeHide: boolean;
  successionPlanHide: boolean;
  createdDateHide: boolean;
  externalPartnersHide: boolean;
  strategicPlanHide: boolean;
  criticalLeadershipHide: boolean;
  engineerLeaderNameHide: boolean;
  engineerReviewDateHide: boolean;
  regionGroupHide: boolean;
  personsResponsibleHide: boolean;
  standardDirectiveHide: boolean;
  organizationHide: boolean;

  optionsModule: SortablejsOptions = {
    animation: 150,
    handle: '.move-icon',
    group: 'details'
  };
}
