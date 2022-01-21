// Enums used in the app

/**
 * All question types constants
 */
export enum QuestionTypes {
	TEXT = 'TEXT',
	RADIO = 'RADIO',
	YES_NO = 'YES_NO',
	RATING = 'RATING'
}

/**
 * Constants for yes no question type
 * 1 - lowest, 5 - highest, 3 - neutral
 */
export enum QuestionTypesYesNo {
	YES = 'YES',
	NO = 'NO'
}

/**
 * Constants for rating question type
 * 1 - lowest, 7 - highest, 4 - neutral
 */
export enum QuestionTypesRating {
	One = '1',
	Two = '2',
	Three = '3',
	Four = '4',
	Five = '5',
	Six = '6',
	Seven = '7'
}

/**
 * Currency Enum
 */
export enum Currency {
	USD = 'usd',
	CNY = 'cny',
	KRW = 'krw',
	HBS = 'hbs',
	HBB = 'hbb'
}

/**
 * Video Service
 */
export enum VideoService {
	YOUTUBE = 'youtube',
	VIMEO = 'vimeo',
	LOCAL = 'local'
}

/**
 * Project Stage Values
 */
export const ProjectStageValues: any = {
	0: 'Project Details',
	0.9: 'Waiting for approval',
	1: 'Super Expert Selection',
	2: 'Expertise Definition',
	3: 'Experts Selection',
	4: 'Business Plan Definition',
	5: 'Investment'
}

export enum InputType {
	TEXT = 'text',
	NUMBER = 'number',
	PHONE = 'phone',
	TEXTAREA = 'textarea',
	EMAIL = 'email',
	SELECT = 'select',
	ASYNC_SELECT = 'async_select',
	ASYNC_TAGS = 'async_tags',
	PASSWORD = 'password',
	TAGS = 'tags'
}

export enum PasswordInputType {
	VALIDATE = 'validate',
	MATCH = 'match'
}

export enum ContestMemberType {
	NONE = 'none',
	PENDING_JUDGE = 'pending-judge',
	PENDING_CONTESTANT = 'pending-contestant',
	JUDGE = 'judge',
	CONTESTANT = 'contestant'
}