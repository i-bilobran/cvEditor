import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Resume } from '@models/resume.models';

@Component({
	selector: 'app-preview-modal',
	templateUrl: './preview-modal.component.html',
	styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent {
	constructor(
		public dialogRef: MatDialogRef<PreviewModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Resume) { }

	onNoClick(): void {
		this.dialogRef.close();
	}
}
