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

	ngOnInit() {
		console.log(this.base[0])
	}

	ngAfterViewInit() {
		const pages = Array.from(document.getElementsByClassName('pdf-page'));
		const lastPage = pages[pages.length - 1];
		const items = Array.from(lastPage.getElementsByClassName('main')[0].childNodes).filter(el => el.hasChildNodes());

		let currentHeight = 0;

		items.forEach((item: HTMLElement, index: number) => {
			const model = item.getAttribute('data-model');
			const repeat = !!item.getElementsByClassName('repeat-wrapper').length;

			// sub items
			if (repeat) {
				Array.from(item.getElementsByClassName('item')).map((subItem: HTMLElement, subIndex: number) => {
					// console.log(currentHeight, model, subIndex)
					if (subItem.hasAttribute('data-item')) {
						if (model === 'skills' && subIndex % 2 === 0) {
							currentHeight += subItem.offsetHeight;
						}
						if (model !== 'skills') {
							currentHeight += subItem.offsetHeight;
						}

						if (currentHeight <= 962) {
							this.handleItemOverload(model, false, subIndex);
						} else {
							this.handleItemOverload(model, true, subIndex);
							console.log('sub overload', model, subIndex)
						}
					}
				});
			} else {
				currentHeight += item.offsetHeight;

				if (currentHeight <= 962) {
					// currentHeight += item.offsetHeight;
					this.handleItemOverload(model, false);
				} else {
					console.log('top overload', model)
					this.handleItemOverload(model, true);
				}
			}
			currentHeight += 25;
		});

		console.log(this.pages);

		this.cd.detectChanges();
	}

	private handleItemOverload(model: string, removal: boolean, index?: number): void {
		const basePage = this.pages[0];
		let newPage = cloneDeep(this.pages[0 + 1]);
		console.log(newPage)

		if (model !== 'fullInfo' && model !== 'education') {
			if (removal) {
				console.log(model, index)

				if (!newPage) {
					newPage = cloneDeep(basePage);
					newPage.resume = {} as ResumeForm;
				}

				console.log(newPage, basePage);

				newPage.resume[model] = basePage.resume[model].slice(index);
				basePage.resume[model] = index !== undefined
					? basePage.resume[model].slice(0, index)
					: null;
			}
		} else {
			if (removal) {
				if (!newPage) {
					newPage = cloneDeep(basePage);
					newPage.resume = { about: {} } as ResumeForm;
				} else if (newPage && !newPage.resume.about) {
					newPage.resume.about = {} as About;
				} else {
				}

				newPage.resume.about[model] = basePage.resume.about[model];
				basePage.resume.about[model] = null;
			}
		}

		this.pages[0] = basePage;
		this.pages[0 + 1] = newPage;
	}
}
