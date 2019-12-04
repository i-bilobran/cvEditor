import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';


import { DefaultLayoutComponent } from '../components/default-layout/default-layout.component';
import { MaterialModule } from './material.module';
import { PageHeaderComponent } from '../components/page-header/page-header.component';

@NgModule({
	declarations: [
		DefaultLayoutComponent,
		PageHeaderComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		FlexLayoutModule
	],
	exports: [
		DefaultLayoutComponent,
		PageHeaderComponent
	]
})
export class SharedModule { }
