import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor(private router: Router) { }

  /**
   * removes the value from local storage
   * @param key the key
   */
  removeValueFromStorage(key) {
    localStorage.removeItem(key);
  }

  /**
   * stores the value in local storage
   * @param key the key
   * @param value the value
   */
  storeValueInStorageByKey(key, value) {
    localStorage.setItem(key, value);
  }

  /**
   * gets the value by key from local storage
   * @param key the key
   */
  getValueFromStorageByKey(key) {
    return localStorage.getItem(key);
  }

  /**
   * logs the error
   * @param error the error
   */
  logError(error) {
    const errorMessage = error.error.message;
    console.log(errorMessage);
  }

  /**
   * validate email format
   * @param str string
   */
  validateEmail(str) {
    const validEmailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // tslint:disable
    return validEmailRegEx.test(str)
  }
}
