import { HistoryService } from './history.service';
import { TestHelper } from './test-helper.service.spec';

describe('HistoryService', () => {
  let helper: TestHelper;
  let service: HistoryService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(HistoryService);
    service = helper.service;
  });

  it('verify get method', () => {
    const expectedBody = [{
      'total': 0,
      'query': {
        'offset': 0,
        'limit': 15,
        'userId': 0
      },
      'items': [
        {
          'id': 1,
          'recordId': 1,
          'recordName': 'string',
          'recordType': 'Standard',
          'operation': 'Insert',
          'userId': 1,
          'modifiedDate': 'string'
        }
      ]
    }];
    const endpoint = '/histories';
    service.get().subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });
});
