import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ArchiveComponent } from './pages/archive/archive.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ArchiveComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		SharedModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
