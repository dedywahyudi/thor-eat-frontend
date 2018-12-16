import { ChangeRequestService } from './change-request.service';
import { TestHelper } from './test-helper.service.spec';

describe('ChangeRequestService', () => {
  let helper: TestHelper;
  let service: ChangeRequestService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(ChangeRequestService);
    service = helper.service;
  });

  it('verify get method', () => {
    const expectedBody = [{
      'total': 0,
      'query': {
        'offset': 0,
        'limit': 15,
        'keyword': 'string'
      },
      'items': [
        {
          'id': 1,
          'requestedByUserId': 1,
          'requestedDate': '2018-08-01T00:01:02Z',
          'type': 'Insert',
          'pendingStandard': {
            'id': 1,
            'name': '1907/2006/EG',
            'description': 'REACH – Regulation (EC)',
            'edition': 'A',
            'date': '2018-01-02',
            'createdBy': 'Borowski, Ron S',
            'createdDate': 'string',
            'organization': {
              'id': 1,
              'name': 'Org A (Organization A)'
            }
          }
        }
      ]
    }];
    const endpoint = '/changeRequests';
    service.get().subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });

  it('verify approve method', () => {
    const expectedBody = [{
      'total': 0,
      'query': {
        'offset': 0,
        'limit': 15,
        'keyword': 'string'
      },
      'items': [
        {
          'id': 1,
          'requestedByUserId': 1,
          'requestedDate': '2018-08-01T00:01:02Z',
          'type': 'Insert',
          'pendingStandard': {
            'id': 1,
            'name': '1907/2006/EG',
            'description': 'REACH – Regulation (EC)',
            'edition': 'A',
            'date': '2018-01-02',
            'createdBy': 'Borowski, Ron S',
            'createdDate': 'string',
            'organization': {
              'id': 1,
              'name': 'Org A (Organization A)'
            }
          }
        }
      ]
    }];
    const endpoint = '/changeRequests/1/approve';
    service.approve(1).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'PUT', expectedBody);
  });

  it('verify reject method', () => {
    const endpoint = '/changeRequests/1/reject';
    service.reject(1).subscribe(body => {
      expect(body).toBeNull();
    });
    helper.verifyCommon(endpoint, 'PUT', null);
  });

});
