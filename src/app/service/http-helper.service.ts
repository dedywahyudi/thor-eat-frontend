import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { isString, forEach, isNil } from 'lodash';
import { AuthService } from './auth.service';

const API_BASE_URL = environment.apiBase;

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  private authenticationTokenType = 'Bearer';

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  /**
  * Performs a request with `get` http method.
  * @param url the url
  * @param options the request options
  * @returns {Observable<any>}
  */
  get(url: string, options?: any): Observable<any> {
    return this.http
      .get(API_BASE_URL + url, this.requestOptions(options))
      .pipe(catchError(err => this.catchError(err)));
  }

  /**
   * Performs a request with `post` http method.
   * @param url the url
   * @param body the body
   * @param options the request options
   * @param isUpload the flag if the request is made for upload
   * @returns {Observable<any>}
   */
  post(url: string, body: any, options?: any): Observable<any> {
    return this.http
      .post(API_BASE_URL + url, body, this.requestOptions(options))
      .pipe(catchError(err => this.catchError(err)));
  }

  /**
   * Performs a request with `put` http method.
   * @param url the url
   * @param body the body
   * @param options the request options
   * @returns {Observable<any>}
   */
  put(url: string, body?: any, options?: any): Observable<any> {
    return this.http
      .put(API_BASE_URL + url, body, this.requestOptions(options))
      .pipe(catchError(err => this.catchError(err)));
  }

  /**
   * Performs a request with `put` http method.
   * @param url the url
   * @param body the body
   * @param options the request options
   * @returns {Observable<any>}
   */
  patch(url: string, body?: any, options?: any): Observable<any> {
    return this.http
      .patch(API_BASE_URL + url, body, this.requestOptions(options))
      .pipe(catchError(err => this.catchError(err)));
  }

  /**
   * Performs a request with `delete` http method.
   * @param url the url
   * @param options the request options
   * @returns {Observable<any>}
   */
  delete(url: string, options?: any): Observable<any> {
    return this.http.delete(API_BASE_URL + url, this.requestOptions(options))
      .pipe(catchError(err => this.catchError(err)));
  }

  /**
   * catches the auth error
   * @param error the error response
   */
  catchError(error: Response): Observable<Response> {
    return throwError(error);
  }

  /**
   * Request options.
   * @param options
   * @param isUpload the flag if the request is made for upload
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: any): any {
    if (options == null) {
      options = {};
    }

    if (options.headers == null) {
      options.headers = new HttpHeaders();
    }

    const currentUser = this.auth.getCurrentUser();

    if (currentUser) {
      options.headers = options.headers.set('Authorization',
        `${this.authenticationTokenType} ${currentUser.accessToken}`);
    }

    if (options.params != null) {
      if (!isString(options.params)) {
        forEach(options.params, (value, key) => {
          if (isNil(value) || (isString(value) && value.length === 0)) {
            delete options.params[key];
          }
        });
      }
    }
    return options;
  }
}
