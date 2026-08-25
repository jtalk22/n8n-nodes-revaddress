import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAddress = {
	resource: ['address'],
};

export const addressDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAddress,
		},
		options: [
			{
				name: 'Validate',
				value: 'validate',
				action: 'Standardize an address',
				description:
					'Standardize a US address against the Census Bureau master address file. Output is standardized, not USPS-verified: no DPV, no CASS.',
				routing: {
					request: {
						method: 'GET',
						url: '/api/address/validate',
					},
				},
			},
			{
				name: 'Districts',
				value: 'districts',
				action: 'Resolve districts for an address',
				description:
					'Congressional district (current line and the 2026 redistricted line where a state redrew), state senate and house, county, place, school district, and the sitting House member. 3 credits per call.',
				routing: {
					request: {
						method: 'GET',
						url: '/api/address/districts',
					},
				},
			},
			{
				name: 'Profile',
				value: 'profile',
				action: 'Pull a federal data profile for an address',
				description:
					'Nine federal datasets with provenance per block: ACS demographics, FEMA flood zone, elevation, CBRS, wildfire risk, Opportunity Zone, National Risk Index, FCC broadband, districts, and NRHP. 5 credits per call.',
				routing: {
					request: {
						method: 'GET',
						url: '/api/address/profile',
					},
				},
			},
		],
		default: 'validate',
	},
	{
		displayName: 'Street Address',
		name: 'streetAddress',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 1100 Congress Ave',
		description: 'House number and street name',
		displayOptions: {
			show: showOnlyForAddress,
		},
		routing: {
			request: {
				qs: {
					streetAddress: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		default: '',
		placeholder: 'e.g. Austin',
		description: 'City name. Optional when a ZIP Code is given.',
		displayOptions: {
			show: showOnlyForAddress,
		},
		routing: {
			request: {
				qs: {
					city: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'string',
		default: '',
		placeholder: 'e.g. TX',
		description: 'Two-letter state code. Required for Districts and Profile.',
		displayOptions: {
			show: showOnlyForAddress,
		},
		routing: {
			request: {
				qs: {
					state: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'ZIP Code',
		name: 'ZIPCode',
		type: 'string',
		default: '',
		placeholder: 'e.g. 78701',
		description: 'Five-digit ZIP Code. Optional when city and state are given.',
		displayOptions: {
			show: showOnlyForAddress,
		},
		routing: {
			request: {
				qs: {
					ZIPCode: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForAddress,
		},
		options: [
			{
				displayName: 'Secondary Address',
				name: 'secondaryAddress',
				type: 'string',
				default: '',
				placeholder: 'e.g. Suite 200',
				description: 'Unit, suite, apartment, or floor',
				routing: {
					request: {
						qs: {
							secondaryAddress: '={{$value}}',
						},
					},
				},
			},
		],
	},
];
