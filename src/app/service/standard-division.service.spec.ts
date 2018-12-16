import { StandardDivisionService } from './standard-division.service';
import { TestHelper } from './test-helper.service.spec';

describe('StandardDivisionService', () => {
  let helper: TestHelper;
  let service: StandardDivisionService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(StandardDivisionService);
    service = helper.service;
  });

  it('verify get method', () => {
    const expectedBody = [{
      'total': 0,
      'query': {
        'offset': 0,
        'limit': 15,
        'divisionId': 'string',
        'subDivisionId': 0,
        'productLineId': 0,
        'organizationId': 0,
        'standardId': 0,
        'keyword': 'string'
      },
      'items': [
        {
          'id': 1,
          'criticalToBusiness': true,
          'comment': 'a comment',
          'standardParticipant': [
            'JohnIDoes@Eaton.com'
          ],
          'standard': {
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
          },
          'division': {
            'id': '12.34',
            'name': 'CPD-ICD',
            'region': 'EPG (Americas)'
          },
          'subDivision': {
            'id': 1,
            'name': 'ICD',
            'divisionId': '12.34',
            'parentSubDivision': {
              'id': 1,
              'name': 'ICD',
              'divisionId': '12.34',
              'level': 0
            },
            'level': 0
          },
          'productLine': {
            'id': 1,
            'name': 'Switching Devices',
            'divisionId': '12.34',
            'subDivisionId': 1
          },
          'standardDivisionContact': {
            'id': 0,
            'contactEmail': 'JohnIDoes@Eaton.com',
            'standardDivisionId': 1
          }
        }
      ]
    }];
    const endpoint = '/standardDivisions';
    service.get().subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });

  it('verify create method', () => {
    const expectedBody = [{
      'id': 1,
      'criticalToBusiness': true,
      'comment': 'a comment',
      'standardParticipant': [
        'JohnIDoes@Eaton.com'
      ],
      'standard': {
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
      },
      'division': {
        'id': '12.34',
        'name': 'CPD-ICD',
        'region': 'EPG (Americas)'
      },
      'subDivision': {
        'id': 1,
        'name': 'ICD',
        'divisionId': '12.34',
        'level': 0
      },
      'productLine': {
        'id': 1,
        'name': 'Switching Devices',
        'divisionId': '12.34',
        'subDivisionId': 1
      },
      'standardDivisionContact': {
        'id': 0,
        'contactEmail': 'JohnIDoes@Eaton.com',
        'standardDivisionId': 1
      }
    }];
    const endpoint = '/standardDivisions';
    service.create(expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'POST', expectedBody);
  });

  it('verify getById method', () => {
    const expectedBody = [{
      'id': 1,
      'criticalToBusiness': true,
      'comment': 'a comment',
      'standardParticipant': [
        'JohnIDoes@Eaton.com'
      ],
      'standard': {
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
      },
      'division': {
        'id': '12.34',
        'name': 'CPD-ICD',
        'region': 'EPG (Americas)'
      },
      'subDivision': {
        'id': 1,
        'name': 'ICD',
        'divisionId': '12.34',
        'level': 0
      },
      'productLine': {
        'id': 1,
        'name': 'Switching Devices',
        'divisionId': '12.34',
        'subDivisionId': 1
      },
      'standardDivisionContact': {
        'id': 0,
        'contactEmail': 'JohnIDoes@Eaton.com',
        'standardDivisionId': 1
      }
    }];
    const endpoint = '/standardDivisions/1';
    service.getById(1).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });

  it('verify delete method', () => {
    const expectedBody = [{
      'id': 1,
      'criticalToBusiness': true,
      'comment': 'a comment',
      'standardParticipant': [
        'JohnIDoes@Eaton.com'
      ],
      'standard': {
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
      },
      'division': {
        'id': '12.34',
        'name': 'CPD-ICD',
        'region': 'EPG (Americas)'
      },
      'subDivision': {
        'id': 1,
        'name': 'ICD',
        'divisionId': '12.34',
        'level': 0
      },
      'productLine': {
        'id': 1,
        'name': 'Switching Devices',
        'divisionId': '12.34',
        'subDivisionId': 1
      },
      'standardDivisionContact': {
        'id': 0,
        'contactEmail': 'JohnIDoes@Eaton.com',
        'standardDivisionId': 1
      }
    }];
    const endpoint = '/standardDivisions/1';
    service.delete(1).subscribe(body => {
      expect(body).toBeNull();
    });
    helper.verifyCommon(endpoint, 'DELETE', null);
  });

  it('verify update method', () => {
    const expectedBody = [{
      'id': 1,
      'criticalToBusiness': true,
      'comment': 'a comment',
      'standardParticipant': [
        'JohnIDoes@Eaton.com'
      ],
      'standard': {
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
      },
      'division': {
        'id': '12.34',
        'name': 'CPD-ICD',
        'region': 'EPG (Americas)'
      },
      'subDivision': {
        'id': 1,
        'name': 'ICD',
        'divisionId': '12.34',
        'level': 0
      },
      'productLine': {
        'id': 1,
        'name': 'Switching Devices',
        'divisionId': '12.34',
        'subDivisionId': 1
      },
      'standardDivisionContact': {
        'id': 0,
        'contactEmail': 'JohnIDoes@Eaton.com',
        'standardDivisionId': 1
      }
    }];
    const endpoint = '/standardDivisions/1';
    service.update(1, expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'PUT', expectedBody);
  });
});
