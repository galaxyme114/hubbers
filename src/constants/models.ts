// Model interfaces
import { UserRecord, UserEducationRecord, UserPositionRecord } from '../interfaces/user'
import { Currency, InputType, QuestionTypes, VideoService } from './enums'

export interface QuestionRecord {
	id: number
	category: string
	title: string
	type: QuestionTypes
	tags: [string]
	correctValue: ReadonlyArray<any>
	value?: any
	weight: number
	tutorial: [string]
	tutorialLinks: [string]
	tutorialImage: string
}

export interface AnswerRecord {
	questionId: number
	value: any
}

export interface QuestionnaireRecord {
	categoryId: number
	title: string
	questions: ReadonlyArray<QuestionRecord>
}

export interface CategoryRecord {
	id: number
	icon: string
	title: string
	preQualification: boolean
	questions: ReadonlyArray<QuestionRecord>
	explanation: ExplanationRecord
}

export interface ExpertRecord {
	_id: string
	userId: string
	name: string
	caption: string
	bio: string
	thumbnailImageUrl: string
	rating: number
	reviews: number
	country: string
	responseTime: number
	deliveryTime: number
	jobsCompleted: number
	earnings: number
	email: string
}

export interface ExpertiseRecord {
	_id: string
	shortId: string
	featuredImageUrl: string
	gallery?: string[]
	name: string
	slug: string
	rating: number
	reviews: number
	category?: string
	about: string
	tags: string[]
	faq: FAQRecord[]
	expert: ExpertRecord
	packages?: PackageRecord[]
	briefTemplate: BriefTemplateRecord
	isDraft: boolean
}

export interface FAQRecord {
	title: string
	answer: string
}

export interface BriefTemplateFieldRecord {
	name: string
	formType: InputType
}

export interface BriefTemplateRecord {
	nda: boolean
	attachments: boolean
	additionalInfo: boolean
	fields: [BriefTemplateFieldRecord]
	version: number
}

export interface BriefDataRecord {
	nda: boolean
	// attachments: [AttachmentRecord]
	fields: [{
		name: string
		value: string
	}]
	lastUpdated?: string
}

export interface OfferBreakdownRecord {
	name: string
	delivery: number
	price: number
	selected: string
}

export interface OfferRecord {
	name: string
	currency: string
	breakdown: [OfferBreakdownRecord]
	selected: string
}

export interface ExpertiseOrderRecord {
	_id: string
	userId: number
	selectedPackage: string
	expertise: ExpertiseRecord
	briefData: BriefDataRecord
	offers: [OfferRecord]
}

export interface PackageRecord {
	_id?: string
	name: string
	price: number
	currency: Currency
	description: string
	availability: string
	delivery: number
}

export interface BusinessNeedsRecord {
	_id: string
	shortId: string
	description: string
	tags: string[]
	project: ProjectRecord
	category: ExpertiseCategoryRecord
	bids: BusinessNeedsBidsRecord[]
	expertiseOrder: ExpertiseOrderRecord
}

export interface BusinessNeedsBidsRecord {
	proposal: string,
	expertise: ExpertiseRecord,
	selectedPackage: string
}

export interface ExplanationRecord {
	title: string
	video: VideoRecord
	content: string
}

export interface VideoRecord {
	service: VideoService
	value: string
}

export interface ProfileRecord extends UserRecord {
	// contact_number: number
	// bio: string
	// position: string
	// address: string
	// products: any
	// innovations: any
	// creator: any
	// expert: any
	// investor: any
	// skills: ReadonlyArray<SkillRecord>
	// categories: ReadonlyArray<ExpertiseCategoryRecord>
	// expertise_categories: ReadonlyArray<ExpertiseCategoryRecord>
	// follower_count: number
	// following_count: number
	// created_at: string
	activities: any
	projects: any
	contests: any
	// user_roles: any
}

export interface ProjectRecord {
	_id: string
	shortId: string
	name: string
	slug: string
	description: string
	productCategory: any
	innovationCategory: any
	market: string
	price: number
	geography: string
	language: string
	featuredImageUrl: string
	display: number
	isDraft: boolean
	state: number
	created_at: string
	likesCount: number
	shares: number
	views: number
	pldt_session: string
}

export interface TestimonialRecord {
	id: number
	image: string
	title: string
	content: string
	caption: string
}

export interface ContestRecord {
	_id: string
	shortId: string
	slug: string
	status: number
	featuredImageUrl: string
	name: string
	description: string
	excerpt: string
	market: string
	rules: string
	duration: number
	memberApplication: MemberApplicationRecord
	viewCount: number
	sharesCount: number
	likesCount: number
	numContestants: number
	numJudges: number
	followers_count: number
	prizes: [any]
	likes: string[]
	judges: [any]
	contestants: [any]
	isDraft: boolean
	startTime: string
	endTime: string
	geography: string
	innovationCategory: string
	productCategory: string
	criteria: ContestCriteriaRecord[]
}

export interface ContestCriteriaRecord {
	title: string
	body: string
}

export interface MemberApplicationRecord {
	type: string
	isPending: boolean
}

