import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeywordSearchService {
  private apiUrl = environment.apiBase;  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getData(url): Observable<any> {
    const fullUrl = `${this.apiUrl}${url}`;
    return this.http.get<any>(fullUrl)
      .pipe(
        tap(response => response),
        catchError(this.handleError('getData', []))
      );
  }

  /** GET user data from the server */
  getUserData(url): Observable<any> {
    const fullUrl = `${this.apiUrl}${url}`;
    return this.http.get<any>(fullUrl + `/?status=active`)
      .pipe(
        tap(response => response),
        catchError(this.handleError('getData', []))
      );
  }

  /**
  * pagination of keyword search
  * @param {string} url - subDivisionId of userselected
  * @param {number} pageNumber - subDivisionId of userselected
  */
  getPageData(url: string, pageNum: number): Observable<any> {
    const fullUrl = `${this.apiUrl}${url}`;
    return this.http.get<any>(`${fullUrl}/?_page=${pageNum}`)
      .pipe(
        tap(response => response),
        catchError(this.handleError('getData', []))
      );
  }

  /**
  * pagination of keyword search
  * @param {string} url - subDivisionId of userselected
  * @param {number} pageNumber - subDivisionId of userselected
  */
  getUserPageData(url: string, pageNum: number): Observable<any> {
    const fullUrl = `${this.apiUrl}${url}`;
    return this.http.get<any>(`${fullUrl}/?_page=${pageNum}&status=active`)
      .pipe(
        tap(response => response),
        catchError(this.handleError('getData', []))
      );
  }

  /**
  * option selection
  * @param {string} url - resource url
  * @param {string} divisionId - divisionId of userselected
  * @param {number} subDivisionId - subDivisionId of userselected
  * @param {number} productLineId - productLineId of userselected
  * @param {number} organizationId - organizationId of userselected
  * @param {number} standardId - standardId of userselected
  * @param {string} email - email for query
  * @param {string} keyword - search term
  */
  searchResult(
      url: string,
      divisonId: string,
      subDivisionId: number,
      productLineId: number,
      organizationId: number,
      standardId: number,
      email: string,
      keyword: string
  ): Observable<any[]> {
    const fullUrl = `${this.apiUrl}${url}`;

    return this.http.get<any>(`${fullUrl}/?divisonId=${divisonId}` +
      `&subDivisionId=${subDivisionId}` +
      `&productLineId=${productLineId}` +
      `&organizationId=${organizationId}` +
      `&standardId=${standardId}` +
      `&email=${email}` +
      `&keyword=${keyword}`).pipe(
      tap(response => response),
      catchError(this.handleError<any[]>('searchResult', []))
    );
  }

  /**
  * option selection
  * @param {string} url - resource url
  * @param {string} keyword - keyword for query
  */
  searchResultKeyword(
      url: string,
      keyword: string
  ): Observable<any[]> {
    const fullUrl = `${this.apiUrl}${url}`;

    return this.http.get<any>(`${fullUrl}/?q=${keyword}`).pipe(
      tap(response => response),
      catchError(this.handleError<any[]>('searchResultKeyword', []))
    );
  }

  /**
  * option selection
  * @param {string} url - resource url
  * @param {string} keyword - keyword for query
  */
  searchResultUserKeyword(
      url: string,
      keyword: string
  ): Observable<any[]> {
    const fullUrl = `${this.apiUrl}${url}`;

    return this.http.get<any>(`${fullUrl}/?q=${keyword}&status=active`).pipe(
      tap(response => response),
      catchError(this.handleError<any[]>('searchResultKeyword', []))
    );
  }

  /**
  * option selection
  * @param {string} url - resource url
  * @param {string} keyword - keyword and group,division for query
  * @param {string} regionSelected - region Selected value
  * @param {string} divsionSelected - divsion Selected value
  */
  searchResultKeywordGroupDivision(
      url: string,
      keyword: string,
      regionSelected: string,
      divsionSelected: string,
  ): Observable<any[]> {
    const fullUrl = `${this.apiUrl}${url}`;
    let searchQuery = `${fullUrl}/?q=${keyword}`;
    if (regionSelected !== 'Any') {
      searchQuery += `&region=${regionSelected}`;
    }
    if (divsionSelected !== 'Any') {
      searchQuery += `&division.name=${divsionSelected}`;
    }

    return this.http.get<any>(searchQuery).pipe(
      tap(response => response),
      catchError(this.handleError<any[]>('searchResultKeywordGroupDivision', []))
    );
  }

  /**
  * option selection
  * @param {number} organizationId - subDivisionId of userselected
  */
  getStandardsById(organizationId: number): Observable<any[]> {
    const fullUrl = `${this.apiUrl}${'standards'}`;
    return this.http.get<any>(`${fullUrl}/?organizationId=${organizationId}`).pipe(
      tap(response => response),
      catchError(this.handleError<any[]>('searchResult', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
