import { Injectable } from '@angular/core';
import { HttpHelperService } from 'src/app/service/http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class StandardDivisionService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   * gets the standard divisions according to the criteria
   * @param criteria the criteria
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  get(criteria?: object) {
    const options = {
      params: criteria
    };
    return this.httpHelper.get('/standardDivisions', options);
  }

  /**
   * creates a standard division
   * @param standardDivision the standard division data
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  create(standardDivision) {
    return this.httpHelper.post('/standardDivisions', standardDivision);
  }

  /**
   * gets the standard division info by id
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  getById(id: number) {
    return this.httpHelper.get(`/standardDivisions/${id}`);
  }

  /**
   * delete the standard division
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  delete(id) {
    return this.httpHelper.delete(`/standardDivisions/${id}`);
  }

  /**
   * updates the standard division
   * @param id the id
   * @param data the standard division information
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  update(id, user) {
    return this.httpHelper.put(`/standardDivisions/${id}`, user);
  }
}
