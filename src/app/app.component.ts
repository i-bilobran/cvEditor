import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from 'ng-connection-service';

import { SwStoreService } from '@services/sw-store.service';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
	constructor(
		private connectionService: ConnectionService,
		private updates: SwUpdate,
		private snackBar: MatSnackBar,
		private swStore: SwStoreService
	) { }

	ngOnInit(): void {
		this.initSwUpdateMonitoring();
		this.initNetworkMonitoring();
	}

	private initSwUpdateMonitoring(): void {
		// initial activation
		this.updates.activateUpdate();
		this.updates.available
			.subscribe(() => this.updates.activateUpdate()
				.then(() => document.location.reload(true))
			);
	}

	private initNetworkMonitoring(): void {
		this.connectionService.monitor().subscribe((isConnected: boolean) => {
			this.swStore.setConnectionStatus(isConnected);
			const [message, button] = isConnected
				? ['Internet connection restored.', 'Hurray!']
				: ['Internet connection lost. Offline mode', 'Ok'];

			this.snackBar.open(message, button);
		});
	}
}
