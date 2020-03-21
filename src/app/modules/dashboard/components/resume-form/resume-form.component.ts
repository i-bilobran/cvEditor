import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
	selector: 'app-resume-form',
	templateUrl: './resume-form.component.html',
	styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {
	form = new FormGroup({});
	model = { email: 'email@gmail.com' };
	fields: FormlyFieldConfig[] = [
		{
			key: 'email',
			type: 'input',
			templateOptions: {
				label: 'Email address',
				placeholder: 'Enter email',
				required: true,
			}
		}
	];

	constructor() { }

	ngOnInit() {
	}



	onSubmit() {
		console.log(this.model);
	}
}
