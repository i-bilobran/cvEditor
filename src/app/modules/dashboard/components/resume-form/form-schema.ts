import { FormlyFieldConfig } from '@ngx-formly/core';
import { About, Skill, SoftSkills, Experience } from '@models/resume.models';

const softSkillOptions = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
];

export const InitialModel = {
	about: {} as About,
	skills: [
		{} as Skill
	],
	softSkills: {} as SoftSkills,
	experience: [
		{} as Experience
	]
};

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
			},
			{
				key: 'position',
				type: 'input',
				templateOptions: {
					required: true,
					type: 'text',
					label: 'Position',
				}
			}
		],
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
						{ value: 'Pre intermediate', label: '1 - Pre intermediate' },
						{ value: 'Intermediate', label: '2 - Intermediate' },
						{ value: 'Upper intermediate', label: '3 - Upper intermediate' },
						{ value: 'Advanced', label: '4 - Advanced' }
					]
				}
			},
			{
				fieldGroupClassName: 'form-flex',
				fieldGroup: [
					{
						key: 'education',
						type: 'input',
						className: 'flex-1',
						templateOptions: {
							required: true,
							type: 'text',
							label: 'Education',
						}
					},
					{
						key: 'university',
						type: 'input',
						className: 'flex-1',
						templateOptions: {
							required: true,
							type: 'text',
							label: 'University/Institute/College',
						}
					}
				]
			}
		],
	},
	{
		key: 'skills',
		wrappers: ['group'],
		type: 'repeat',
		templateOptions: {
			label: 'Skills & Technologies',
			addText: 'Add additional field',
		},
		fieldArray: {
			fieldGroup: [
				{
					key: 'label',
					type: 'input',
					templateOptions: {
						required: true,
						type: 'text',
						label: 'Technology title',
					}
				},
				{
					key: 'value',
					type: 'textarea',
					templateOptions: {
						required: true,
						rows: 3,
						type: 'text',
						label: 'Value',
					}
				}
			]
		}
	},
	{
		key: 'softSkills',
		wrappers: ['group'],
		templateOptions: { label: 'Soft skills' },
		fieldGroup: [
			{
				fieldGroupClassName: 'form-flex',
				fieldGroup: [
					{
						key: 'communication',
						type: 'select',
						className: 'flex-1',
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
						className: 'flex-1',
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
						className: 'flex-1',
						templateOptions: {
							required: true,
							type: 'text',
							label: 'Teamwork',
							options: softSkillOptions
						}
					},

				]
			},
			{
				fieldGroupClassName: 'form-flex',
				fieldGroup: [
					{
						key: 'responsibility',
						type: 'select',
						className: 'flex-1',
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
						className: 'flex-1',
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
						className: 'flex-1',
						templateOptions: {
							required: true,
							type: 'text',
							label: 'Flexibility',
							options: softSkillOptions
						}
					},
				]
			},
			{
				fieldGroupClassName: 'form-flex',
				fieldGroup: [
					{
						key: 'problemSolving',
						type: 'select',
						className: 'flex-1',
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
						className: 'flex-1',
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
						className: 'flex-1',
						templateOptions: {
							required: true,
							type: 'text',
							label: 'Work ethics',
							options: softSkillOptions
						}
					},
				]
			},
			{
				fieldGroupClassName: 'form-flex',
				fieldGroup: [{
					key: 'leading',
					type: 'select',
					className: 'flex-1',
					templateOptions: {
						required: true,
						type: 'text',
						label: 'Leading',
						options: softSkillOptions
					}
				}]
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
					fieldGroupClassName: 'form-flex',
					fieldGroup: [
						{
							key: 'teamSize',
							type: 'input',
							className: 'flex-1',
							templateOptions: {
								required: true,
								type: 'number',
								label: 'Team size',
							}
						},
						{
							key: 'involvementDuration',
							type: 'input',
							className: 'flex-1',
							templateOptions: {
								required: true,
								type: 'number',
								label: 'Involvement duration (month)'
							}
						},
						{
							key: 'role',
							type: 'input',
							className: 'flex-1',
							templateOptions: {
								required: true,
								type: 'text',
								label: 'Project role'
							}
						}
					]
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
