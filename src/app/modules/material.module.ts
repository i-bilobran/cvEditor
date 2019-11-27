import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatMenuModule,
		MatButtonModule,
		MatDialogModule,
		MatToolbarModule
	],
	exports: [
		MatMenuModule,
		MatButtonModule,
		MatDialogModule,
		MatToolbarModule
	]
})
export class MaterialModule { }
