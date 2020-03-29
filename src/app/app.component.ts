import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { SwUpdate } from '@angular/service-worker';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {
	public isConnected = true;

	constructor(
		private connectionService: ConnectionService,
		private updates: SwUpdate
	) {
		updates.available.subscribe(() => updates.activateUpdate().then(() => {
			alert('sw, update')
			document.location.reload();
		}));

		this.connectionService.monitor().subscribe(isConnected => {
			console.log('connection: ', isConnected);
			this.isConnected = isConnected;
		});
	}
}
