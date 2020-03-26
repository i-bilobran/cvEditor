import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ArchiveComponent } from './pages/archive/archive.component';
import { HomeComponent } from './pages/home/home.component';
import { EditResumeComponent } from './pages/edit-resume/edit-resume.component';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';

@NgModule({
	declarations: [
		ArchiveComponent,
		HomeComponent,
		EditResumeComponent,
		ResumeFormComponent
	],
	imports: [
		CommonModule,
		SharedModule
	]
})
export class DashboardModule { }
