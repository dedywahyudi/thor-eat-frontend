import { Injectable } from '@angular/core';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private httpHelper: HttpHelperService) { }

  /**
   * sends email
   * @param email the email data
   * @returns {Observable<any>} The observable for the HTTP request.
   */
  sendEmail(email) {
    return this.httpHelper.post('/sendEmail', email);
  }
}
