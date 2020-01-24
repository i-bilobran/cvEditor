import { Component } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {
	constructor(private auth: AuthService) {
		this.auth.signIn();

	}
}
