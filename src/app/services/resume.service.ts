import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { from, concat, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ResumeService {

	constructor() { }

	generatePDF(wrapper: HTMLElement): void {
		const pages = Array.from(wrapper.getElementsByClassName('pdf-page'));
		const pdf = new jsPDF('p', 'mm', 'a4');
		const numeration = []
		const observableList = forkJoin(pages.map((page: HTMLElement, index: number) => {

			// check for first page (it creates by default)
			if (index) {
				pdf.addPage();
			}

			numeration.push(index)

			// create canvas from page with default sizes
			return from(html2canvas(page, {
				height: 1133,
				width: 794,
				logging: false,
				scale: 2

			}))
				.pipe(map((canvas) => {
					const imgData = canvas.toDataURL('image/jpeg', 1.0);

					// set canvas page as pdf page
					pdf.setPage(index + 1);
					pdf.addImage(imgData, 'jpeg', 0, 0, 210, 297);
				}));
		}));

		observableList.subscribe(() => {
			// after all page converted to the canvas
			pdf.save('test.pdf');
		})
	}
}
