import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeRequestService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   * gets the change requests according to the criteria
   * @param criteria the criteria
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  get(criteria?: object) {
    const options = {
      params: criteria
    };
    return this.httpHelper.get('/changeRequests', options);
  }

  /**
   * approves the change request
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  approve(id) {
    return this.httpHelper.put(`/changeRequests/${id}/approve`);
  }

  /**
   * rejects the change request
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  reject(id, rejectMessage) {
    return this.httpHelper.put(`/changeRequests/${id}/reject`, rejectMessage);
  }
}
