import { CnsIssueService } from './cns-issue.service';
import { TestHelper } from './test-helper.service.spec';

describe('Cns-IssueService', () => {
  let helper: TestHelper;
  let service: CnsIssueService;

  /**
  * handler for each test start. initializes the environment
  */
  beforeEach(() => {
    helper = new TestHelper(CnsIssueService);
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
    const endpoint = '/cnSIssues';
    service.get().subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });

  it('verify getById method', () => {
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
    const endpoint = '/cnSIssues/1';
    service.getById(1).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'GET', expectedBody);
  });

  it('verify create method', () => {
    const expectedBody = [{

      'id': 1,
      'description': 'description 1',
      'actionPlan': 'action plan 1',
      'personsResponsible': 'Does, John I',
      'estimatedCompletionDate': '2018-01-02',
      'engineerReviewDate': '2018-01-02',
      'engineerLeader': 'Does, John I',
      'financialImpact': '$2M',
      'impactSummary': 'impact summary 1',
      'vpgmName': 'Does, John I',
      'criticalRoleLeadership': true,
      'successionPlan': 'succession plan',
      'offensiveDefensive': 'Offensive',
      'externalPartners': 'external partners 1',
      'vpgmReviewDate': {},
      'priority': 1,
      'region': 'EPG (Americas)',
      'roadmapAlignment': 'roadmap alignment 1',
      'createdBy': 'Borowski, Ron S',
      'createdDate': 'string',
      'standardId': 1,
      'divisionId': '12.34',
      'read': true


    }];
    const endpoint = '/cnSIssues';
    service.create(expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'POST', expectedBody);
  });

  it('verify update method', () => {
    const expectedBody = [{

      'id': 1,
      'description': 'description 1',
      'actionPlan': 'action plan 1',
      'personsResponsible': 'Does, John I',
      'estimatedCompletionDate': '2018-01-02',
      'engineerReviewDate': '2018-01-02',
      'engineerLeader': 'Does, John I',
      'financialImpact': '$2M',
      'impactSummary': 'impact summary 1',
      'vpgmName': 'Does, John I',
      'criticalRoleLeadership': true,
      'successionPlan': 'succession plan',
      'offensiveDefensive': 'Offensive',
      'externalPartners': 'external partners 1',
      'vpgmReviewDate': {},
      'priority': 1,
      'region': 'EPG (Americas)',
      'roadmapAlignment': 'roadmap alignment 1',
      'createdBy': 'Borowski, Ron S',
      'createdDate': 'string',
      'standardId': 1,
      'divisionId': '12.34',
      'read': true


    }];
    const endpoint = '/cnSIssues';
    service.update(1, expectedBody).subscribe(body => {
      expect(body).toEqual(expectedBody);
    });
    helper.verifyCommon(endpoint, 'PUT', expectedBody);
  });

  it('verify delete method', () => {

    const endpoint = '/cnSIssues';
    service.delete(1).subscribe(body => {
      expect(body).toBeNull();
    });
    helper.verifyCommon(endpoint, 'DELETE', null);
  });
});
