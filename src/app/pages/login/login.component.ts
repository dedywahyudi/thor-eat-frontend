import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  remember = false;
  showError = false;
  loginInfo = null;

  constructor(private router: Router,
    private auth: AuthService) { }

  /**
   * on init
   */
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/keyword-search']);
    } else {
      this.loginInfo = this.auth.getLoginInfo();

      if(this.auth.isRememberMeChecked()) {
        this.remember = true;
      }
      
      if(this.loginInfo) {
        this.loginData.username = this.loginInfo.username;
        this.loginData.password = this.loginInfo.password;
      }
    }
  }
  
  /**
   * handles checkbox toggle
   */
  onRememberMeChange($event) {
    this.auth.setRememberMe($event);
  }

  /**
   * handles the login button click
   */
  login() {
    this.auth.login(this.loginData).subscribe(res => {
      this.auth.setAuthInfo(res);
      this.auth.storeLoginInfo(this.loginData);
      this.router.navigate(['/keyword-search']);
    }, () => {
      this.showError = true;
    });
  }
}
