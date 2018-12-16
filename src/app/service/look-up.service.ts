import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class LookUpService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   * get all roles
   */
  getAllRoles() {
    return this.httpHelper.get('/roles');
  }
}
