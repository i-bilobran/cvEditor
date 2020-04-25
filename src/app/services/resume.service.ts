import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { from } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ResumeService {

	constructor() { }

	makePDF(element: HTMLElement) {
		from(html2canvas(element))
			.subscribe(canvas => {
				const pdf = new jsPDF('p', 'px', 'a4');

				console.log(element.clientWidth, element.clientHeight);

				for (let i = 0; i <= element.clientHeight / 842; i++) {

					// ! This is all just html2canvas stuff
					const srcImg = canvas;
					const sX = 0;
					const sY = 842 * i; // start 842 pixels down for every new page
					const sWidth = 595;
					const sHeight = 842;
					const dX = 0;
					const dY = 0;
					const dWidth = 595;
					const dHeight = 842;

					const onePageCanvas = document.createElement('canvas');
					onePageCanvas.setAttribute('width', '595');
					onePageCanvas.setAttribute('height', '842');
					const ctx = onePageCanvas.getContext('2d');
					// details on this usage of this function:
					// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
					ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

					// document.body.appendChild(canvas);
					const canvasDataURL = onePageCanvas.toDataURL('image/png', 1.0);

					const width = onePageCanvas.width;
					const height = onePageCanvas.clientHeight;

					// a4 - 595, 842 (595pt, 842pt)
					// mm 210mm, 297mm, (794px, 1122px)

					// letter - 612pts, 791pts (816px, 1056px)

					// ! If we're on anything other than the first page,
					// add another page
					if (i > 0) {
						pdf.addPage([595, 842]); // 8.5' x 11' in pts (in*72)
					}
					// ! now we declare that we're working on that page
					pdf.setPage(i + 1);
					// ! now we add content to that page!
					pdf.addImage(canvasDataURL, 'PNG', 0, 0, (width * .75), (height * .75));

				}
				// ! after the for loop is finished running, we save the pdf.
				pdf.save('test.pdf');
			});
	}
}
