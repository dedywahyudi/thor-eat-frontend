import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilService } from './util.service';
import { AppConstants } from '../app.constants';
import { environment } from '../../environments/environment';

const storageAuthInfoKeyName = AppConstants.AUTH_TOKEN_NAME;
const rememberMeKeyName = AppConstants.REMEMBER_ME;
const loginInfoKeyName = AppConstants.LOGIN_INFO;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
    private http: HttpClient,
    private util: UtilService) { }

  /**
   * handles the login
   * @param {Object} credentials the credentials
   */
  login(credentials) {
    return this.http.post(`${environment.apiBase}/login`, credentials);
  }

  /**
   * handles the logout
   */
  logout() {
    this.removeFromStorage();
    this.router.navigate(['/login']);
  }

  /**
   * sets the auth info of user
   * @param {Object} authInfo the auth info
   */
  setAuthInfo(authInfo) {
    this.util.storeValueInStorageByKey(storageAuthInfoKeyName, JSON.stringify(authInfo));
  }

  /**
   * gets the current logged in user
   */
  getCurrentUser() {
    return JSON.parse(this.util.getValueFromStorageByKey(storageAuthInfoKeyName));
  }

  /**
   * checks if user is logged in or not
   */
  isLoggedIn() {
    return this.util.getValueFromStorageByKey(storageAuthInfoKeyName) !== null;
  }
  
  /**
   * checks if remember me checked or not
   */
  isRememberMeChecked() {
    return this.util.getValueFromStorageByKey(rememberMeKeyName) == "true" ? true : false;
  }

  /**
   * gets the logged in username/password
   */
  getLoginInfo() {
    let loginData = this.util.getValueFromStorageByKey(loginInfoKeyName);
    return loginData && (loginData.length == 0) ? null : JSON.parse(loginData);
  }

  /**
   * Sets the remember me
   * @param rememberMeFlag 
   */
  setRememberMe(rememberMeFlag) {
    if(!rememberMeFlag){
      this.storeLoginInfo("");
    }
    this.util.storeValueInStorageByKey(rememberMeKeyName, rememberMeFlag ? "true" : "false");
  }

  /**
   * set the username/password fields
   * @param loginData 
   */

  storeLoginInfo(loginData) {
    if(this.isRememberMeChecked()){
      this.util.storeValueInStorageByKey(loginInfoKeyName, JSON.stringify(loginData));
    }
  }

  /**
   * removes the data from local storage
   */
  removeFromStorage() {
    this.util.removeValueFromStorage(storageAuthInfoKeyName);
  }
}
