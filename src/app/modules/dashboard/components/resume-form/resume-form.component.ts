import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
	@Output() submit: EventEmitter<any> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	public form = new FormGroup({});
	public model = {
		skills: [
			{}
		],
		experience: [
			{}
		]
	};
	public fields: FormlyFieldConfig[] = cloneDeep(Fields);

	constructor() { }

	ngOnInit() {
	}

	public onCancel(): void {
		this.cancel.emit();
	}

	public onSubmit(): void {
		console.log(this.model);

		if (this.form.valid) {
			this.submit.emit(this.model);
		}
	}
}
