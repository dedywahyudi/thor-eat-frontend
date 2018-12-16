import { DivisionService } from './division.service';
import { TestHelper } from './test-helper.service.spec';

describe('DivisionService', () => {
  let helper: TestHelper;
  let service: DivisionService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(DivisionService);
    service = helper.service;
  });

  it('verify get method', () => {
    const expectedBody = [{
      'total': 0,
      'query': {
        'offset': 0,
        'limit': 15,
        'region': 'string'
      },
      'items': [
        {
          'id': '12.34',
          'name': 'CPD-ICD',
          'region': 'EPG (Americas)'
        }
      ]
    }];
    const endpoint = '/divisions';
    service.get(expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });

  it('verify create method', () => {
    const expectedBody = [{
      'id': '12.34',
      'name': 'CPD-ICD',
      'region': 'EPG (Americas)'
    }];
    const endpoint = '/divisions';
    service.create(expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'POST', expectedBody);
  });

});
