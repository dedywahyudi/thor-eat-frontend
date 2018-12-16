import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { StandardDivisionService } from '../../service/standard-division.service';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-edit-standard',
  templateUrl: './edit-standard.component.html',
  styleUrls: ['./edit-standard.component.scss']
})
export class EditStandardComponent implements OnInit {
  activeTab = 1;
  isOffcanvas = {
    value: true
  };
  standardTitle = '';

  newStandards: any = {
    standardParticipant: [],
    standard: {
      name: null,
      edition: null,
      organization: {
        name: null
      }
    },
    division: {},
    subDivistion: {},
    productLine: [],
    criticalToBusiness: false
  };

  isOpenModal: any;
  modalType = '';
  modalProperties: any = {};
  isCloneMode = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private standardDivisionService: StandardDivisionService,
    private util: UtilService) { }

  /**
   * on init
   */
  ngOnInit() {
    this.isCloneMode = this.router.url.endsWith('/clone');
    this.route.params.subscribe(params => {
      this.standardDivisionService.getById(params.id).subscribe(res => {
        this.standardTitle = res.standard.name;
      }, this.util.logError);
    });
  }

  sendModalData(data) {
    this.isOpenModal = true;
    this.modalType = data.type;
    this.modalProperties = data.prop;
  }
}
