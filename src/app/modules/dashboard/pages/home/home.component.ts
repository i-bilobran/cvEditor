import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StoreService } from '@services/store.service';
import { ResumeCard } from '@models/resume.models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public resumeCards: ResumeCard[];

	constructor(
		private store: StoreService,
		private changeDetectorRef: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.initResumeCards();
	}

	private initResumeCards(): void {
		this.store.getResumeCards(false)
			.subscribe((response: ResumeCard[]) => {
				this.resumeCards = response;
				this.changeDetectorRef.markForCheck();
			})
	}
}
