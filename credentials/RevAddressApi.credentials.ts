import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RevAddressApi implements ICredentialType {
	name = 'revAddressApi';

	displayName = 'RevAddress API';

	icon: Icon = {
		light: 'file:../nodes/RevAddress/revaddress.svg',
		dark: 'file:../nodes/RevAddress/revaddress.dark.svg',
	};

	documentationUrl = 'https://revaddress.com/docs/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Your RevAddress API key (starts with rv_live_). Get a free key (1,000 requests a month) at https://revaddress.com/signup/?label=n8n.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
				'X-RevAddress-Surface': 'n8n',
			},
		},
	};

	// GET /api/my/usage is key-scoped, costs no credits, and does not depend on
	// the USPS lane, so it answers "is this key valid" with a 200 or a 401.
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.revaddress.com',
			url: '/api/my/usage',
			method: 'GET',
		},
	};
}
