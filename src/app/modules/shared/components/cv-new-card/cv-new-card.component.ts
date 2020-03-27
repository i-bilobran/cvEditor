import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-cv-new-card',
	templateUrl: './cv-new-card.component.html',
	styleUrls: ['./cv-new-card.component.scss']
})
export class CvNewCardComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	public navigate(): void {
		this.router.navigate(['/dashboard/resume/new']);
	}
}
