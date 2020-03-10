import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

	constructor(private authService: AuthenticationService) { }

	public signIn(): void {
		this.authService.signIn();
	}
}
