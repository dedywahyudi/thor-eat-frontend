import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   *  gets the organizations according to the criteria
   * @param criteria the criteria
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  get(criteria?: object) {
    const options = {
      params: criteria
    };
    return this.httpHelper.get('/organizations', options);
  }

  create(organization) {
    return this.httpHelper.post('/organizations', organization);
  }

  update(id, organization) {
    return this.httpHelper.put(`/organizations/${id}`, organization);
  }

  delete(id) {
    return this.httpHelper.delete(`/organizations/${id}`);
  }
}
