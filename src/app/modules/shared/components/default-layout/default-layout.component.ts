import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

import { UserService } from '@services/user.service';

@Component({
	templateUrl: './default-layout.component.html',
	styleUrls: ['./default-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultLayoutComponent implements OnInit {
	public user: SocialUser;

	constructor(
		private userService: UserService
	) { }

	ngOnInit() {
		this.user = this.userService.currentUser;
	}
}
