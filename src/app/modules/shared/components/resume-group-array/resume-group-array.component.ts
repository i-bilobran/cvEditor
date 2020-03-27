import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
	selector: 'app-resume-group-array',
	templateUrl: './resume-group-array.component.html',
	styleUrls: ['./resume-group-array.component.scss']
})
export class ResumeGroupArrayComponent extends FieldArrayType {
	constructor() {
		super();
	}
}
