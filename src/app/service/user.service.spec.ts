import { UserService } from './user.service';
import { TestHelper } from './test-helper.service.spec';

describe('UserService', () => {
  let helper: TestHelper;
  let service: UserService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(UserService);
    service = helper.service;
  });

  it('verify get method', () => {
    const expectedBody = [{
      name: 'test',
      id: 'dwom'
    }, {
      name: 'test',
      id: 'dwom'
    }];
    const endpoint = '/users';
    service.get().subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });

  it('verify getById method', () => {
    const expectedBody = {
      'id': 1,
      'username': 'username1',
      'password': 'string',
      'email': 'JohnIDoes@Eaton.com',
      'fullName': 'Does, John I',
      'role': {
        'id': 1,
        'name': 'Administrator'
      }
    };
    const endpoint = '/users/1';
    service.getById(1).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });

  it('verify create method', () => {
    const expectedBody = {
      'id': 1,
      'username': 'username1',
      'password': 'string',
      'email': 'JohnIDoes@Eaton.com',
      'fullName': 'Does, John I',
      'role': {
        'id': 1,
        'name': 'Administrator'
      }
    };
    const endpoint = '/users';
    service.create(expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'POST', expectedBody);
  });

  it('verify delete method', () => {
    const expectedBody = {
      'id': 1,
      'username': 'username1',
      'password': 'string',
      'email': 'JohnIDoes@Eaton.com',
      'fullName': 'Does, John I',
      'role': {
        'id': 1,
        'name': 'Administrator'
      }
    };
    const endpoint = '/users/1';
    service.delete(1).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'DELETE', expectedBody);
  });

  it('verify update method', () => {
    const expectedBody = {
      'id': 1,
      'username': 'username1',
      'password': 'string',
      'email': 'JohnIDoes@Eaton.com',
      'fullName': 'Does, John I',
      'role': {
        'id': 1,
        'name': 'Administrator'
      }
    };
    const endpoint = '/users/1';
    service.update(1, expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'PUT', expectedBody);
  });
});
