import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '@services/user.service';
import { AuthenticationService } from '@auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthenticationService,
		private userService: UserService,
	) { }

	canActivate(): Observable<boolean> {
		return this.userService.userAuthorized
			? of(this.userService.userAuthorized)
			: this.authService.authStatus()
				.pipe(map((response: boolean) => {

					if (!response) {
						this.router.navigate(['/login']);
					}

					return response;
				}));
	}
}
