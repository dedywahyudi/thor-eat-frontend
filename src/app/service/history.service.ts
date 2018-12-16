import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   *  gets the history according to the criteria
   * @param criteria the criteria
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  get(criteria?: object) {
    const options = {
      params: criteria
    };
    return this.httpHelper.get('/histories', options);
  }
}
