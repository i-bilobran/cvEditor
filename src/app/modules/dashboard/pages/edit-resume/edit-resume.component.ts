import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { Resume, ResumeForm, GeneralData, LocationData } from '@models/resume.models';
import { FirestoreApiService } from '@services/firestore-api.service';
import { MatDialog } from '@angular/material/dialog';
import { PreviewModalComponent } from '@shared/components/preview-modal/preview-modal.component';
import { ResumeService } from '@services/resume.service';
import { ResumePreviewComponent } from '@shared/components/resume-preview/resume-preview.component';

@Component({
	templateUrl: './edit-resume.component.html',
	styleUrls: ['./edit-resume.component.scss']
})
export class EditResumeComponent implements OnInit {
	public generalInfoForm: FormGroup;
	public locationInfoForm: FormGroup;
	public contactEdit: boolean;
	public locationEdit: boolean;
	public fileLoading: boolean;
	public acceptableType = 'image/jpeg,image/png';
	public resume: ResumeForm;
	public errorMessage: string;
	public id: string;

	public photoUrl: SafeUrl;
	public imageChangedEvent: any;
	private croppedImage: string;

	@ViewChild(ResumePreviewComponent, { static: false }) preview: ResumePreviewComponent;

	constructor(
		private formBuilder: FormBuilder,
		private chDetectorRef: ChangeDetectorRef,
		private sanitizer: DomSanitizer,
		private activatedRoute: ActivatedRoute,
		private store: FirestoreApiService,
		private resumeService: ResumeService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params.id;

		if (this.id) {
			this.initResume(this.id);
		} else {
			this.initInfoForm();
		}
	}

	public download(): void {
		const wrapper = this.preview.wrapper.nativeElement;

		this.resumeService.generatePDF(wrapper);
	}

	public openPreview(): void {
		const data = this.getResume();

		const dialogRef = this.dialog.open(PreviewModalComponent, {
			data,
			hasBackdrop: true,
			ariaLabel: 'preview',
			panelClass: 'resume-preview-overlay'
		});

		dialogRef.afterClosed().subscribe(() => {
			console.log('The dialog was closed');
		});
	}

	public imageCropped(event: ImageCroppedEvent) {
		this.croppedImage = event.base64;
	}

	public resetCroppedImage(): void {
		this.imageChangedEvent = null;
		this.croppedImage = null;
	}

	public saveCruppedImage(): void {
		this.photoUrl = this.croppedImage;
		this.resetCroppedImage();
	}

	public toggleAdititionalEdit(key: string): void {
		this[`${key}Edit`] = !this[`${key}Edit`];
	}

	public dropped(event: NgxFileDropEntry[]): void {

		for (const droppedFile of event) {
			this.fileInput(droppedFile);
			// Is it a file?
			if (droppedFile.fileEntry.isFile) {
				const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

				fileEntry.file((ev) => {
					this.imageChangedEvent = { target: { files: [ev] } };
				});
			}
		}
	}

	public fileInput(event: any): void {
		this.imageChangedEvent = event;
	}

	public createResume(event: ResumeForm): void {
		// TODO: create one method for create/edit resume, add validation message (no image selected)
		if (this.photoUrl) {
			const resume = this.getResume(event);

			this.store.createResume(resume)
				.subscribe(() => {
					this.store.successResponseHandler('Resume created.');
				});
		} else {
			this.errorMessage = 'Please upload a photo for resume.';
		}
	}

	public updateResume(event: ResumeForm): void {
		if (this.photoUrl) {
			const resume = this.getResume(event);

			this.store.updateResume(this.id, resume)
				.subscribe(() => {
					this.store.successResponseHandler('Resume updated.');
				});
		} else {
			this.errorMessage = 'Please upload a photo for resume.';
		}
	}

	public deleteResume(): void {
		// TODO: confirmation modal

		this.store.deleteResume(this.id)
			.subscribe(() => {
				this.store.successResponseHandler('Resume deleted.');
			});
	}

	public deletePhoto(): void {
		this.photoUrl = null;
	}

	public getResume(resume?: ResumeForm): Resume {
		return {
			general: this.generalInfoForm.value,
			location: this.locationInfoForm.value,
			photo: this.photoUrl.toString(),
			resume: resume ? resume : this.resume
		};
	}

	public getResume2(resume?: ResumeForm): Resume[] {
		return [{
			general: this.generalInfoForm.value,
			location: this.locationInfoForm.value,
			photo: this.photoUrl.toString(),
			resume: resume ? resume : this.resume
		}];
	}

	private initInfoForm(general?: GeneralData, location?: LocationData): void {
		this.generalInfoForm = this.formBuilder.group({
			phone: general ? general.phone : '380 032 253 8076',
			email: general ? general.email : 'sales@sombrainc.com',
			website: general ? general.website : 'www.sombrainc.com'
		});
		this.locationInfoForm = this.formBuilder.group({
			title: location ? location.title : 'Sombrain Inc.',
			street: location ? location.street : 'Zelena St, 44 a',
			state: location ? location.state : 'Lviv, Lvivska oblast',
			postalCode: location ? location.postalCode : '79000',
			country: location ? location.country : 'Ukraine'
		});
	}

	private initResume(id: string): void {
		this.store.getResume(id)
			.subscribe((response: Resume) => {
				this.initInfoForm(response.general, response.location);

				this.resume = response.resume;
				this.photoUrl = response.photo;
				this.chDetectorRef.markForCheck();
			});
	}
}
