import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { UploadEvent, FileSystemFileEntry } from 'ngx-file-drop';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-new-resume',
  templateUrl: './new-resume.component.html',
  styleUrls: ['./new-resume.component.scss']
})
export class NewResumeComponent implements OnInit {
  public contactEdit: boolean;
  public locationEdit: boolean;

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

  public dropped(event: UploadEvent) {

    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = () => {
            this.sanitizer.sanitize(2, `url(${reader.result})`);
            this.imgUrl = reader.result;
            this.chDetectorRef.markForCheck();
          };

        })
      }
    }

  }
}
