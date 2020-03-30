import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

import { AuthenticationService } from './auth.service';
import { UserService } from '../../services/user.service';

const config = new AuthServiceConfig([
	{
		id: GoogleLoginProvider.PROVIDER_ID,
		provider: new GoogleLoginProvider('test')
	}
]);

export function provideConfig() {
	return config;
}

describe('AuthenticationService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientTestingModule,
			RouterTestingModule
		],
		providers: [
			AuthService,
			UserService,
			{
				provide: AuthServiceConfig,
				useFactory: provideConfig
			}
		]
	}));

	it('should be created', () => {
		const service: AuthenticationService = TestBed.get(AuthenticationService);
		expect(service).toBeTruthy();
	});
});
