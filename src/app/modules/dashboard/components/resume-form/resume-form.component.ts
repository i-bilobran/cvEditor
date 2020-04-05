import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { cloneDeep } from 'lodash';

import { Fields, InitialModel } from './form-schema';
import { ResumeForm } from '@models/resume.models';

@Component({
	selector: 'app-resume-form',
	templateUrl: './resume-form.component.html',
	styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent {
	@Input() model: ResumeForm = cloneDeep(InitialModel);
	@Output() submit: EventEmitter<ResumeForm> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	public form = new FormGroup({});
	public fields: FormlyFieldConfig[] = cloneDeep(Fields);

	constructor(private router: Router) { }

	public onCancel(): void {
		this.router.navigate(['/dashboard/home']);
	}

	public onSubmit(): void {
		if (this.form.valid) {
			this.submit.emit(this.model);
		}
	}
}
