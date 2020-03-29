import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '@services/user.service';
import { AuthenticationService } from '@auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthenticationService,
		private userService: UserService
	) { }

	canActivate(): Observable<boolean> {
		if (this.userService.userAuthorized) {
			this.router.navigate(['/dashboard']);
		} else {
			return this.authService.authStatus()
				.pipe(map((response: boolean) => {

					if (response) {
						this.router.navigate(['/dashboard']);
					}

					return !response;
				}));
		}
	}
}