export interface ContestEntryRecord {
	_id: string
	featuredImageUrl: string
	title: string
	contest: string
	descriptionDesign: string
	descriptionFunctionality: string
	descriptionUsability: string
	descriptionMarketPotential: string
	attachments: ContestEntryAttachmentRecord[]
	rating: ContestEntryRatingRecord
	ratings: ContestEntryRatingRecord[]
	contestant?: any
	judge?: any
	myRating?: any
	marksGiven?: any
	averageRating: any
	isDraft: boolean
	createdAt: string
	updatedAt: string
}

export interface ContestEntryRatingRecord {
	_id?: string
	average?: number
	design: number
	designComment: string
	functionality: number
	functionalityComment: string
	usability: number
	usabilityComment: string
	marketPotential: number
	marketPotentialComment: string
	isSeen?: boolean,
	judge?: UserRecord
	createdAt?: string
	updatedAt?: string
}

export interface ContestEntryAttachmentRecord {
	_id: string
	previewUrl: string
	title: string
	caption: string
}

export interface ContestLeaderBoardRecord extends UserRecord {
	id: number
	currentRank: number
	previousRank: number
	rating: {
		average: number
		design: number
		functionality: number
		usability: number
		marketPotential: number
	}
}

export interface InvestorRecord {
	userId: string
	numShares: number
	user: UserRecord
}

export interface InvestorNoticeRecord {
	id: number
	heading: string
	message: string
	created_at: string
	updated_at: string
}

export interface InvestorLegalDocsRecords {
	id: number
	file_id: number
	name: string
	user_id: number
	created_at: string
	updated_at: string
	user: UserRecord
	file: FileRecord
}

export interface FileRecord {
	id: number
	title: string
	file_name: string
	extension: string
	file_size: number
	url: string
	created_at: string
	updated_at: string
}

export interface KPIDataRecord {
	name: string
	data: ReadonlyArray<KPIValueRecord>
}

export interface KPIValueRecord {
	month: string
	planned: number
	actual: number
}

export interface KPIRecord {
	'current-share-value': number
	'share-value': KPIDataRecord
	'kpi-users-creators': KPIDataRecord
	'kpi-projects-ongoing': KPIDataRecord
	'kpi-users-super-experts': KPIDataRecord
	'kpi-users-experts': KPIDataRecord
	'kpi-users-investor': KPIDataRecord
	'kpi-ongoing-projects': KPIDataRecord
	'kpi-completed-projects': KPIDataRecord
	'kpi-ongoing-contests': KPIDataRecord
	'kpi-completed-contests': KPIDataRecord
}

export interface InvestorsDataRecord {
	kpi: KPIRecord
	investors: ReadonlyArray<InvestorRecord>
	observers: ReadonlyArray<InvestorRecord>
	notices: ReadonlyArray<InvestorNoticeRecord>
	legalDocs: ReadonlyArray<InvestorLegalDocsRecords>
}

export interface EventsSpeakerRecord {
	name: string
	thumbnailImageUrl: string
	position: string
	bio: string
}

export interface EventsRecord {
	_id: string
	shortId: string
	name: string
	slug: string
	description: string
	country: string
	featuredImageUrl: string
	address: string
	date: string
	time: string
	speakers: EventsSpeakerRecord[]
	map: string
	agenda: string
	schedule: [{
		time: string
		description: string
	}],
	attending: string[]
}

export interface SkillRecord {
	id: number
	name: string
	description: string
}

export interface ExpertiseCategoryRecord {
	_id: string
	name: string
	description: string
}

export interface InvitationDataRecord {
	_id: string
	name: string
	lastName: string
	email: string
	contestId?: number
}

export interface LanguageRecord {
	language: string
	level: string
}

export interface EducationRecord {
	country: string
	name: string
	title: string
	degree: string
	year: number
}

export interface PageRecord {
	id: number
	title: string
	slug: string
	content: string
}

export interface EmailSettingsRecord {
	email: string
	shortId: string
	allEmails: boolean
}

export interface MessageRecord {
	_id: string
	participants: any
	name: string
	authorId: number
	createdAt: string
	updatedAt: string
	latestMessage: any
	author: any
	primaryParticipant: any
}

export interface UserAssetsRecord {
	totalAssets: number
	valueIncrease: number
	transactionTypes: {
		[index: string]: TransactionTypeRecord
	}
}

export interface TransactionTypeRecord {
	totalAmount: number
	transactions: TransactionRecord[]
}

export interface TransactionRecord {
	txId: string
	userId: number
	amount: number
	currency: string
	type: string
	status: string
	createdAt: string
	updatedAt: string
}
export interface CommunityRecord {
	shortId: string
	country: string
	city: string
	facilitators: [UserRecord]
	featuredImageUrl?: string
	numConsultants: string
	socialMediaTags: string[]
	partners: string[]
	tags: any
	events: [EventsRecord]
	posts: any
	blogs: any
}
export interface PublicProfileRecord {
	_id: string
	skills: [SkillRecord]
    name: string
	locations: [UserPositionRecord]
	languages: [LanguageRecord]
	positions: [UserEducationRecord]
	bio: string
	thumbnailImageUrl: string
	attendedEvent: [EventsRecord]
	eventVisitedCount: number
	contestCount: number
	projectCounts: number
}