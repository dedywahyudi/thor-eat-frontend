import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
    HttpTestingController,
    HttpClientTestingModule
} from '@angular/common/http/testing';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpHelperService } from './http-helper.service';
import { of } from 'rxjs';

/**
 * Test helper that defines methods to verify the unit tests for services
 */
@Injectable()
export class TestHelper {
    httpMock: HttpTestingController;
    apiBaseUrl = environment.apiBase;
    service: any;
    router: Router;

    constructor(private serviceClass) {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                serviceClass,
                HttpHelperService,
                {
                    provide: Router,
                    useClass: class {
                        events = of(
                            new NavigationEnd(
                                0,
                                environment.apiBase,
                                environment.apiBase
                            )
                        );
                    }
                }
            ]
        });
        this.service = TestBed.get(serviceClass);
        this.httpMock = TestBed.get(HttpTestingController);
        localStorage.setItem('eat_auth_info', JSON.stringify({ accessToken: 'dummy_token' } ));
    }

    /**
     * verify common items of services
     * @param endpoint the endpoint that should be called
     * @param method the method that should be used to call the api
     * @param expectedBody the expected body response if any
     * @returns the test request
     */
    verifyCommon(endpoint: String, method: String, expectedBody?: any) {
        const apiCall = this.httpMock.expectOne(req => {
            if (!req.url.includes(`${endpoint}`)) {
            }
            return req.url.includes(`${endpoint}`);
        });
        expect(apiCall.request.method).toBe(
            method,
            `api method should be ${method}`
        );
        expect(apiCall.request.headers.get('Authorization')).toContain(
            'Bearer dummy_token',
            'api key should be sent from local storage'
        );
        apiCall.flush(expectedBody);
        return apiCall;
    }
}
