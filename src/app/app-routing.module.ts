import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './modules/auth/pages/login/login.component';
import { HomeComponent } from './modules/dashboard/pages/home/home.component';
import { ArchiveComponent } from './modules/dashboard/pages/archive/archive.component';
import { NewResumeComponent } from './modules/dashboard/pages/new-resume/new-resume.component';
import { DefaultLayoutComponent } from './modules/shared/components/default-layout/default-layout.component';


const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DefaultLayoutComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'archive',
				component: ArchiveComponent
			},
			{
				path: 'new-resume',
				component: NewResumeComponent
			}
		]
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
