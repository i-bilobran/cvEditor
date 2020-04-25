import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Resume } from '@models/resume.models';

@Component({
	selector: 'app-resume-preview',
	templateUrl: './resume-preview.component.html',
	styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnInit {
	@Input() resume: Resume;
	@ViewChild('element', { static: true }) element: ElementRef<any>;

	constructor() { }

	ngOnInit() {
		console.log(this.resume)
	}

}
