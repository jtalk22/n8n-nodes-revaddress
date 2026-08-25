import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { addressDescription } from './resources/address';

export class RevAddress implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'RevAddress',
		name: 'revAddress',
		icon: { light: 'file:revaddress.svg', dark: 'file:revaddress.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Standardize US addresses (Census-based, not USPS-verified), resolve congressional and state legislative districts including the 2026 redistricted line, and pull a federal-data profile',
		defaults: {
			name: 'RevAddress',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'revAddressApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.revaddress.com',
			headers: {
				Accept: 'application/json',
				'X-RevAddress-Surface': 'n8n',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Address',
						value: 'address',
					},
				],
				default: 'address',
			},
			...addressDescription,
		],
	};
}
