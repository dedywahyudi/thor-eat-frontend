import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProductLineContactService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   *  gets the product line contacts according to the criteria
   * @param criteria the criteria
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  get(criteria?: object) {
    const options = {
      params: criteria
    };
    return this.httpHelper.get('/productLineContacts', options);
  }
}
