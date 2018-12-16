import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   * gets the divisions according to the criteria
   * @param criteria the criteria
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  get(criteria?: object) {
    const options = {
      params: criteria
    };
    return this.httpHelper.get('/divisions', options);
  }

  /**
   * gets bulk divisions
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  getAll() {
    const options = {
      params: {
        limit: 1000
      }
    };
    return this.httpHelper.get('/divisions', options);
  }

  /**
   * gets the division info by id
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  getById(id: number) {
    return this.httpHelper.get(`/divisions/${id}`);
  }

  /**
   * gets the division info by id
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  getChildren(id: number) {
    return this.httpHelper.get(`/divisions/${id}/children`);
  }

  /**
   * creates a division
   * @param division the division data
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  create(division) {
    return this.httpHelper.post('/divisions', division);
  }

  /**
   * gets the division statistics info by standard name
   * @param standardId the standard id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  getStatistics(standardId) {
    return this.httpHelper.get(`/divisions/statistics/${standardId}`);
  }

  /**
   * deletes the division info by id
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  deleteById(id: number) {
    return this.httpHelper.delete(`/divisions/${id}`);
  }

  /**
   * update the division info by id
   * @param id the id
   * @param division the division info.
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  update(id, division) {
    return this.httpHelper.put(`/divisions/${id}`, division);
  }
}
