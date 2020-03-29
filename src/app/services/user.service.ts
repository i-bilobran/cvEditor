import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SocialUser } from 'angularx-social-login';

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
		this.userAuthorized = !!this.currentUserSubject.value;
	}

	get currentUser(): SocialUser {
		return this.currentUserSubject.value;
	}

	public setUserData(user: SocialUser): void {
		this.currentUserSubject.next(user);
		this.userAuthorized = true;
		localStorage.setItem('currentUser', JSON.stringify(user));

		console.log('User: ', user);
	}

	public clearUserData(): void {
		this.currentUserSubject.next(null);
		this.userAuthorized = false;
		localStorage.removeItem('currentUser');
	}
}
