import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { ResumeCard } from '@models/resume.models';

@Component({
	selector: 'app-cv-card',
	templateUrl: './cv-card.component.html',
	styleUrls: ['./cv-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvCardComponent {
	@Input() card: ResumeCard;
	@Output() delete: EventEmitter<string> = new EventEmitter();
	@Output() archive: EventEmitter<string> = new EventEmitter();
	@Output() download: EventEmitter<string> = new EventEmitter();

	constructor(
		private router: Router
	) { }

	public onEdit(): void {
		this.router.navigate([`/dashboard/resume/${this.card.id}`]);
	}

	public onDelete(): void {
		this.delete.emit(this.card.id);
	}

	public onArchive(): void {
		this.archive.emit(this.card.id);
	}

	public onDownload(): void {
		this.download.emit(this.card.id);
	}

}
