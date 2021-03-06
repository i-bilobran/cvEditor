import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';

import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { MaterialModule } from '../material/material.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CvCardComponent } from './components/cv-card/cv-card.component';
import { CvNewCardComponent } from './components/cv-new-card/cv-new-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResumeGroupComponent } from './components/resume-group/resume-group.component';
import { ResumeGroupArrayComponent } from './components/resume-group-array/resume-group-array.component';
import { ResumePreviewComponent } from './components/resume-preview/resume-preview.component';
import { PreviewModalComponent } from './components/preview-modal/preview-modal.component';


@NgModule({
	declarations: [
		DefaultLayoutComponent,
		PageHeaderComponent,
		CvCardComponent,
		CvNewCardComponent,
		FooterComponent,
		ResumeGroupComponent,
		ResumeGroupArrayComponent,
		ResumePreviewComponent,
		PreviewModalComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		FlexLayoutModule,
		NgxFileDropModule,
		ReactiveFormsModule,
		FormlyModule.forRoot({
			wrappers: [
				{ name: 'group', component: ResumeGroupComponent }
			],
			types: [
				{ name: 'repeat', component: ResumeGroupArrayComponent }
			]
		}
		),
		FormlyMaterialModule,
		ImageCropperModule
	],
	entryComponents: [
		PreviewModalComponent,
		ResumePreviewComponent
	],
	exports: [
		MaterialModule,
		FlexLayoutModule,
		DefaultLayoutComponent,
		PageHeaderComponent,
		CvCardComponent,
		CvNewCardComponent,
		NgxFileDropModule,
		ReactiveFormsModule,
		FormlyModule,
		FormlyMaterialModule,
		ImageCropperModule,
		ResumePreviewComponent,
		PreviewModalComponent
	]
})
export class SharedModule { }
