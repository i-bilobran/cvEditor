import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Resume } from '@models/resume.models';

@Component({
	selector: 'app-resume-preview',
	templateUrl: './resume-preview.component.html',
	styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnInit, AfterViewInit {
	@Input() pages: Resume[];
	@ViewChild('element', { static: true }) element: ElementRef<any>;

	constructor() { }

	ngOnInit() {
		console.log(this.pages[0])
	}

	ngAfterViewInit() {
		console.log(document.getElementsByClassName('pdf-page'))
	}
}
