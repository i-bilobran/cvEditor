import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../modules/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthenticationService
	) { }

	canActivate(): Observable<boolean> {
		return this.authService.authStatus()
			.pipe(map((response: boolean) => {
				console.log('here I am, THE LOGIN GUARD', response);

				if (response) {
					this.router.navigate(['/dashboard']);
				}
				return !response;
			}));
	}
}
