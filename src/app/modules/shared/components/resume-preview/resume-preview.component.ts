import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Resume } from '@models/resume.models';

@Component({
	selector: 'app-resume-preview',
	templateUrl: './resume-preview.component.html',
	styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnInit, AfterViewInit {
	@Input() pages: Resume[];
	@ViewChild('wrapper', { static: true }) element: ElementRef<any>;

	constructor() { }

	// Array.from(temp1.childNodes).filter(el => el.hasChildNodes())

	// recursion

	// wrapper => pages.forEeach(page) =>
	// if page height > 1133px: A
	//

	// A: split blocks => push redudant items to local variable => local variable = new page

	// if last page height > 1133px : A
	// else hidden => false

	ngOnInit() {
		console.log(this.pages[0])
	}

	ngAfterViewInit() {
		console.log(document.getElementsByClassName('pdf-page'))
	}
}
