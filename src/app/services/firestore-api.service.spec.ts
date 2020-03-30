import { TestBed } from '@angular/core/testing';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

import { FirestoreApiService } from './firestore-api.service';
import { SwStoreService } from '@services/sw-store.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FirebaseOptionsToken, AngularFireModule } from '@angular/fire';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

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
	let service: FirestoreApiService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			RouterTestingModule,
			AngularFirestoreModule,
			AngularFireModule,
			HttpClientTestingModule,
			MatSnackBarModule,
			ServiceWorkerModule.register('', { enabled: false })
		],
		providers: [
			AngularFirestore,
			SwStoreService,
			{ provide: FirebaseOptionsToken, useValue: firebaseOptions }
		]
	}));

	beforeEach(() => {
		service = TestBed.get(FirestoreApiService);
		httpTestingController = TestBed.get(HttpTestingController);
	});

	test('should be created', () => {
		expect(service).toBeTruthy();
	});

	// test('should get all archived Resume cards', (done) => {
	// 	service.getResumeCards(true)
	// 		// .pipe(retry(1))
	// 		.subscribe((response) => {
	// 			expect(response).toBeTruthy();
	// 			// expect(response).toEqual('json');
	// 			done();
	// 		});
	// });

	// test('should get Resume', (done) => {
	// 	service.getResume('test')
	// 		// .pipe(retry(1))
	// 		.subscribe((response) => {
	// 			expect(response).toBeTruthy();
	// 			done();
	// 		});
	// });
});
