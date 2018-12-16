import { SendEmailService } from './send-email.service';
import { TestHelper } from './test-helper.service.spec';

describe('SendEmailService', () => {
  let helper: TestHelper;
  let service: SendEmailService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(SendEmailService);
    service = helper.service;
  });

  it('verify get method', () => {
    const expectedBody = [{
      'to': [
        'JohnIDoes@eaton.com',
        'JackIDoes@eaton.com'
      ],
      'cc': [
        'JaneMDoe@eaton.com',
        'JenMDoe@eaton.com'
      ],
      'subject': 'Urgent problem',
      'body': 'Please look into these Standards ASAP',
      'standardDivisionIds': [
        1,
        2
      ]
    }];
    const endpoint = '/sendEmail';
    service.sendEmail(expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'POST', expectedBody);
  });
});

