import { OrganizationService } from './organization.service';
import { TestHelper } from './test-helper.service.spec';

describe('OrganizationService', () => {
    let helper: TestHelper;
    let service: OrganizationService;

    /**
    * handler for each test start. initializes the environment
    */
    beforeEach(() => {
        helper = new TestHelper(OrganizationService);
        service = helper.service;
    });

    it('verify get method', () => {
        const expectedBody = [{
            'total': 0,
            'query': {
                'offset': 0,
                'limit': 15
            },
            'items': [
                {
                    'id': 1,
                    'name': 'Org A (Organization A)'
                }
            ]
        }];
        const endpoint = '/organizations';
        service.get().subscribe(body => {
            expect(body).toEqual(expectedBody);
        });
        helper.verifyCommon(endpoint, 'GET', expectedBody);
    });
});
