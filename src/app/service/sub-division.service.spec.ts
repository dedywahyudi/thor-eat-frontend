import { SubDivisionService } from './sub-division.service';
import { TestHelper } from './test-helper.service.spec';

describe('SubDivisionService', () => {
    let helper: TestHelper;
    let service: SubDivisionService;

    /**
    * handler for each test start. initializes the environment
    */
    beforeEach(() => {
        helper = new TestHelper(SubDivisionService);
        service = helper.service;
    });

    it('verify get method', () => {
        const expectedBody = [{
            'total': 0,
            'query': {
                'offset': 0,
                'limit': 15,
                'divisionId': 'string'
            },
            'items': [
                {
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
                }
            ]
        }];
        const endpoint = '/subDivisions';
        service.get().subscribe(body => {
            expect(body).toEqual(expectedBody);
        });
        helper.verifyCommon(endpoint, 'GET', expectedBody);
    });
});
