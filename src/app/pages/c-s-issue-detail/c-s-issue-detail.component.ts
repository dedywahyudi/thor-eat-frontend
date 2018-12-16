import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CnsIssueService } from '../../service/cns-issue.service';
import { StandardService } from '../../service/standard.service';
import { UtilService } from '../../service/util.service';
import { DivisionService } from 'src/app/service/division.service';

@Component({
  selector: 'app-c-s-issue-detail',
  templateUrl: './c-s-issue-detail.component.html',
  styleUrls: ['./c-s-issue-detail.component.scss']
})
export class CSIssueDetailComponent implements OnInit {
  isOffcanvas = {
    value: true
  };
  issueDetail: any = {};
  isOpenModal: any;
  modalType = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cnsIssueService: CnsIssueService,
    private standardService: StandardService,
    private divisionService: DivisionService,
    private util: UtilService) { }

  /**
   * on init
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cnsIssueService.getById(params.id).subscribe(res => {
        this.issueDetail = res;
        if (this.issueDetail.standardId) {
          this.standardService.getById(this.issueDetail.standardId).subscribe(res2 => {
            this.issueDetail.standard = res2;
          }, this.util.logError);
        }
        if(this.issueDetail.divisionId) {
          this.divisionService.getById(this.issueDetail.divisionId).subscribe(divisionData => {
            this.issueDetail.division = {};
            this.issueDetail.division.id = divisionData.id;
            this.issueDetail.division.name = divisionData.name;
            this.issueDetail.division.region = divisionData.region;
          });
        }
      }, this.util.logError);
    });
  }

  /**
   * handles send email button click
   */
  sendEmail() {
    this.router.navigateByUrl(`/send-email?id=${this.issueDetail.standardId}&&fromType=cnsDetail`);
  }

  /**
   * Handles the print functionality
   */
  print() {
    window.print();
  }
}
