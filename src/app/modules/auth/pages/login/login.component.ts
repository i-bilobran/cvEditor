import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

	constructor(private authService: AuthenticationService) { }

	ngOnInit() {
		this.authService.authStatus().subscribe(e => {
			console.log('just take a look. Loggined?', e);
		})
	}

	public signIn(): void {
		this.authService.signIn();
	}
}
