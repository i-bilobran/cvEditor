import { Injectable, NgZone } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private auth2: any;

	constructor(private zone: NgZone) { }

	public signIn(): void {
		gapi.load('auth2', () => {
			gapi.auth2.init({
				client_id: '365081571287-eoq9v835kse4lja6qvpnbhsutkhlqqv5.apps.googleusercontent.com',
				fetch_basic_profile: true
			}).then((auth) => {
				this.zone.run(() => {
					// const GoogleAuth = gapi.auth2.getAuthInstance();
					this.auth2 = gapi.auth2;

					// console.log(this.auth2.currentUser.get())

					// access_denied ?
					// The user denied the permission to the scopes required.

					this.auth2.signgIn().then(user => {
						console.log(user, user.getBasicProfile())
					})
					// this.auth2.signgIn().then(user => {
					// 	console.log(user)
					// })
				});
			},
			);
		});
	}

	public isSignedIn(): boolean {
		return this.auth2.isSignedIn.get();
	}

	public signOut(): void {
		this.auth2.signOut();
	}
}
