import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResumeCard } from '@models/resume.models';
import { FirestoreApiService } from '@services/firestore-api.service';

@Component({
	templateUrl: './archive.component.html',
	styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
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
				this.store.successResponseHandler('Resume deleted.', '/dashboard/archive');

			});
	}

	public restoreResume(id: string): void {
		this.store.restoreResume(id)
			.subscribe(() => {
				this.store.successResponseHandler('Resume restored.', '/dashboard/archive');
			});
	}

	public downloadResume(id: string): void {

	}

	private getResumeCards(): void {
		this.store.getResumeCards(true)
			.subscribe((response: ResumeCard[]) => {
				this.resumeCards = response;
				this.changeDetectorRef.markForCheck();
			});
	}
}
