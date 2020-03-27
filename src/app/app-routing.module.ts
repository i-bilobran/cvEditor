import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

import { LoginComponent } from './modules/auth/pages/login/login.component';
import { HomeComponent } from './modules/dashboard/pages/home/home.component';
import { ArchiveComponent } from './modules/dashboard/pages/archive/archive.component';
import { EditResumeComponent } from './modules/dashboard/pages/edit-resume/edit-resume.component';
import { DefaultLayoutComponent } from './modules/shared/components/default-layout/default-layout.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [
			LoginGuard
		]
	},
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DefaultLayoutComponent,
		canActivate: [
			AuthGuard
		],
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full'
			},
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'archive',
				component: ArchiveComponent
			},
			{
				path: 'resume',
				children: [
					{
						path: 'new',
						component: EditResumeComponent
					},
					{
						path: ':id',
						component: EditResumeComponent
					}
				]
			}
		]
	},
	{
		path: '**',
		redirectTo: 'login'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
