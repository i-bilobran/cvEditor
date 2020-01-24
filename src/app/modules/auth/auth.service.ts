import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() { }

	public signIn(): void {

	}

	public isSignedIn(): boolean {
		return true;
	}

	public signOut(): void {
	}
}
