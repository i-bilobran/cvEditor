import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';

import { Resume, ResumeForm, About } from '@models/resume.models';
import { clone, cloneDeep } from 'lodash';

@Component({
	selector: 'app-resume-preview',
	templateUrl: './resume-preview.component.html',
	styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnInit, AfterViewInit {
	@Input() base: Resume[];

	public pages: Resume[];

	constructor(private cd: ChangeDetectorRef) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.pages && changes.base.currentValue) {
			this.pages = cloneDeep(changes.base.currentValue);
		}
	}
	// Array.from(temp1.childNodes).filter(el => el.hasChildNodes())

	// recursion

	// wrapper => pages.forEeach(page) =>
	// if page height > 1133px: A
	//

	// A: split blocks => push redudant items to local variable => local variable = new page

	// if last page height > 1133px : A
	// else hidden => false

	ngOnInit() {
		console.log(this.base[0])
	}

	ngAfterViewInit() {
		const pages = Array.from(document.getElementsByClassName('pdf-page'));
		const lastPage = pages[pages.length - 1];
		const items = Array.from(lastPage.getElementsByClassName('main')[0].childNodes).filter(el => el.hasChildNodes());

		let currentHeight = 0;

		items.forEach((item: HTMLElement, index: number) => {
			currentHeight += item.offsetHeight;
			const model = item.getAttribute('data-model');

			if (currentHeight <= 1133) {
				this.handlePageOverload(model, false);
			} else {
				this.handlePageOverload(model, true);
			}
		});

		this.cd.detectChanges();
	}

	private handlePageOverload(model: string, removal: boolean): void {
		const basePage = this.pages[0];
		let newPage = this.pages[0 + 1];

		if (model !== 'fullInfo' && model !== 'education') {
			if (removal) {
				const newField = {} as ResumeForm;

				newField[model] = clone(basePage.resume[model]);

				if (!newPage) {
					newPage = clone(basePage);
					newPage.resume = newField;
				} else {
					newPage.resume[model] = basePage.resume[model];
				}

				basePage.resume[model] = null;
			} else {

			}
		} else {
			if (removal) {
				const newField = basePage.resume.about[model];

				if (!newPage) {
					newPage = clone(basePage);
					newPage.resume.about[model] = newField;
				} else if (newPage && !newPage.resume.about) {
					newPage.resume.about = {} as About;
					newPage.resume.about[model] = newField;
				} else {
					newPage.resume.about[model] = newField;
				}

				basePage.resume.about[model] = null;
			} else {
			}
		}
	}
}
