import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

import { UserService } from '@services/user.service';
import { AuthenticationService } from '../../../auth/auth.service';

@Component({
	templateUrl: './default-layout.component.html',
	styleUrls: ['./default-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultLayoutComponent implements OnInit {
	public user: SocialUser;

	constructor(
		private userService: UserService,
		private authService: AuthenticationService
	) { }

	ngOnInit() {
		this.user = this.userService.currentUser;
	}

	public signOut(): void {
		this.authService.signOut().subscribe();
	}
}
