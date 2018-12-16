import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   * gets the users according to the criteria
   * @param criteria the criteria
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  get(criteria?: object) {
    const options = {
      params: criteria
    };
    return this.httpHelper.get('/users', options);
  }

  /**
   * gets the user info by id
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  getById(id: number) {
    return this.httpHelper.get(`/users/${id}`);
  }

  /**
   * creates a user
   * @param user the user data
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  create(user) {
    return this.httpHelper.post('/users', user);
  }


  /**
   * delete the user
   * @param id the id
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  delete(id) {
    return this.httpHelper.delete(`/users/${id}`);
  }

  /**
   * updates the user
   * @param id the id
   * @param user the user information
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  update(id, user) {
    return this.httpHelper.put(`/users/${id}`, user);
  }
}
