import { Component, OnInit, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';

import { FirestoreApiService } from '@services/firestore-api.service';
import { ResumeCard, Resume } from '@models/resume.models';
import { ResumePreviewComponent } from '@shared/components/resume-preview/resume-preview.component';
import { ResumeService } from '@services/resume.service';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public resumeCards: ResumeCard[];
	private initialResumeCards: ResumeCard[];

	@ViewChild('container', { static: false, read: ViewContainerRef }) container: ViewContainerRef;

	constructor(
		private store: FirestoreApiService,
		private changeDetectorRef: ChangeDetectorRef,
		private componentFactoryResolver: ComponentFactoryResolver,
		private resumeService: ResumeService
	) { }

	ngOnInit() {
		this.getResumeCards();
	}

	public filterResumes(search: string): void {
		this.resumeCards = this.resumeCards.filter((resume: ResumeCard) => {
			return resume.name.toLowerCase().includes(search) || resume.title.toLowerCase().includes(search);
		});
	}

	public resetFilter(): void {
		this.resumeCards = this.initialResumeCards;
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
		this.store.getResume(id)
			.subscribe((response: Resume) => {
				this.downloadPDF(response);
			})
	}

	private downloadPDF(resume: Resume): void {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ResumePreviewComponent);

		this.container.clear();

		const componentRef = this.container.createComponent(componentFactory);
		const instance = <ResumePreviewComponent>componentRef.instance;

		instance.base = [resume];
		instance.preview = false;
		instance.pages = [resume];

		componentRef.changeDetectorRef.detectChanges();

		this.resumeService.generatePDF(instance.wrapper.nativeElement)
	}

	private getResumeCards(): void {
		this.store.getResumeCards(false)
			.subscribe((response: ResumeCard[]) => {
				this.initialResumeCards = response;
				this.resumeCards = response;
				this.changeDetectorRef.markForCheck();
			});
	}
}
