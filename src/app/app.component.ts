import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
	public isConnected = true;

	constructor(
		private connectionService: ConnectionService,
		private updates: SwUpdate,
		private snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.initSwUpdateMonitoring();
		this.initNetworkMonitoring();
	}

	private initSwUpdateMonitoring(): void {
		this.updates.available.subscribe(() => this.updates.activateUpdate().then(() => document.location.reload(true)));
	}

	private initNetworkMonitoring(): void {
		this.connectionService.monitor().subscribe(isConnected => {
			this.isConnected = isConnected;

			const [message, button] = isConnected
				? ['Internet connection restored.', 'Hurray!']
				: ['Internet connection lost. Offline mode', 'Ok'];

			this.snackBar.open(message, button);
		});
	}
}
