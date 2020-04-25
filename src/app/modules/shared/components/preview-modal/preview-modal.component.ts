import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Resume } from '@models/resume.models';

@Component({
	selector: 'app-preview-modal',
	templateUrl: './preview-modal.component.html',
	styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent {

	// constructor(public dialog: MatDialog) { }

	// openDialog(): void {
	// 	const dialogRef = this.dialog.open(PreviewModalComponent, {
	// 		width: '250px',
	// 		data: resume
	// 	});

	// 	dialogRef.afterClosed().subscribe(result => {
	// 		console.log('The dialog was closed');
	// 	});
	// }

	constructor(
		public dialogRef: MatDialogRef<PreviewModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Resume) { }

	onNoClick(): void {
		this.dialogRef.close();
	}
}
