import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   * gets the standard according to the criteria
   * @param criteria the criteria
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  get(criteria?: object) {
    const options = {
      params: criteria
    };
    return this.httpHelper.get('/standards', options);
  }

  /**
   * gets the standard info by id
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  getById(id: number) {
    return this.httpHelper.get(`/standards/${id}`);
  }

  /**
   * creates a standard
   * @param standard the standard data
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  create(standard) {
    return this.httpHelper.post('/standards', standard);
  }

  /**
   * updates a standard
   * @param id the standard id
   * @param standard the standard data
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  update(id, standard) {
    return this.httpHelper.put(`/standards/${id}`, standard);
  }

  /**
   * updates a standard
   * @param id the standard id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  delete(id, type?) {
    if (type) {
      return this.httpHelper.delete(`/standards/${id}/?type=${type}`);
    } else {
      return this.httpHelper.delete(`/standards/${id}`);
    }
  }
}
