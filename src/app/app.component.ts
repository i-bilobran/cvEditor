import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {
	public isConnected = true;

	constructor(private connectionService: ConnectionService) {
		this.connectionService.monitor().subscribe(isConnected => {
			console.log('connection: ', isConnected);
			this.isConnected = isConnected;
		});
	}
}
