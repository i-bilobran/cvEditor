import { TestBed } from '@angular/core/testing';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

import { FirestoreApiService } from './firestore-api.service';
import { SwStoreService } from '@services/sw-store.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FirebaseOptionsToken } from '@angular/fire';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

const firebaseOptions = {
	apiKey: 'test',
	authDomain: 'test',
	databaseURL: 'test',
	projectId: 'test',
	storageBucket: 'test',
	messagingSenderId: 'test',
	appId: 'test'
};

describe('FirestoreApiService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			RouterTestingModule,
			AngularFirestoreModule,
			MatSnackBarModule,
			ServiceWorkerModule.register('', { enabled: false })
		],
		providers: [
			AngularFirestore,
			SwStoreService,
			{ provide: FirebaseOptionsToken, useValue: firebaseOptions }
		]
	}));

	it('should be created', () => {
		const service: FirestoreApiService = TestBed.get(FirestoreApiService);
		expect(service).toBeTruthy();
	});
});
