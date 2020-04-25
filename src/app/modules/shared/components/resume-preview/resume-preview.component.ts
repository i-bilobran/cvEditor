import { Component, OnInit, Input } from '@angular/core';

import { Resume } from '@models/resume.models';

@Component({
	selector: 'app-resume-preview',
	templateUrl: './resume-preview.component.html',
	styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnInit {
	@Input() resume: Resume;

	constructor() { }

	ngOnInit() {
	}

}
