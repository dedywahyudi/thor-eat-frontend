import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CacheService } from '../../service/angular-cache.service';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})
export class LeftNavigationComponent implements OnInit {
  @Input() isOffcanvas = {
    value: true
  };
  @Output() offcanvas = new EventEmitter();
  isOpen;
  userRole = '';
  isLoggedIn = false;
  currentUser: any;

  constructor(private auth: AuthService, private cache: CacheService) { }

  /**
   * on init
   */
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.isLoggedIn = true;
      this.currentUser = this.auth.getCurrentUser();
    }
    this.handleLeftNavigation();
  }

  ngOnChages() {
    this.handleLeftNavigation();
  }

  /**
   * handles the toggle click event
   * @param event the click event
   */
  toggle(event: any) {
    this.isOpen = !this.isOpen;
    this.cache.set('isOpen', this.isOpen);
    this.isOffcanvas['value'] = this.isOpen;
  }

  /**
   * handles the left navigation open and close
   */
  handleLeftNavigation() {
    if (this.cache.has('isOpen') && this.cache.get('isOpen')) {
      this.cache.get('isOpen').subscribe(isOpen => {
        this.isOpen = isOpen;
        if (this.isOpen === true) {
          this.isOffcanvas['value'] = true;
        } else if (this.isOpen === false) {
          this.isOffcanvas['value'] = false;
        }
      });
    } else {
      this.isOpen = true;
      this.cache.set('isOpen', true);
      this.isOffcanvas['value'] = true;
    }
  }

}
