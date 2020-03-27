import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { switchMap, map } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';

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

	constructor(
		private chDetectorRef: ChangeDetectorRef,
		private sanitizer: DomSanitizer
	) { }

	ngOnInit() {
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
}