// Questions / Categories data

import { QuestionTypes, QuestionTypesRating, QuestionTypesYesNo } from '../constants/enums'

const questions: any = [
	{
		id: 1,
		title: 'Overview',
		icon: 'overview',
		preQualification: true,
		questions: [
			{
				id: 1,
				title: 'Do you have a product name?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.01
			},
			{
				id: 2,
				title: 'Can you define your product category?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.01
			},
			{
				id: 3,
				title: 'Do you have a product tagline?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.03
			},
			{
				id: 4,
				title: 'Do you have some kind of visual rendering of your product?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.1
			}
		],
		explanation: {
			title: 'How to brand your product',
			video: {
				service: 'vimeo',
				value: 'x5gdjs1s9281'
			},
			content: '<p>Define your product and create a brand name that resonates with what you want to communicate ' +
				'to your potential customer/ consumer</p>'
		}
	},
	{
		id: 2,
		title: 'Value Proposition',
		icon: 'value',
		preQualification: true,
		questions: [
			{
				id: 1,
				title: 'Have you clarified what need or issues your product is solving?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 2,
				title: 'Can you list all your product functions and user features?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 3,
				title: 'Can you describe clearly your product essential features in one sentence?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.1
			},
			{
				id: 4,
				title: 'Do you have a pricing strategy and price target for your product?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			}
		],
		explanation: {
			title: 'How to do a market research',
			video: {
				service: 'vimeo',
				value: 'x5gdjs1s9281'
			},
			content: '<p>Write a competitor analysis according to product/ service specification ' +
				'(SWOT of strongest  competitors)</p>' +
				'<p>List all similar product , competitor or ""quasi-competitors"" available in Amazon, eBay, Taobao</p>' +
				'<p>Collect basic Infos on competition: product images, yearly sales quantities, price, main features, ' +
				'user feedback</p>'
		}
	},
	{
		id: 3,
		title: 'Competition',
		icon: 'competition',
		preQualification: true,
		questions: [
			{
				id: 1,
				title: 'Do you know if there is similar product and quasi-competitors on the market?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.1
			},
			{
				id: 2,
				title: 'Do you know how much opportunity for growth is possible for your product within the current ' +
					'competition environment?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05,
				labelLow: 'Unlikely',
				labelHigh: 'Likely'
			},
			{
				id: 3,
				title: 'Do you know how likely your product can be crowd funded?',
				type: QuestionTypes.RATING,
				correctValue: [QuestionTypesRating.Five, QuestionTypesRating.Six, QuestionTypesRating.Seven],
				value: null,
				weight: 0.05
			},
			{
				id: 4,
				title: 'Did you list your product competitive advantages compare to existing competition?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.1
			}
		],
		explanation: {
			title: 'How to do a market research',
			video: {
				service: 'vimeo',
				value: 'x5gdjs1s9281'
			},
			content: '<p>Write a competitor analysis according to product/ service specification ' +
				'(SWOT of strongest competitors)</p> ' +
				'<p>List all similar product , competitor or "quasi-competitors" available in Amazon, eBay, Taobao.</p>' +
				'<p>Collect basic Infos on competition: product images, yearly sales quantities, price, ' +
				'main features, user feedbac</p>'
		}
	},
	{
		id: 4,
		title: 'Specifications',
		icon: 'specifications',
		preQualification: false,
		questions: [
			{
				id: 1,
				title: 'Did you wrote product general specifications ?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 2,
				title: 'Do you have a functional analyse of your product by sub-assemblies?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 3,
				title: 'Do you have a BOM for you product?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 4,
				title: 'Do you have product components detailed drawings?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 5,
				title: 'Do you have QC plan?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			}
		],
		explanation: {
			title: 'How to write product specification',
			video: {
				service: 'vimeo',
				value: 'x5gdjs1s9281'
			},
			content: '<p>Write up the general specifications of the product according to functionality and production</p>\n' +
				'<p>List and name all sub-assemblies</p>\n' +
				'<p>Describe sub-assemply fuctions, functional testing and validations targets</p>'
		}
	},
	{
		id: 5,
		title: 'Environment',
		icon: 'planning',
		preQualification: false,
		questions: [
			{
				id: 1,
				title: 'Did you assess your need for IP protection?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 2,
				title: 'Do you have IP strategy and action plan?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 3,
				title: 'Do you know which regulations apply to your product?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 4,
				title: 'Do you know which manufacturing and logistic organization will best suit your product growth?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 5,
				title: 'Do you know which sales and distribution organization will best suit your product growth?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			}
		],
		explanation: {
			title: 'Copyright & IP expert',
			video: {
				service: 'vimeo',
				value: 'x5gdjs1s9281'
			},
			content: '<p>Define what kind of IP protection may or may not be useful in existing competitive ' +
				'environment and on target markets o Prepare IP action plan: list task, schedule, cost</p>' +
				'<p>Perform IP protection action plan</p>'
		}
	},
	{
		id: 6,
		title: 'Business Development',
		icon: 'bd',
		preQualification: false,
		questions: [
			{
				id: 1,
				title: 'Can you describe all you buyers personas?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 2,
				title: 'Did you talk to more than 10 potential users of your product?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 3,
				title: 'Do you have a business development strategy?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 4,
				title: 'Do you have sales targets in line with development and industrialisation costs?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 5,
				title: 'Did you sold product already?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 6,
				title: 'Do you know how to manage invoicing and other sales admin tasks?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			}
		],
		explanation: {
			title: 'How to define your customer profiles',
			video: {
				service: 'vimeo',
				value: 'x5gdjs1s9281'
			},
			content: '<p>Define and list target customers personas/profile definition</p>' +
				'<p>Create multiple buyer personas</p>' +
				'<p>Research user experience and success of similar products</p>' +
				'<p>Prepare a business development action plan: list tasks, schedule, costs</p>'
		}
	},
	{
		id: 7,
		title: 'Marketing & Communication',
		icon: 'marketing',
		preQualification: false,
		questions: [
			{
				id: 1,
				title: 'Do you have a logo?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 2,
				title: 'Do you have a marketing strategy?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 3,
				title: 'Can you list and describe your product target markets?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 4,
				title: 'Do you know your products target markets potential?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 5,
				title: 'Do you have a brochure for your communication?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 6,
				title: 'Did you perform online communication of any kind about your product?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 7,
				title: 'Did you perform offline communication of any kind about your product?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 8,
				title: 'Do you have a website or online communication tool for your product ?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 9,
				title: 'Do you have an online/offline communication strategy and action plan?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 10,
				title: 'Do you have a pitch deck?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			}
		],
		explanation: {
			title: 'how to create a logo',
			video: {
				service: 'vimeo',
				value: 'x5gdjs1s9281'
			},
			content: '<p>Create visual identity including logo and brand charter</p>\n' +
				'<p>Create the logo/visual identity in Photoshop</p>\n' +
				'<p>Create the logo/visual identiy in Illustrator oTranslation</p>'
		}
	},
	{
		id: 8,
		title: 'Planning',
		icon: 'planning',
		preQualification: false,
		questions: [
			{
				id: 1,
				title: 'Do you have a team to work on all tasks you are not able to do?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 2,
				title: 'Do you have a precise list of tasks to perform to develop, ' +
					'manufacture and sell a first batch of your product?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 3,
				title: 'Do you have a product development and manufacturing action plan?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 4,
				title: 'Do you have proof of concept or an MVP?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			}
		],
		explanation: {
			title: 'How effective project management works',
			video: {
				service: 'vimeo',
				value: 'x5gdjs1s9281'
			},
			content: '<p>Create a specialized project team and assign tasks and responsibilties to team members</p>\n' +
				'<p>Draw up team communication plan</p>\n' +
				'<p>Draw up a task list to ensure product is developper, manufactures and sold successfully</p>'
		}
	},
	{
		id: 9,
		title: 'Financial',
		icon: 'financials',
		preQualification: false,
		questions: [
			{
				id: 1,
				title: 'Do you know the cost to develop your idea into a product that sells?',
				type: QuestionTypes.YES_NO,
				correctValue: [QuestionTypesYesNo.YES],
				value: null,
				weight: 0.05
			},
			{
				id: 2,
				title: 'Do you know the communication costs?',
				type: QuestionTypes.YES_NO,
				correctValue: QuestionTypesYesNo.YES,
				value: null,
				weight: 0.05
			},
			{
				id: 3,
				title: 'DO you know the prototyping and pre-industrial batch manufacturing costs?',
				type: QuestionTypes.YES_NO,
				correctValue: QuestionTypesYesNo.YES,
				value: null,
				weight: 0.05
			},
			{
				id: 4,
				title: 'Do you have a P&L or a CF forecast for product development and future sales?',
				type: QuestionTypes.YES_NO,
				correctValue: QuestionTypesYesNo.YES,
				value: null,
				weight: 0.05
			},
			{
				id: 5,
				title: 'Do you have investors for your product development?',
				type: QuestionTypes.YES_NO,
				correctValue: QuestionTypesYesNo.YES,
				value: null,
				weight: 0.05
			},
			{
				id: 6,
				title: 'Did you invest your own money (or do you intend to) into product development?',
				type: QuestionTypes.YES_NO,
				correctValue: QuestionTypesYesNo.YES,
				value: null,
				weight: 0.05
			}
		],
		explanation: {
			title: 'How to allocate your promotion budget',
			video: {
				service: 'vimeo',
				value: 'x5gdjs1s9281'
			},
			content: '<p>Define cost related to each task listed in actions plans (sales development, ' +
				'specifications/industrial, quality</p>\n' +
				'<p>Create a budget for Marketing action plan/ Communication action plan (online, offline, samples)</p>\n' +
				'<p>Define cost of production of prototypes, pre-series, samples and test/gifting purposes </p>'
		}
	}
]

export default questions