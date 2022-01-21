export const productCategories = [
	{value: 'audio', label: 'Audio'},
	{value: 'clothing-and-apparel', label: 'Clothing and apparel'},
	{value: 'electronics', label: 'Electronics'},
	{value: 'fitness', label: 'Fitness'},
	{value: 'health-beauty', label: 'Health & Beauty'},
	{value: 'household-appliances', label: 'Household Appliances'},
	{value: 'indoor-games', label: 'Indoor Games'},
	{value: 'kitchen-dining', label: 'Kitchen & Dining'},
	{value: 'lawn-garden', label: 'Lawn & Garden'},
	{value: 'luggage-and-travel', label: 'Luggage and Travel'},
	{value: 'outdoor-recreation', label: 'Outdoor Recreation'},
	{value: 'personal-care', label: 'Personal Care'},
	{value: 'pet-supplies', label: 'Pet Supplies'},
	{value: 'vehicle-parts-accessories', label: 'Vehicle Parts & Accessories'},
	{value: 'furniture', label: 'Furniture'}
]

export const innovationCategories = [
	{value: 'connected', label: 'Connected'},
	{value: 'artistic-design', label: 'Artistic Design'},
	{value: 'eco-friendly', label: 'Eco friendly'},
	{value: 'low-cost', label: 'Low cost'},
	{value: 'unusual-materials', label: 'Unusual materials'},
	{value: 'new-hitech-materials', label: 'New Hitech materials'},
	{value: 'new-function', label: 'New function'},
	{value: 'other-function', label: 'Other function'}
]

export const profileProductCategories = [
	{value: 1, label: 'Audio'},
	{value: 2, label: 'Clothing and apparel'},
	{value: 3, label: 'Electronics'},
	{value: 4, label: 'Fitness'},
	{value: 5, label: 'Health & Beauty'},
	{value: 6, label: 'Household Appliances'},
	{value: 7, label: 'Indoor Games'},
	{value: 8, label: 'Kitchen & Dining'},
	{value: 9, label: 'Lawn & Garden'},
	{value: 10, label: 'Luggage and Travel'},
	{value: 11, label: 'Outdoor Recreation'},
	{value: 12, label: 'Personal Care'},
	{value: 13, label: 'Pet Supplies'},
	{value: 15, label: 'Vehicle Parts & Accessories'},
	{value: 16, label: 'Furniture'}
]

export const profileInnovationCategories = [
	{value: 1, label: 'Connected'},
	{value: 2, label: 'Artistic Design'},
	{value: 3, label: 'Eco friendly'},
	{value: 4, label: 'Low cost'},
	{value: 5, label: 'Unusual materials'},
	{value: 6, label: 'New Hitech materials'},
	{value: 7, label: 'New function'},
	{value: 8, label: 'Other function'}
]

export const investmentGoals = [
	{value: 'good-return', label: 'Good return on investment'},
	{value: 'new-business', label: 'New business Opportunities'},
	{value: 'great-teams', label: 'Network with great minds & great terms'}
]

export const languages = [
	{
		label: 'English',
		value: 'en'
	}, {
		label: 'Chinese',
		value: 'zh'
	}, {
		label: 'German',
		value: 'de'
	}, {
		label: 'Spanish',
		value: 'es'
	}, {
		label: 'Italian',
		value: 'it'
	}, {
		label: 'polish',
		value: 'pl'
	}
]

export const languageExperienceLevel = [
	{
		label: 'Beginner',
		value: 'beginner'
	}, {
		label: 'Conversational',
		value: 'conversational'
	}, {
		label: 'Business',
		value: 'business'
	}, {
		label: 'Fluent',
		value: 'fluent'
	}
]

export const contactTimes = [
	{value: '24', label: 'Anytime'},
	{value: '9-6', label: 'Working hours (9am to 6pm)'},
	{value: '6-9', label: 'Evening time (6pm to 9pm)'}
]

export const availabilityScopeOptions = [
	{value: 'fulltime', label: 'Full time'},
	{value: 'parttime', label: 'Part time'}
]

export const availabilityTimeOptions = [
	{value: '10', label: 'less than 10 hours'},
	{value: '10-20', label: '10 - 20 hours'},
	{value: '20-30', label: '20 - 30 hours'},
	{value: '30-40', label: '30 - 40 hours'},
	{value: '40', label: 'more than 40 hours'}
]

export const availabilityPriceOptions = [
	{value: '100', label: 'less than $100'},
	{value: '100-500', label: '$100 - $50'},
	{value: '500-1000', label: '$500 - $1000'},
	{value: '1000', label: 'more than $1000'}
]

export const eductionDegreeTypeOptions = [
	{value: 'a-a', label: 'A.A.'},
	{value: 'a-s', label: 'A.S.'},
	{value: 'aas', label: 'AAS'},
	{value: 'b-a', label: 'B.A.'},
	{value: 'b-s', label: 'B.S.'},
	{value: 'bfa', label: 'BFA'},
	{value: 'bas', label: 'BAS'},
	{value: 'm-a', label: 'M.A.'},
	{value: 'm-s', label: 'M.S.'},
	{value: 'mba', label: 'MBA'},
	{value: 'mfa', label: 'MFA'},
	{value: 'ph-d', label: 'Ph.D.'},
	{value: 'j-d', label: 'J.D.'},
	{value: 'm-d', label: 'M.D.'},
	{value: 'dds', label: 'DDS'}
]

export const educationDegreeYearsOptions = () => {
	return new Promise<any>((resolve) => {
		
		const years = []
		
		for (let i = new Date().getFullYear(); i >= 1950; i--) {
			years.push({id: i, name: i.toString()})
		}
		
		resolve({options: years})
	})
}

export const countries = require('../data/countries.json').countries
export const nationalityCountries = require('../data/countries.json').countries.filter((c: any) => c.value !== '--')

export const transactionTypeSelectOptions = [
	{value: 'token-purchase', label: 'Token Purchase'},
	{value: 'contestant-reward', label: 'Contestant Reward'},
	{value: 'judge-earnings', label: 'Awards Judge Earnings'},
	{value: 'expertise', label: 'Expertise Earnings'}
]
export const getTransactionTypeStatusLabel = (type: string) => {
	const types = transactionTypeSelectOptions.filter(tType => tType.value === type)
	
	return types.length > 0 ? types[0].label : ''
}
