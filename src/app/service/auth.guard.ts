import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { get, isNil, includes } from 'lodash';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) { }

    /**
     * checks the user access
     * @param route the route
     * @param state the state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate(['/login']);
            return of(false);
        }

        const expectedRoles = get(route, 'data.roles');
        const currentUserRole = this.auth.getCurrentUser().role.name;

        if (isNil(expectedRoles) || expectedRoles.length === 0) {
            return of(true);
        }

        if (includes(expectedRoles, currentUserRole)) {
            return of(true);
        } else {
            this.router.navigate(['/']);
            return of(false);
        }
    }
}
