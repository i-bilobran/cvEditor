import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewResumeComponent } from './pages/new-resume/new-resume.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ArchiveComponent,
		FooterComponent,
		NewResumeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		SharedModule,
		AuthModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
