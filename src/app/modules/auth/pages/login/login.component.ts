import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService, GoogleLoginProvider, LoginOpt } from 'angularx-social-login';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

	constructor(private authService: AuthService) { }

	ngOnInit() {
		// this.authService.signOut();
		// this.signInWithGoogle();
		// this.signInWithGoogle()

		// this.authService.authState.subscribe((user) => {
		// 	console.log(user)
		// });
	}

	signInWithGoogle(): void {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

	}

}
