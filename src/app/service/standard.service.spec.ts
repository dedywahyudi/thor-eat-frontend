import { StandardService } from './standard.service';
import { TestHelper } from './test-helper.service.spec';

describe('StandardService', () => {
  let helper: TestHelper;
  let service: StandardService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(StandardService);
    service = helper.service;
  });

  it('verify get method', () => {
    const expectedBody = [{
      'total': 0,
      'query': {
        'offset': 0,
        'limit': 15,
        'sortColumn': 'string',
        'sortDirection': 'string',
        'organizationId': 0,
        'keyword': 'string'
      },
      'items': [
        {
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
      ]
    }];
    const endpoint = '/standards';
    service.get().subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });

  it('verify create method', () => {
    const expectedBody = [{
      'total': 0,
      'query': {
        'offset': 0,
        'limit': 15,
        'sortColumn': 'string',
        'sortDirection': 'string',
        'organizationId': 0,
        'keyword': 'string'
      },
      'items': [
        {
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
      ]
    }];
    const endpoint = '/standards';
    service.create(expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'POST', expectedBody);
  });
});
