import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../../auth.service';
import { AuthServiceConfig, GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { RouterTestingModule } from '@angular/router/testing';

const config = new AuthServiceConfig([
	{
		id: GoogleLoginProvider.PROVIDER_ID,
		provider: new GoogleLoginProvider('test')
	}
]);

export function provideConfig() {
	return config;
}

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let authenticationService: AuthenticationService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [LoginComponent],
			providers: [
				AuthenticationService,
				AuthService,
				{
					provide: AuthServiceConfig,
					useFactory: provideConfig
				}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		authenticationService = TestBed.get(AuthenticationService);
		fixture.detectChanges();
	});

	test('should create', () => {
		expect(component).toBeTruthy();
	});
});
