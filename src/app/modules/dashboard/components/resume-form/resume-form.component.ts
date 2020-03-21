import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { cloneDeep } from 'lodash';

import { Fields } from './form-schema';

@Component({
	selector: 'app-resume-form',
	templateUrl: './resume-form.component.html',
	styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {
	public form = new FormGroup({});
	public model = {};
	public fields: FormlyFieldConfig[] = cloneDeep(Fields);

	constructor() { }

	ngOnInit() {
	}

	onSubmit() {
		console.log(this.model);
	}
}
