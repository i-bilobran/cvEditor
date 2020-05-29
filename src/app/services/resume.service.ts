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
		from(html2canvas(element, {
			height: 1133,
			width: 794,
			logging: false,
			// scale: canvasQuality
		}))
			.subscribe(canvas => {
				const pdf = new jsPDF('p', 'mm', 'a4');
				const imgData = canvas.toDataURL('image/jpeg', 1.0);

				pdf.addImage(imgData, 'jpeg', 0, 0, 210, 297);

				pdf.addPage();

				// for (let i = 0; i <= element.clientHeight / 842; i++) {

				// 	// ! This is all just html2canvas stuff
				// 	const srcImg = canvas;
				// 	const sX = 0;
				// 	const sY = 842 * i; // start 842 pixels down for every new page
				// 	const sWidth = 595;
				// 	const sHeight = 842;
				// 	const dX = 0;
				// 	const dY = 0;
				// 	const dWidth = 595;
				// 	const dHeight = 842;

				// 	const onePageCanvas = document.createElement('canvas');
				// 	onePageCanvas.setAttribute('width', '595');
				// 	onePageCanvas.setAttribute('height', '842');
				// 	const ctx = onePageCanvas.getContext('2d');
				// 	// details on this usage of this function:
				// 	// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
				// 	ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

				// 	// document.body.appendChild(canvas);
				// 	const canvasDataURL = onePageCanvas.toDataURL('image/png', 1.0);

				// 	const width = onePageCanvas.width;
				// 	const height = onePageCanvas.clientHeight;

				// 	// a4 - 595, 842 (595pt, 842pt)
				// 	// mm 210mm, 297mm, (794px, 1122px)

				// 	// letter - 612pts, 791pts (816px, 1056px)

				// 	// ! If we're on anything other than the first page,
				// 	// add another page
				// 	if (i > 0) {
				// 		pdf.addPage([595, 842]); // 8.5' x 11' in pts (in*72)
				// 	}
				// 	// ! now we declare that we're working on that page
				// 	pdf.setPage(i + 1);
				// 	// ! now we add content to that page!
				// 	pdf.addImage(canvasDataURL, 'PNG', 0, 0, (width * .75), (height * .75));

				// }
				// ! after the for loop is finished running, we save the pdf.
				pdf.save('test.pdf');
			});
	}

	makePDF2(element: HTMLElement) {
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

	// crateCanvas(pagesLength: number, body: HTMLElement, staticTextChild: number, imagesUrls: ImagesBase64[]) {
	// 	// pagesLength - я наперід знаю скільки в мене буде сторінок, в моєму випадку є елемент в html, по якому розділяю сторінки
	// 	// отримую все body (перед тим всі картинки замінила на base64, тому що по силці картинки не тягнуться)
	// 	let canvasQuality;

	// 	for (let k = 0; k < (pagesLength); k++) {
	// 		html2canvas(body, {
	// 			height: 1133,
	// 			width: 794,
	// 			logging: false,
	// 			scale: canvasQuality,
	// 			onclone: (content: any) => {
	// 				// отут роблю всі маніпляції з body
	// 				const pagesList = content.body.querySelectorAll('p[name ="PAGE_CONTAINER"]');
	// 				// ось тут зі всього body витягую конкретну сторінку, як бачиш вони в мене чітко розділяються по елементу 'p[name ="PAGE_CONTAINER"]'
	// 				this.getContentBetweenPages(pagesList[k], pagesList[k + 1], 'p[name ="PAGE_CONTAINER"]', k, content.body);
	// 				// сетаю стилі, щоб моє body коректно виглядало на A4
	// 				// body знаходиться в content і я редагую прям сам обєкт, тому після всіх маніпуляцій content.body змінене і перетворюється в канвас
	// 				// а оскільки при кожній наступній ітерації циклу я отримую дефіолтне повне боді, тому не боюся редагувати карентний content
	// 				const bodyCloned = content.body;
	// 				bodyCloned.className = '';
	// 				bodyCloned.style.width = '699px';
	// 				bodyCloned.style.margin = '0';
	// 				bodyCloned.style.padding = '0';
	// 				bodyCloned.style.paddingLeft = '47px';
	// 				bodyCloned.style.paddingRight = '47px';
	// 				bodyCloned.style.paddingTop = '37px';
	// 				bodyCloned.style.paddingBottom = '51px';
	// 				const inputsList = bodyCloned.getElementsByTagName('input');
	// 				for (let i = inputsList.length - 1; i >= 0; --i) {
	// 					const span = document.createElement('span');
	// 					span.innerHTML = inputsList[i].value;
	// 					inputsList[i].parentNode.replaceChild(span, inputsList[i]);
	// 				}
	// 				let proposalCssMarkup;
	// 				const editorCssMarkupCopy = proposalCssMarkup.concat(`
	//           img[src=""]{display:none}

	//           .static-text-class{line-height: 1.5;font-size:14px}

	//           table[border="0"],
	//           table[border="0"] td,
	//           table[border="0"] th,
	//           .footer-container,
	//           .logo-placeholder{border: 1px solid white !important;
	//           border-left: none !important; border-right: none !important}
	//           `)
	// 					.replace('html{background:#f8f8f8}', '');

	// 				content.getElementsByTagName('style')[0].innerHTML = editorCssMarkupCopy;
	// 			},
	// 		})
	// 			.then((canvas: any) => {
	// 				const imgData = canvas.toDataURL('image/jpeg', 1.0);

	// 				// в масив додаю картинк і індех, щоб потім їх посортувати в правильному порядку
	// 				this.imagesForPDF.push({
	// 					index: k,
	// 					file: imgData,
	// 				});
	// 				if (this.counter + 1 === (pagesLength)) {
	// 					this._proposalGenerationService.emitImages(this.imagesForPDF);
	// 					this.imagesForPDF = [];
	// 					this.counter = 0;

	// 					this.removeStaticText(staticTextChild, body);
	// 					if (imagesUrls.length) {
	// 						this.replaceImagesSrc(body, imagesUrls, 'base64', 'url');
	// 					}

	// 				} else {
	// 					this.counter++;
	// 				}
	// 			});
	// 	}
	// }

	// // видаляю весь лишній контент і отримую лише одну сторінку по індексу, яку зараз потрібно
	// getContentBetweenPages(elem: Element, nextPage: Element, selector: string, index: number, body: HTMLElement) {
	// 	if (index !== 0) {
	// 		this.removePreviousElements(elem);
	// 		let parent = elem.parentElement;
	// 		while (parent !== body) {
	// 			this.removePreviousElements(elem.parentElement);
	// 			parent = parent.parentElement;
	// 		}
	// 	}

	// 	if (nextPage) {
	// 		this.removeNextElement(nextPage);

	// 		nextPage.parentElement.removeChild(nextPage);
	// 	}
	// }

	// removePreviousElements(elem: Element): void {
	// 	while (elem.previousElementSibling) {
	// 		elem.parentElement.removeChild(elem.previousElementSibling);
	// 	}
	// }

	// removeNextElement(nextPage: Element): void {
	// 	while (nextPage.nextElementSibling) {
	// 		nextPage.parentElement.removeChild(nextPage.nextElementSibling);
	// 	}
	// }

	// downloadProposal(): void {
	// 	this._proposalGenerationService.changeImagesEmitted$
	// 		.pipe(takeUntil(this.destroy$))
	// 		.subscribe((images: ImagesForPDF[]) => {
	// 			// отримую з сабджекта, в якому емітнула картинки (бо вони в різних компонентах)
	// 			if (!images) {
	// 				this.loadingSave = false;
	// 				return;
	// 			}

	// 			// сортую в правильному порядку по індексу
	// 			images.sort((a, b) => a.index - b.index);

	// 			// генерую пдфку з картинок
	// 			const doc = new jsPDF('p', 'mm', 'a4');
	// 			images.forEach((el, index) => {
	// 				doc.addImage(el.file, 'jpeg', 0, 0, 210, 297);
	// 				if (index < images.length - 1) {
	// 					doc.addPage();
	// 				}
	// 			});

	// 			// далі готую файл, щоб зберегти на амазон
	// 			const formData = new FormData();
	// 			formData.append('pdf', doc.output('blob'));
	// 			this.loadingSave = false;

	// 			const selectedStandard: ProposalStandardDTO = this.currentProductTypeAllProposals
	// 				.filter(el => el.id === this.proposalForCurrentProductTypeStandard.id)[0];
	// 			let fileName = selectedStandard.name ?
	// 				`${selectedStandard.name}_${this.proposalForCurrentProductTypeStandard.id}` :
	// 				`${this.getNameForStandard(selectedStandard)}_${this.proposalForCurrentProductTypeStandard.id}`;

	// 			fileName = fileName
	// 				.replace(/[\/\s]/g, '_')
	// 				.replace(/[,]/g, '');

	// 			// зберігаю юзеру одразу локально на комп
	// 			doc.save(fileName);
	// 			// this.openPDFSnackbar();

	// 			this._proposalGenerationService.saveGeneratedProposal(this.generatedProposalId, formData)
	// 				.pipe(take(1))
	// 				.subscribe(() => {
	// 					this._toaster.sendMessage('PDF file is uploaded successfully');
	// 				});
	// 		});
	// }
}
