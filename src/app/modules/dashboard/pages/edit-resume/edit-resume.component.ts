import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { switchMap, map } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume, ResumeForm, GeneralData, LocationData } from '@models/resume.models';
import { FirestoreApiService } from '@services/firestore-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
	public imgUrl: SafeUrl;
	public resume: ResumeForm;
	public id: string;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private chDetectorRef: ChangeDetectorRef,
		private sanitizer: DomSanitizer,
		private activatedRoute: ActivatedRoute,
		private store: FirestoreApiService,
	) { }

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params.id;

		if (this.id) {
			this.initResume(this.id);
		} else {
			this.initInfoForm();
		}
	}

	public toggleAdititionalEdit(key: string): void {
		this[`${key}Edit`] = !this[`${key}Edit`];
	}

	public dropped(event: NgxFileDropEntry[]): void {

		for (const droppedFile of event) {

			// Is it a file?
			if (droppedFile.fileEntry.isFile) {
				const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

				fileEntry.file((file: File) => {
					this.getBase64Image(file)
						.subscribe((url: string) => {
							this.imgUrl = url;
							this.chDetectorRef.markForCheck();
						});
				});
			}
		}
	}

	public fileInput(event: any): void {
		const files = event.target.files;

		if (files && files[0]) {
			for (const file of files) {
				this.getBase64Image(file)
					.subscribe((url: string) => {
						this.imgUrl = url;
						this.chDetectorRef.markForCheck();
					});
			}
		}
	}

	public getBase64Image(file: File): Observable<string> {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		// creating and getting image url
		return fromEvent(reader, 'load').pipe(
			switchMap(response => {
				const img = new Image();
				img.src = (response.target as any).result;

				return fromEvent(img, 'load').pipe(
					map(() => {
						return img.src;
					})
				);
			})
		);
	}

	public createResume(event: ResumeForm): void {
		const resume = this.getResume(event)

		this.store.createResume(resume)
			.subscribe(() => {
				this.successResponseHandler();
			});
	}

	public updateResume(event: ResumeForm): void {
		const resume = this.getResume(event)

		this.store.updateResume(this.id, resume)
			.subscribe(() => {
				this.successResponseHandler();
			});
	}

	public deleteResume(): void {
		// TODO: confirmation modal

		this.store.deleteResume(this.id)
			.subscribe(() => {
				this.successResponseHandler();
			});
	}

	private successResponseHandler(): void {
		// show toaster message
		console.log('Success');
		this.router.navigate(['/dashboard/home']);
	}

	private getResume(resume: ResumeForm): Resume {
		return {
			general: this.generalInfoForm.value,
			location: this.locationInfoForm.value,
			photo: 'blob',
			resume
		};
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
				this.chDetectorRef.markForCheck();
			});
	}
}
