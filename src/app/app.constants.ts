/**
 * contains app constants
 */
export class AppConstants {
    // default limit for records fetch from api
    public static DEFAULT_RECORD_LIMIT = 25;

    public static LANGUAGES = [
        {
            'name': 'English',
            'code': 'en',
            'countryCode': 'US'
        },
        {
            'name': 'Spanish',
            'code': 'es',
            'countryCode': 'ES'
        },
        {
            'name': 'French',
            'code': 'fr',
            'countryCode': 'FR'
        }
    ];

    public static CHANGE_REQUEST_STATUS = {
        'Insert': 'Create Standard',
        'Update': 'Update Standard',
        'Delete': 'Delete Standard'
    }

    // per page records for pagination
    public static PER_PAGE_RECORDS = [
        10,
        25,
        50,
        100
    ];

    // the region dropdown list
    public static REGIONS = [
        {
            id: 'EPG (Americas)',
            name: 'EPG (Americas)'
        },
        {
            id: 'Canada',
            name: 'Canada'
        },
        {
            id: 'ESSG (Americas)',
            name: 'ESSG (Americas)'
        },
        {
            id: 'EMEA',
            name: 'EMEA'
        },
        {
            id: 'APAC',
            name: 'APAC'
        }
    ];

    public static BOX_LIST_DATA = [
        {
            'title': 'APAC',
            'checkedNumber': 1,
            'checkboxList':
                [{
                    'checkLabel': 'PQD/APC', 'checkNumber': 3, 'checked': true
                },
                {
                    'checkLabel': 'CPCD', 'checkNumber': 0, 'checked': false
                },
                {
                    'checkLabel': 'PDSS', 'checkNumber': 2, 'checked': false
                },
                {
                    'checkLabel': 'ELXID', 'checkNumber': 0, 'checked': false
                }]
        },
        {
            'title': 'America\'s EPG Electrical Product Group',
            'checkedNumber': 0,
            'checkboxList':
                [{
                    'checkLabel': 'RWDD', 'checkNumber': 0, 'checked': false
                },
                {
                    'checkLabel': 'CPD', 'checkNumber': 0, 'checked': false
                },
                {
                    'checkLabel': 'EASD', 'checkNumber': 0, 'checked': false
                },
                {
                    'checkLabel': 'CHD', 'checkNumber': 0, 'checked': false
                },
                {
                    'checkLabel': 'CLD', 'checkNumber': 0, 'checked': false
                },
                {
                    'checkLabel': 'BLD', 'checkNumber': 0, 'checked': false
                }]
        },
        {
            'title': 'EMEA', 'checkedNumber': 3,
            'checkboxList': [{
                'checkLabel': 'PDD', 'checkNumber': 2, 'checked': true
            }, {
                'checkLabel': 'CPCD', 'checkNumber': 0, 'checked': false
            },
            {
                'checkLabel': 'ICPD', 'checkNumber': 1, 'checked': true
            },
            {
                'checkLabel': 'PQED', 'checkNumber': 0, 'checked': false
            },
            {
                'checkLabel': 'I2PC', 'checkNumber': 1, 'checked': true
            },
            {
                'checkLabel': 'Oil and Gas Division', 'checkNumber': 0, 'checked': false
            },
            {
                'checkLabel': 'Energy Storage Division', 'checkNumber': 0, 'checked': false
            }]
        },
        {
            'title': 'America\'s EPG Electrical System and ...',
            'checkedNumber': 2, 'checkboxList': [{
                'checkLabel': 'PQSD(ESSD)', 'checkNumber': 3, 'checked': true
            },
            {
                'checkLabel': 'PDCAD', 'checkNumber': 0, 'checked': false
            },
            {
                'checkLabel': 'Electrical canada', 'checkNumber': 2, 'checked': true
            },
            {
                'checkLabel': 'CDCAD', 'checkNumber': 0, 'checked': false
            },
            {
                'checkLabel': 'PSD', 'checkNumber': 0, 'checked': false
            },
            {
                'checkLabel': 'EESSD', 'checkNumber': 0, 'checked': false
            }]
        }];

    // the auth token name
    public static AUTH_TOKEN_NAME = 'eat_auth_info';

    public static REMEMBER_ME = 'remember_me';

    public static LOGIN_INFO = 'login_info';

    public static STANDARD_LIMIT = 100000;
}
