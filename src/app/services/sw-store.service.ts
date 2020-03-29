import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class SwStoreService {
	private isConnected = true;

	constructor(
		private snackBar: MatSnackBar,
		private router: Router
	) { }

	get isNetworkConnected(): boolean {
		return this.isConnected;
	}

	public setConnectionStatus(status: boolean): void {
		this.isConnected = status;
	}

	public noConnectionMessage(redirect?: string): void {
		if (!this.isConnected) {
			this.snackBar.open('Offline mode. Changes will be published on internet connection restore', '', {
				duration: 5000
			});

			if (redirect) {
				this.router.navigate([redirect]);
			}
		}
	}
}
