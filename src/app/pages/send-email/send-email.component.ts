import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SendEmailService } from '../../service/send-email.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  isOffcanvas = {
    value: true
  };
  isOpenModal: any;
  modalType = '';
  modalProperties: any = {};
  mailContent = {
    subjectTemplate: '',
    body: '',
    standardIds: []
  };
  hideStandardSelected = false;
  constructor(private route: ActivatedRoute,
    private sendEmailService: SendEmailService) { }

  /**
   * on init
   */
  ngOnInit() {
    this.route.queryParamMap.subscribe((res: any) => {
      if (res.params.id) {
        this.mailContent.subjectTemplate = 'Notification of an issue with the following Standard: ';
        this.mailContent.body =
          'Summary of the Issue / What is changing: <br>'
          + 'Actions Required: <br>'
          + 'More details can be found here: <br>'
          + 'For questions, please contact: ';
        this.mailContent.standardIds = res.params.id.split(',');
        if(res.params.fromType == 'cnsDetail') {
          this.mailContent.body = '';
          this.hideStandardSelected = true;
        }
      }
    });
  }

  /**
   * handles the send mail button click
   * @param data the data
   */
  sending(data) {
    this.sendEmailService.sendEmail(data).subscribe(() => {
      this.isOpenModal = true;
      this.modalType = 'email-success';
      this.modalProperties.emailList = data.to;
    }, (error) => {
      this.modalType = 'email-failed';
      this.modalProperties.message = error.error.message;
      this.isOpenModal = true;
    });
  }
}
