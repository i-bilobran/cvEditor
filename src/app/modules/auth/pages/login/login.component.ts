import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public errorMessage: string;

	constructor(private authService: AuthenticationService) { }

	public signIn(): void {
		this.authService.signIn()
			.pipe(
				catchError((error: string) => {
					this.errorMessage = 'Login canceled or unable to authorize'
					throw new Error(error)
				}))
			.subscribe(() => {
				this.errorMessage = '';
			});
	}
}
