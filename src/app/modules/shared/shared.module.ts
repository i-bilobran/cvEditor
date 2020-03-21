import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FileDropModule } from 'ngx-file-drop';

import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { MaterialModule } from './material.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CvCardComponent } from './components/cv-card/cv-card.component';
import { CvNewCardComponent } from './components/cv-new-card/cv-new-card.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
	declarations: [
		DefaultLayoutComponent,
		PageHeaderComponent,
		CvCardComponent,
		CvNewCardComponent,
		FooterComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		FlexLayoutModule,
		FileDropModule,
		ReactiveFormsModule,
		FormlyModule.forRoot(),
		FormlyMaterialModule
	],
	exports: [
		MaterialModule,
		FlexLayoutModule,
		DefaultLayoutComponent,
		PageHeaderComponent,
		CvCardComponent,
		CvNewCardComponent,
		FileDropModule,
		ReactiveFormsModule,
		FormlyModule,
		FormlyMaterialModule
	]
})
export class SharedModule { }
