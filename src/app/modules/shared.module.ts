import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultLayoutComponent } from '../components/default-layout/default-layout.component';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [DefaultLayoutComponent],
	imports: [
		CommonModule,
		MaterialModule,
	],
	exports: [
		DefaultLayoutComponent
	]
})
export class SharedModule { }
