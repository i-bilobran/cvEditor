declare var process: Process;

interface Process {
	env: Env
}

interface Env {
	GOOGLE_PROVIDER_ID: string;
}

interface GlobalEnviroment {
	process: Process
}