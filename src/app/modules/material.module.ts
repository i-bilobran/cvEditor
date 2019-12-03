import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatMenuModule,
		MatButtonModule,
		MatDialogModule,
		MatToolbarModule,
		MatIconModule
	],
	exports: [
		MatMenuModule,
		MatButtonModule,
		MatDialogModule,
		MatToolbarModule,
		MatIconModule
	]
})
export class MaterialModule { }
