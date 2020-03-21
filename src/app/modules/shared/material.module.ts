import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

const customAppearance: MatFormFieldDefaultOptions = {
	appearance: 'outline'
};

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatMenuModule,
		MatButtonModule,
		MatDialogModule,
		MatToolbarModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule
	],
	exports: [
		MatMenuModule,
		MatButtonModule,
		MatDialogModule,
		MatToolbarModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule
	],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: customAppearance
		}
	],
})
export class MaterialModule { }
