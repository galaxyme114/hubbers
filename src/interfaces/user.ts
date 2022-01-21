export interface UserRecord {
	_id: string
	thumbnailImageUrl: string
	name: string
	lastName: string
	email: string
	role: string
	phoneNumber: string
	phoneNumberCountryCode: string
	resetPasswordToken: string
	gender: string
	dob: string
	headline: string
	industry: string
	bio: string
	legacyId: string
	linkedinId: string
	linkedin: string
	linkedinProfileUrl: string
	locations: [UserLocationRecord]
	languages: [UserLanguageRecord]
	positions: [UserPositionRecord]
	education: [UserEducationRecord]
	skills: string[]
	productCategories: string[]
	innovationCategories: string[]
	expertiseCategories: string[]
	capabilities: string[]
	password?: string
	fullName?: string
	nationality: string
	followers: string[]
	following: string[]
	assets: any
	isSiteInvestor: boolean
	updatedAt: string
	createdAt: string
}

export interface UserLocationRecord {
	country: string
	state: string
	city: string
	pin: string
	name: string
	isPrimary: boolean
}

export interface UserLanguageRecord {
	language: string
	level: string
}

export interface UserPositionRecord {
	title: string
	isCurrent: boolean
	locationCountry: string
	locationState: string
	locationCity: string
	companyName: string
	companyType: string
	companyIndustry: string
	companySize: string
	startDate: string
	endDate: string
}

export interface UserEducationRecord {
	country: string
	name: string
	title: string
	degree: string
	year: number
}