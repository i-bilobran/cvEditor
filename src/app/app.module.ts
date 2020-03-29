import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '@env/environment';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

import { AppComponent } from './app.component';

console.log(environment);

const config = new AuthServiceConfig([
	{
		id: GoogleLoginProvider.PROVIDER_ID,
		provider: new GoogleLoginProvider(environment.googleLoginProviderId)
	}
]);

export function provideConfig() {
	return config;
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		SocialLoginModule,
		SharedModule,
		AuthModule,
		DashboardModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		{
			provide: AuthServiceConfig,
			useFactory: provideConfig
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
