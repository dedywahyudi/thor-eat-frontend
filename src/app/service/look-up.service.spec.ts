import { LookUpService } from './look-up.service';
import { TestHelper } from './test-helper.service.spec';

describe('LookUpService', () => {
  let helper: TestHelper;
  let service: LookUpService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(LookUpService);
    service = helper.service;
  });

  it('verify getAllRoles method', () => {
    const expectedBody = [{
      'id': 1,
      'name': 'Administrator'
    }];
    const endpoint = '/roles';
    service.getAllRoles().subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });
});
