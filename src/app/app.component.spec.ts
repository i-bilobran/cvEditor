import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ConnectionServiceModule, ConnectionService } from 'ng-connection-service';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { SwStoreService } from '@services/sw-store.service';


describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ConnectionServiceModule,
				ServiceWorkerModule.register('', { enabled: false }),
				MatSnackBarModule
			],
			declarations: [
				AppComponent
			],
			providers: [
				ConnectionService,
				SwUpdate,
				MatSnackBar,
				SwStoreService
			]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});
});
