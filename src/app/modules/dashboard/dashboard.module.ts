import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveComponent } from './pages/archive/archive.component';
import { HomeComponent } from './pages/home/home.component';
import { NewResumeComponent } from './pages/new-resume/new-resume.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		ArchiveComponent,
		HomeComponent,
		NewResumeComponent
	],
	imports: [
		CommonModule,
		SharedModule
	]
})
export class DashboardModule { }
