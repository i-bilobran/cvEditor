import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SocialUser } from 'angularx-social-login';
import { AuthenticationService } from '../modules/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public currentUser$: Observable<SocialUser>;
	public userAuthorized = false;
	private currentUserSubject: BehaviorSubject<SocialUser>;

	constructor() {
		this.currentUserSubject = new BehaviorSubject<SocialUser>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser$ = this.currentUserSubject.asObservable();

		console.log('currentUserSubject on init: ', this.currentUserSubject.value);
	}

	get currentUser(): SocialUser {
		return this.currentUserSubject.value;
	}

	public setUserData(user: SocialUser): void {
		this.currentUserSubject.next(user);
		this.userAuthorized = true;

		console.log('CurrentUser:', user);
	}

	public clearUserData(): void {
		this.currentUserSubject.next(null);
		this.userAuthorized = false;

		console.log('CurrentUser:', null);
	}
}
