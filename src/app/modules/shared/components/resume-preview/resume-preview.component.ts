import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges, OnChanges, AfterViewInit, ViewChild, ViewRef, TemplateRef, ElementRef } from '@angular/core';

import { Resume, ResumeForm, About } from '@models/resume.models';
import { cloneDeep } from 'lodash';
import { ResumeService } from '@services/resume.service';

@Component({
	selector: 'app-resume-preview',
	templateUrl: './resume-preview.component.html',
	styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnInit, OnChanges, AfterViewInit {
	@Input() base: Resume[];
	@Input() preview: boolean;

	public pages: Resume[];

	@ViewChild('wrapper', { static: false }) wrapper: ElementRef;

	constructor(
		private cd: ChangeDetectorRef,
		private resumeService: ResumeService
	) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.pages && changes.base.currentValue) {
			this.pages = cloneDeep(changes.base.currentValue);
		}
	}

	ngOnInit() {
		console.log(this.base[0])
	}

	ngAfterViewInit() {
		this.buildPages();
	}

	public download(): void {
		this.resumeService.generatePDF(this.wrapper.nativeElement);
	}

	private buildPages(): void {
		const pages = Array.from(document.getElementsByClassName('pdf-page'));
		const pageIndex = pages.length - 1;
		const lastPage: Element = pages[pageIndex];
		const items = (Array.from(lastPage.getElementsByClassName('main')[0].childNodes) as HTMLElement[])
			.filter(el => el.hasChildNodes());

		this.calculateMainContentHeight(items, pageIndex)

		this.pages = [...this.pages];

		if (this.pages.length !== pages.length) {
			console.log('Overload. Build new PDF page');
			this.buildPages();
		} else {
			console.log('PDF page building finished', this.pages);
		}
	}

	private calculateMainContentHeight(items: HTMLElement[], pageIndex): void {
		const contentHeight = 962;
		let currentHeight = 0;

		items.forEach((item: HTMLElement) => {
			const model = item.getAttribute('data-model');
			const repeat = !!item.getElementsByClassName('repeat-wrapper').length;

			// sub items
			if (repeat) {
				// TODO: calculate margins dynamically, remove hardcode

				const title = item.getElementsByClassName('title')[0] as HTMLElement;
				currentHeight += title.offsetHeight + 10;
				// 10 = title margin-bottom

				Array.from(item.getElementsByClassName('item')).map((subItem: HTMLElement, subIndex: number) => {
					if (subItem.hasAttribute('data-item')) {
						if (model === 'skills' && subIndex % 2 === 0) {
							// 15 = sub item margin bottom px
							currentHeight += subItem.offsetHeight + 15;
						}
						if (model !== 'skills') {
							// 15 = sub item margin bottom px
							currentHeight += subItem.offsetHeight + 15;
						}

						if (currentHeight >= contentHeight) {
							this.handleItemOverload(model, pageIndex, subIndex);
						}
					}
				});
			} else {
				currentHeight += item.offsetHeight;

				if (currentHeight >= contentHeight) {
					this.handleItemOverload(model, pageIndex);
				}
			}
		});
	}

	private handleItemOverload(model: string, pageIndex: number, index?: number): void {
		const basePage = this.pages[pageIndex];
		let newPage = this.pages[pageIndex + 1];

		if (model !== 'fullInfo' && model !== 'education') {
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
		} else {
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

		this.pages[pageIndex] = basePage;
		this.pages[pageIndex + 1] = newPage;

		this.cd.detectChanges();
	}
}
