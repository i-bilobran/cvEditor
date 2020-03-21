import { FormlyFieldConfig } from '@ngx-formly/core';

const softSkillOptions = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
]

export const Fields: FormlyFieldConfig[] = [
	{
		key: 'about',
		wrappers: ['group'],
		templateOptions: { label: 'About' },
		fieldGroup: [
			{
				key: 'firstName',
				type: 'input',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'First name',
				}
			},
			{
				key: 'lastName',
				type: 'input',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Last name',
				}
			}],
	},
	{
		key: 'about',
		wrappers: ['group'],
		fieldGroup: [
			{
				key: 'fullInfo',
				type: 'textarea',
				templateOptions: {
					required: true,
					rows: 3,
					type: 'text',
					label: 'Full info',
				}
			},
			{
				key: 'englishProficiencyLevel',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'English Proficiency Level',
					options: [
						{ value: 1, label: '1 - Elementary' },
						{ value: 2, label: '2 - Intermediate' },
						{ value: 3, label: '3 - Advanced' }
					]
				}
			},
			{
				key: 'education',
				type: 'input',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Education',
				}
			},
			{
				key: 'university',
				type: 'input',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'University/Institute/College',
				}
			}
		],
	},
	{
		key: 'skills',
		wrappers: ['group'],
		templateOptions: { label: 'Skills & Technologies' },
		fieldGroup: [
			{
				key: 'technologies',
				type: 'input',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Programming languages, technologies',
				}
			},
			{
				key: 'frameworks',
				type: 'input',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Frameworks',
				}
			}],
	},
	{
		key: 'softSkills',
		wrappers: ['group'],
		templateOptions: { label: 'Soft skills' },
		fieldGroup: [
			{
				key: 'communication',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Communication',
					options: softSkillOptions
				}
			},
			{
				key: 'positiveAttitude',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Positive Attitude',
					options: softSkillOptions
				}
			},
			{
				key: 'teamwork',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Teamwork',
					options: softSkillOptions
				}
			},
			{
				key: 'responsibility',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Responsibility',
					options: softSkillOptions
				}
			},
			{
				key: 'handingPressure',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Handing pressure',
					options: softSkillOptions
				}
			},
			{
				key: 'flexibility',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Flexibility',
					options: softSkillOptions
				}
			},
			{
				key: 'problemSolving',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Problem solving',
					options: softSkillOptions
				}
			},
			{
				key: 'criticalThinking',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Critical thinking',
					options: softSkillOptions
				}
			},
			{
				key: 'workEthics',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Work ethics',
					options: softSkillOptions
				}
			},
			{
				key: 'leading',
				type: 'select',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Leading',
					options: softSkillOptions
				}
			}
		]
	},
	{
		key: 'experience',
		wrappers: ['group'],
		type: 'repeat',
		templateOptions: {
			label: 'Experience',
			addText: 'Add project',
		},
		fieldArray: {
			fieldGroup: [
				{
					key: 'projectName',
					type: 'input',
					templateOptions: {
						required: true,
						type: 'text',
						label: 'Project name',
					}
				},
				{
					key: 'description',
					type: 'textarea',
					templateOptions: {
						required: true,
						rows: 3,
						type: 'text',
						label: 'Description',
					}
				},
				{
					key: 'teamSize',
					type: 'input',
					templateOptions: {
						required: true,
						type: 'number',
						label: 'Team size',
					}
				},
				{
					key: 'involvementDuration',
					type: 'input',
					templateOptions: {
						required: true,
						type: 'number',
						label: 'Involvement duration (month)'
					}
				},
				{
					key: 'customer',
					type: 'input',
					templateOptions: {
						required: true,
						type: 'text',
						label: 'Customer'
					}
				},
				{
					key: 'role',
					type: 'input',
					templateOptions: {
						required: true,
						type: 'number',
						label: 'Project role'
					}
				},
				{
					key: 'responsibilities',
					type: 'textarea',
					templateOptions: {
						required: true,
						rows: 3,
						type: 'string',
						label: 'Responsibilities'
					}
				},
				{
					key: 'technologies',
					type: 'textarea',
					templateOptions: {
						required: true,
						rows: 3,
						type: 'string',
						label: 'Technologies'
					}
				},
			]
		}
	},
];
