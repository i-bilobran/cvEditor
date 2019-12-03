import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { DefaultLayoutComponent } from '../components/default-layout/default-layout.component';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [DefaultLayoutComponent],
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
	],
	exports: [
		DefaultLayoutComponent
	]
})
export class SharedModule { }
