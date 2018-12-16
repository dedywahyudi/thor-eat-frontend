import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CnsIssueService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   * gets the cns issues according to the criteria
   * @param criteria the criteria
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  get(criteria?: object) {
    const options = {
      params: criteria
    };
    return this.httpHelper.get('/cnSIssues', options);
  }

  /**
   * gets the cns issue info by id
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  getById(id: number) {
    return this.httpHelper.get(`/cnSIssues/${id}`);
  }

  /**
   * creates a Cnsissue
   * @param issue the cns issue data
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  create(issue) {
    return this.httpHelper.post('/cnSIssues', issue);
  }

  /**
   * updates the Cnsissue
   * @param id the id
   * @param issue the cns issue data
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  update(id, issue) {
    return this.httpHelper.put(`/cnSIssues/${id}`, issue);
  }

  /**
   * delete the Cns issue
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  delete(id) {
    return this.httpHelper.delete(`/cnSIssues/${id}`);
  }
}
