import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FirestoreApiService } from '@services/firestore-api.service';
import { ResumeCard } from '@models/resume.models';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public resumeCards: ResumeCard[];

	constructor(
		private store: FirestoreApiService,
		private changeDetectorRef: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.getResumeCards();
	}

	public deleteResume(id: string): void {
		this.store.deleteResume(id)
			.subscribe(() => {
				this.store.successResponseHandler('Resume deleted.');
			});
	}

	public archiveResume(id: string): void {
		this.store.archiveResume(id)
			.subscribe(() => {
				this.store.successResponseHandler('Resume archived.');
			});
	}

	public downloadResume(id: string): void {

	}

	private getResumeCards(): void {
		this.store.getResumeCards(false)
			.subscribe((response: ResumeCard[]) => {
				this.resumeCards = response;
				this.changeDetectorRef.markForCheck();
			});
	}
}
