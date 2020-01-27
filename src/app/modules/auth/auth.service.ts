import { Injectable } from '@angular/core';
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { UserService } from '../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	constructor(
		private authService: AuthService,
		private userService: UserService,
		private router: Router) {
	}

	public authStatus(): Observable<boolean> {
		return this.authService.authState
			.pipe(
				map<SocialUser, boolean>((response: SocialUser) => {
					if (response) {
						this.userService.setUserData(response);
					} else {
						this.userService.clearUserData();
					}

					return !!response;
				})
			);
	}

	public signIn(): void {
		from(this.signInWithGoogle())
			.subscribe((response: SocialUser) => {
				this.userService.setUserData(response);
				this.router.navigate(['/dashboard']);
			});
	}

	public signOut(): Observable<void> {
		return from(this.authService.signOut())
			.pipe(finalize(() => {
				this.userService.clearUserData();
				this.router.navigate(['/login']);
			}));
	}

	private async signInWithGoogle(): Promise<SocialUser> {
		const user = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

		return user;
	}
}
