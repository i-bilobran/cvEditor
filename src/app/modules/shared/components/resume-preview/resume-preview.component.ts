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
				console.log('repeat', model)
				// title margin-bottom
				const title = item.getElementsByClassName('title')[0] as HTMLElement;
				currentHeight += title.offsetHeight + 10;

				Array.from(item.getElementsByClassName('item')).map((subItem: HTMLElement, subIndex: number) => {
					if (subItem.hasAttribute('data-item')) {
						if (model === 'skills' && subIndex % 2 === 0) {
							currentHeight += subItem.offsetHeight + 15;
						}
						if (model !== 'skills') {
							currentHeight += subItem.offsetHeight + 15;
						}

						if (currentHeight <= 962) {
							// this.handleItemOverload(model, false, subIndex);
						} else {
							this.handleItemOverload(model, true, subIndex);
						}
					}
				});
			} else {
				currentHeight += item.offsetHeight;
				console.log(model, currentHeight)
				if (currentHeight <= 962) {
					// currentHeight += item.offsetHeight;
					// this.handleItemOverload(model, false);
				} else {
					this.handleItemOverload(model, true);
				}
			}

			currentHeight += 25;
		});

		this.pages = [...this.pages];

		setTimeout(() => {
			this.cd.detectChanges();
		}, 100);

		console.log(this.pages)
	}

	private handleItemOverload(model: string, removal: boolean, index?: number): void {
		const basePage = this.pages[0];
		let newPage = this.pages[0 + 1];

		console.log('overload', model, index, 'new page: ', newPage, 'base page: ', basePage);

		if (model !== 'fullInfo' && model !== 'education') {
			if (removal) {
				if (!newPage) {
					newPage = cloneDeep(basePage);
					newPage.resume = {} as ResumeForm;
				}

				newPage.resume[model] = index !== undefined
					? !newPage.resume[model] ? basePage.resume[model].slice(index) : newPage.resume[model]
					: basePage.resume[model];

				basePage.resume[model] = index !== undefined
					? basePage.resume[model].length ? basePage.resume[model].slice(0, index) : []
					: null;
			}
		} else {
			if (removal) {
				if (!newPage) {
					console.log('new page create')
					newPage = cloneDeep(basePage);
					newPage.resume = {
						about: {}
					} as ResumeForm;
				} else if (newPage && !newPage.resume.about) {
					newPage.resume.about = {} as About;
				}

				newPage.resume.about[model] = basePage.resume.about[model];
				basePage.resume.about[model] = null;
			}
		}

		this.pages[0] = basePage;
		this.pages[0 + 1] = newPage;

		this.cd.detectChanges();
	}
}
