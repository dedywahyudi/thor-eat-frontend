import { ProductLineService } from './product-line.service';
import { TestHelper } from './test-helper.service.spec';

describe('ProductLineService', () => {
  let helper: TestHelper;
  let service: ProductLineService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(ProductLineService);
    service = helper.service;
  });

  it('verify get method', () => {
    const expectedBody = [{
      'total': 0,
      'query': {
        'offset': 0,
        'limit': 15,
        'divisionId': 'string',
        'subDivisionId': 0
      },
      'items': [
        {
          'id': 1,
          'name': 'Switching Devices',
          'divisionId': '12.34',
          'subDivisionId': 1
        }
      ]
    }];
    const endpoint = '/productLines';
    service.get().subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });
});
