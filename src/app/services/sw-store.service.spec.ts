import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { SwStoreService } from './sw-store.service';

describe('SwStoreService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				MatSnackBarModule,
				RouterTestingModule
			],
			providers: [
				SwStoreService,
				MatSnackBar
			]
		});
	});

	it('should be created', inject([SwStoreService], (service: SwStoreService) => {
		expect(service).toBeTruthy();
	}));
});
