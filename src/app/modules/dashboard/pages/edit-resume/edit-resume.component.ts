import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { switchMap, map } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ActivatedRoute } from '@angular/router';
import { Resume, ResumeEntity } from '@models/resume.models';
import { StoreService } from '@services/store.service';

@Component({
	templateUrl: './edit-resume.component.html',
	styleUrls: ['./edit-resume.component.scss']
})
export class EditResumeComponent implements OnInit {
	public contactEdit: boolean;
	public locationEdit: boolean;
	public fileLoading: boolean;
	public acceptableType = 'image/jpeg,image/png';
	public imgUrl: SafeUrl;
	public resume: Resume;
	public id: string;

	constructor(
		private chDetectorRef: ChangeDetectorRef,
		private sanitizer: DomSanitizer,
		private activatedRoute: ActivatedRoute,
		private store: StoreService,
	) { }

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params.id;

		if (this.id) {
			this.initResume(this.id);
		} else {
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

	public deleteResume(): void {

	}

	private initResume(id: string): void {
		this.store.getResume(id)
			.subscribe((response: Resume) => {
				this.resume = response;
			});
	}
}
