// Constants for actions
import * as objectAssign from 'object-assign'

import { Action } from 'redux'

import {
	BusinessNeedsRecord,
	CategoryRecord,
	ContestEntryRecord,
	ContestRecord,
	EmailSettingsRecord,
	EventsRecord,
	ExpertiseOrderRecord,
	ExpertiseRecord,
	InvestorsDataRecord,
	InvitationDataRecord,
	PageRecord,
	ProfileRecord,
	PublicProfileRecord,
	ProjectRecord,
	QuestionnaireRecord,
	TestimonialRecord,
	UserAssetsRecord,
	CommunityRecord
} from './models'

export enum ActionTypeStates {
	INPROGRESS = 'INPROGRESS',
	SUCCESS = 'SUCCESS',
	FAILED = 'FAILED'
}

class BaseAction {
	public toObject() {
		return objectAssign({}, this)
	}
}

/**
 * Fetching Categories
 */
type FETCH_CATEGORIES_SUCCESS = 'pldt/categories/fetch/success'
type FETCH_CATEGORIES_PENDING = 'pldt/categories/fetch/pending'
type FETCH_CATEGORIES_FAILED = 'pldt/categories/fetch/failed'
export const FETCH_CATEGORIES_SUCCESS: FETCH_CATEGORIES_SUCCESS = 'pldt/categories/fetch/success'
export const FETCH_CATEGORIES_PENDING: FETCH_CATEGORIES_PENDING = 'pldt/categories/fetch/pending'
export const FETCH_CATEGORIES_FAILED: FETCH_CATEGORIES_FAILED = 'pldt/categories/fetch/failed'

export class FetchCategoriesPending extends BaseAction implements Action {
	public readonly type = FETCH_CATEGORIES_PENDING
}

export class FetchCategoriesSuccess extends BaseAction implements Action {
	public readonly type = FETCH_CATEGORIES_SUCCESS
	
	constructor(public payload: ReadonlyArray<CategoryRecord>) {
		super()
	}
}

export class FetchCategoriesFailed extends BaseAction implements Action {
	public readonly type = FETCH_CATEGORIES_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Setting active category
 */
type SET_ACTIVE_CATEGORY_SUCCESS = 'pldt/categories/set/success'
export const SET_ACTIVE_CATEGORY_SUCCESS: SET_ACTIVE_CATEGORY_SUCCESS = 'pldt/categories/set/success'

export class SetActiveCategory extends BaseAction implements Action {
	public readonly type = SET_ACTIVE_CATEGORY_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Update question value
 */
type UPDATE_QUESTION_VALUE_SUCCESS = 'pldt/questions/update/success'
export const UPDATE_QUESTION_VALUE_SUCCESS: UPDATE_QUESTION_VALUE_SUCCESS = 'pldt/questions/update/success'

export class UpdateQuestionValue extends BaseAction implements Action {
	public readonly type = UPDATE_QUESTION_VALUE_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch user data
 */
type FETCH_USER_DATA_SUCCESS = 'pldt/userData/fetch/success'
type FETCH_USER_DATA_PENDING = 'pldt/userData/fetch/pending'
type FETCH_USER_DATA_FAILED = 'pldt/userData/fetch/failed'
export const FETCH_USER_DATA_SUCCESS: FETCH_USER_DATA_SUCCESS = 'pldt/userData/fetch/success'
export const FETCH_USER_DATA_PENDING: FETCH_USER_DATA_PENDING = 'pldt/userData/fetch/pending'
export const FETCH_USER_DATA_FAILED: FETCH_USER_DATA_FAILED = 'pldt/userData/fetch/failed'

export class FetchUserDataPending extends BaseAction implements Action {
	public readonly type = FETCH_USER_DATA_PENDING
}

export class FetchUserDataSuccess extends BaseAction implements Action {
	public readonly type = FETCH_USER_DATA_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

export class FetchUserDataFailed extends BaseAction implements Action {
	public readonly type = FETCH_USER_DATA_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Save user data
 */
type SAVE_USER_DATA_SUCCESS = 'pldt/userData/save/success'
export const SAVE_USER_DATA_SUCCESS: SAVE_USER_DATA_SUCCESS = 'pldt/userData/save/success'

export class SaveUserDataSuccess extends BaseAction implements Action {
	public readonly type = SAVE_USER_DATA_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch user data
 */
type FETCH_USER_SESSION_SUCCESS = 'pldt/userSession/fetch/success'
type FETCH_USER_SESSION_PENDING = 'pldt/userSession/fetch/pending'
type FETCH_USER_SESSION_FAILED = 'pldt/userSession/fetch/failed'
export const FETCH_USER_SESSION_SUCCESS: FETCH_USER_SESSION_SUCCESS = 'pldt/userSession/fetch/success'
export const FETCH_USER_SESSION_PENDING: FETCH_USER_SESSION_PENDING = 'pldt/userSession/fetch/pending'
export const FETCH_USER_SESSION_FAILED: FETCH_USER_SESSION_FAILED = 'pldt/userSession/fetch/failed'

export class FetchUserSessionPending extends BaseAction implements Action {
	public readonly type = FETCH_USER_SESSION_PENDING
}

export class FetchUserSessionSuccess extends BaseAction implements Action {
	public readonly type = FETCH_USER_SESSION_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

export class FetchUserSessionFailed extends BaseAction implements Action {
	public readonly type = FETCH_USER_SESSION_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Questionnaire
 */
type FETCH_QUESTIONNAIRE_SUCCESS = 'pldt/questionnaire/fetch/success'
type FETCH_QUESTIONNAIRE_PENDING = 'pldt/questionnaire/fetch/pending'
type FETCH_QUESTIONNAIRE_FAILED = 'pldt/questionnaire/fetch/failed'
export const FETCH_QUESTIONNAIRE_SUCCESS: FETCH_QUESTIONNAIRE_SUCCESS = 'pldt/questionnaire/fetch/success'
export const FETCH_QUESTIONNAIRE_PENDING: FETCH_QUESTIONNAIRE_PENDING = 'pldt/questionnaire/fetch/pending'
export const FETCH_QUESTIONNAIRE_FAILED: FETCH_QUESTIONNAIRE_FAILED = 'pldt/questionnaire/fetch/failed'

export class FetchQuestionnairePending extends BaseAction implements Action {
	public readonly type = FETCH_QUESTIONNAIRE_PENDING
}

export class FetchQuestionnaireSuccess extends BaseAction implements Action {
	public readonly type = FETCH_QUESTIONNAIRE_SUCCESS
	
	constructor(public payload: QuestionnaireRecord) {
		super()
	}
}

export class FetchQuestionnaireFailed extends BaseAction implements Action {
	public readonly type = FETCH_QUESTIONNAIRE_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Lock Status
 */
type UPDATE_LOCK_STATUS = 'pldt/lock/update/success'
export const UPDATE_LOCK_STATUS: UPDATE_LOCK_STATUS = 'pldt/lock/update/success'

export class UpdateLockStatus extends BaseAction implements Action {
	public readonly type = UPDATE_LOCK_STATUS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Expertise
 */
type FETCH_EXPERTISE_SUCCESS = 'pldt/expertise/fetch/success'
type FETCH_EXPERTISE_PENDING = 'pldt/expertise/fetch/pending'
type FETCH_EXPERTISE_FAILED = 'pldt/expertise/fetch/failed'
export const FETCH_EXPERTISE_SUCCESS: FETCH_EXPERTISE_SUCCESS = 'pldt/expertise/fetch/success'
export const FETCH_EXPERTISE_PENDING: FETCH_EXPERTISE_PENDING = 'pldt/expertise/fetch/pending'
export const FETCH_EXPERTISE_FAILED: FETCH_EXPERTISE_FAILED = 'pldt/expertise/fetch/failed'

export class FetchExpertisePending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_PENDING
}

export class FetchExpertiseSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_SUCCESS
	
	constructor(public payload: ReadonlyArray<ExpertiseRecord>) {
		super()
	}
}

export class FetchExpertiseFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Business Needs
 */
type FETCH_BUSINESS_NEEDS_SUCCESS = 'pldt/businessNeeds/fetch/success'
type FETCH_BUSINESS_NEEDS_PENDING = 'pldt/businessNeeds/fetch/pending'
type FETCH_BUSINESS_NEEDS_FAILED = 'pldt/businessNeeds/fetch/failed'
export const FETCH_BUSINESS_NEEDS_SUCCESS: FETCH_BUSINESS_NEEDS_SUCCESS = 'pldt/businessNeeds/fetch/success'
export const FETCH_BUSINESS_NEEDS_PENDING: FETCH_BUSINESS_NEEDS_PENDING = 'pldt/businessNeeds/fetch/pending'
export const FETCH_BUSINESS_NEEDS_FAILED: FETCH_BUSINESS_NEEDS_FAILED = 'pldt/businessNeeds/fetch/failed'

export class FetchBusinessNeedsPending extends BaseAction implements Action {
	public readonly type = FETCH_BUSINESS_NEEDS_PENDING
}

export class FetchBusinessNeedsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_BUSINESS_NEEDS_SUCCESS
	
	constructor(public payload: ReadonlyArray<BusinessNeedsRecord>) {
		super()
	}
}

export class FetchBusinessNeedsFailed extends BaseAction implements Action {
	public readonly type = FETCH_BUSINESS_NEEDS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Toggle suggested expertise
 */
type TOGGLE_SUGGESTED_EXPERTISE_SUCCESS = 'pldt/suggestedExpertise/update/success'
export const TOGGLE_SUGGESTED_EXPERTISE_SUCCESS: TOGGLE_SUGGESTED_EXPERTISE_SUCCESS =
	'pldt/suggestedExpertise/update/success'

export class ToggleSuggestedExpertise extends BaseAction implements Action {
	public readonly type = TOGGLE_SUGGESTED_EXPERTISE_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Set active expertise
 */
type SET_ACTIVE_EXPERTISE_SUCCESS = 'pldt/expertise/active/success'
export const SET_ACTIVE_EXPERTISE_SUCCESS: SET_ACTIVE_EXPERTISE_SUCCESS = 'pldt/expertise/active/success'

export class SetActiveExpertise extends BaseAction implements Action {
	public readonly type = SET_ACTIVE_EXPERTISE_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Shortlist expertise success
 */
type SHORTLIST_EXPERTISE_SUCCESS = 'pldt/expertise/shortlist/success'
export const SHORTLIST_EXPERTISE_SUCCESS: SHORTLIST_EXPERTISE_SUCCESS = 'pldt/expertise/shortlist/success'

export class ShortlistExpertise extends BaseAction implements Action {
	public readonly type = SHORTLIST_EXPERTISE_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

type REMOVE_SHORTLIST_EXPERTISE_SUCCESS = 'pldt/expertise/removeShortlist/success'
export const REMOVE_SHORTLIST_EXPERTISE_SUCCESS: REMOVE_SHORTLIST_EXPERTISE_SUCCESS =
	'pldt/expertise/removeShortlist/success'

export class RemoveShortlistExpertise extends BaseAction implements Action {
	public readonly type = REMOVE_SHORTLIST_EXPERTISE_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Favourite expertise success
 */
type FAVOURITE_EXPERTISE_SUCCESS = 'pldt/expertise/favourite/success'
export const FAVOURITE_EXPERTISE_SUCCESS: FAVOURITE_EXPERTISE_SUCCESS = 'pldt/expertise/favourite/success'

export class FavouriteExpertise extends BaseAction implements Action {
	public readonly type = FAVOURITE_EXPERTISE_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

type REMOVE_FAVOURITE_EXPERTISE_SUCCESS = 'pldt/expertise/removeFavourite/success'
export const REMOVE_FAVOURITE_EXPERTISE_SUCCESS: REMOVE_FAVOURITE_EXPERTISE_SUCCESS =
	'pldt/expertise/removeFavourite/success'

export class RemoveFavouriteExpertise extends BaseAction implements Action {
	public readonly type = REMOVE_FAVOURITE_EXPERTISE_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Authenticate
 */
type AUTHENTICATE_USER_SUCCESS = 'pldt/authenticate/success'
type AUTHENTICATE_USER_PENDING = 'pldt/authenticate/pending'
type AUTHENTICATE_USER_FAILED = 'pldt/authenticate/failed'
export const AUTHENTICATE_USER_SUCCESS: AUTHENTICATE_USER_SUCCESS = 'pldt/authenticate/success'
export const AUTHENTICATE_USER_PENDING: AUTHENTICATE_USER_PENDING = 'pldt/authenticate/pending'
export const AUTHENTICATE_USER_FAILED: AUTHENTICATE_USER_FAILED = 'pldt/authenticate/failed'

export class AuthenticateUserPending extends BaseAction implements Action {
	public readonly type = AUTHENTICATE_USER_PENDING
}

export class AuthenticateUserSuccess extends BaseAction implements Action {
	public readonly type = AUTHENTICATE_USER_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

export class AuthenticateUserFailed extends BaseAction implements Action {
	public readonly type = AUTHENTICATE_USER_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Create project
 */
type CREATE_PROJECT_SUCCESS = 'pldt/project/create/success'
export const CREATE_PROJECT_SUCCESS: CREATE_PROJECT_SUCCESS = 'pldt/project/create/success'

export class CreateProjectSuccess extends BaseAction implements Action {
	public readonly type = CREATE_PROJECT_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Projects
 */
type FETCH_PROJECTS_SUCCESS = 'pldt/projects/fetch/success'
type FETCH_PROJECTS_PENDING = 'pldt/projects/fetch/pending'
type FETCH_PROJECTS_FAILED = 'pldt/projects/fetch/failed'
export const FETCH_PROJECTS_SUCCESS: FETCH_PROJECTS_SUCCESS = 'pldt/projects/fetch/success'
export const FETCH_PROJECTS_PENDING: FETCH_PROJECTS_PENDING = 'pldt/projects/fetch/pending'
export const FETCH_PROJECTS_FAILED: FETCH_PROJECTS_FAILED = 'pldt/projects/fetch/failed'

export class FetchProjectsPending extends BaseAction implements Action {
	public readonly type = FETCH_PROJECTS_PENDING
}

export class FetchProjectsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PROJECTS_SUCCESS
	
	constructor(public payload: ReadonlyArray<ProjectRecord>) {
		super()
	}
}

export class FetchProjectsFailed extends BaseAction implements Action {
	public readonly type = FETCH_PROJECTS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching project detail
 */
type FETCH_PROJECT_DETAIL_SUCCESS = 'pldt/projectDetail/fetch/success'
type FETCH_PROJECT_DETAIL_PENDING = 'pldt/projectDetail/fetch/pending'
type FETCH_PROJECT_DETAIL_FAILED = 'pldt/projectDetail/fetch/failed'
export const FETCH_PROJECT_DETAIL_SUCCESS: FETCH_PROJECT_DETAIL_SUCCESS = 'pldt/projectDetail/fetch/success'
export const FETCH_PROJECT_DETAIL_PENDING: FETCH_PROJECT_DETAIL_PENDING = 'pldt/projectDetail/fetch/pending'
export const FETCH_PROJECT_DETAIL_FAILED: FETCH_PROJECT_DETAIL_FAILED = 'pldt/projectDetail/fetch/failed'

export class FetchProjectDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_PENDING
}

export class FetchProjectDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_SUCCESS
	
	constructor(public payload: ProjectRecord) {
		super()
	}
}

export class FetchProjectDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Update project detail
 */
type UPDATE_PROJECT_DETAIL_SUCCESS = 'pldt/projectDetail/update/success'
type UPDATE_PROJECT_DETAIL_PENDING = 'pldt/projectDetail/update/pending'
type UPDATE_PROJECT_DETAIL_FAILED = 'pldt/projectDetail/update/failed'
export const UPDATE_PROJECT_DETAIL_SUCCESS: UPDATE_PROJECT_DETAIL_SUCCESS = 'pldt/projectDetail/update/success'
export const UPDATE_PROJECT_DETAIL_PENDING: UPDATE_PROJECT_DETAIL_PENDING = 'pldt/projectDetail/update/pending'
export const UPDATE_PROJECT_DETAIL_FAILED: UPDATE_PROJECT_DETAIL_FAILED = 'pldt/projectDetail/update/failed'

export class UpdateProjectDetailPending extends BaseAction implements Action {
	public readonly type = UPDATE_PROJECT_DETAIL_PENDING
}

export class UpdateProjectDetailSuccess extends BaseAction implements Action {
	public readonly type = UPDATE_PROJECT_DETAIL_SUCCESS
	
	constructor(public payload: ProjectRecord) {
		super()
	}
}

export class UpdateProjectDetailFailed extends BaseAction implements Action {
	public readonly type = UPDATE_PROJECT_DETAIL_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching project detail user data
 */
type FETCH_PROJECT_DETAIL_USER_DATA_SUCCESS = 'pldt/projectDetailUserData/fetch/success'
type FETCH_PROJECT_DETAIL_USER_DATA_PENDING = 'pldt/projectDetailUserData/fetch/pending'
type FETCH_PROJECT_DETAIL_USER_DATA_FAILED = 'pldt/projectDetailUserData/fetch/failed'
export const FETCH_PROJECT_DETAIL_USER_DATA_SUCCESS: FETCH_PROJECT_DETAIL_USER_DATA_SUCCESS =
	'pldt/projectDetailUserData/fetch/success'
export const FETCH_PROJECT_DETAIL_USER_DATA_PENDING: FETCH_PROJECT_DETAIL_USER_DATA_PENDING =
	'pldt/projectDetailUserData/fetch/pending'
export const FETCH_PROJECT_DETAIL_USER_DATA_FAILED: FETCH_PROJECT_DETAIL_USER_DATA_FAILED =
	'pldt/projectDetailUserData/fetch/failed'

export class FetchProjectDetailUserDataPending extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_USER_DATA_PENDING
}

export class FetchProjectDetailUserDataSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_USER_DATA_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

export class FetchProjectDetailUserDataFailed extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_USER_DATA_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching project detail ongoing expertise
 */
type FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_SUCCESS = 'pldt/projectDetailOngoingExpertise/fetch/success'
type FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_PENDING = 'pldt/projectDetailOngoingExpertise/fetch/pending'
type FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_FAILED = 'pldt/projectDetailOngoingExpertise/fetch/failed'
export const FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_SUCCESS: FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_SUCCESS =
	'pldt/projectDetailOngoingExpertise/fetch/success'
export const FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_PENDING: FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_PENDING =
	'pldt/projectDetailOngoingExpertise/fetch/pending'
export const FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_FAILED: FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_FAILED =
	'pldt/projectDetailOngoingExpertise/fetch/failed'

export class FetchProjectDetailOngoingExpertisePending extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_PENDING
}

export class FetchProjectDetailOngoingExpertiseSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

export class FetchProjectDetailOngoingExpertiseFailed extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching project detail ongoing expertise
 */
type FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_SUCCESS = 'pldt/projectDetailOngoingBusinessNeeds/fetch/success'
type FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_PENDING = 'pldt/projectDetailOngoingBusinessNeeds/fetch/pending'
type FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_FAILED = 'pldt/projectDetailOngoingBusinessNeeds/fetch/failed'
export const FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_SUCCESS: FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_SUCCESS =
	'pldt/projectDetailOngoingBusinessNeeds/fetch/success'
export const FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_PENDING: FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_PENDING =
	'pldt/projectDetailOngoingBusinessNeeds/fetch/pending'
export const FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_FAILED: FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_FAILED =
	'pldt/projectDetailOngoingBusinessNeeds/fetch/failed'

export class FetchProjectDetailOngoingBusinessNeedsPending extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_PENDING
}

export class FetchProjectDetailOngoingBusinessNeedsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

export class FetchProjectDetailOngoingBusinessNeedsFailed extends BaseAction implements Action {
	public readonly type = FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching expertise detail
 */
type FETCH_EXPERTISE_DETAIL_SUCCESS = 'pldt/expertiseDetail/fetch/success'
type FETCH_EXPERTISE_DETAIL_PENDING = 'pldt/expertiseDetail/fetch/pending'
type FETCH_EXPERTISE_DETAIL_FAILED = 'pldt/expertiseDetail/fetch/failed'
export const FETCH_EXPERTISE_DETAIL_SUCCESS: FETCH_EXPERTISE_DETAIL_SUCCESS =
	'pldt/expertiseDetail/fetch/success'
export const FETCH_EXPERTISE_DETAIL_PENDING: FETCH_EXPERTISE_DETAIL_PENDING =
	'pldt/expertiseDetail/fetch/pending'
export const FETCH_EXPERTISE_DETAIL_FAILED: FETCH_EXPERTISE_DETAIL_FAILED =
	'pldt/expertiseDetail/fetch/failed'

export class FetchExpertiseDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_DETAIL_PENDING
}

export class FetchExpertiseDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_DETAIL_SUCCESS
	
	constructor(public payload: ExpertiseRecord) {
		super()
	}
}

export class FetchExpertiseDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_DETAIL_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Updating expertise order detail
 */
type UPDATE_EXPERTISE_SUCCESS = 'pldt/expertise/update/success'
type UPDATE_EXPERTISE_PENDING = 'pldt/expertise/update/pending'
type UPDATE_EXPERTISE_FAILED = 'pldt/expertise/update/failed'
export const UPDATE_EXPERTISE_SUCCESS: UPDATE_EXPERTISE_SUCCESS = 'pldt/expertise/update/success'
export const UPDATE_EXPERTISE_PENDING: UPDATE_EXPERTISE_PENDING = 'pldt/expertise/update/pending'
export const UPDATE_EXPERTISE_FAILED: UPDATE_EXPERTISE_FAILED = 'pldt/expertise/update/failed'

export class UpdateExpertisePending extends BaseAction implements Action {
	public readonly type = UPDATE_EXPERTISE_PENDING
}

export class UpdateExpertiseSuccess extends BaseAction implements Action {
	public readonly type = UPDATE_EXPERTISE_SUCCESS
	
	constructor(public payload: ExpertiseRecord) {
		super()
	}
}

export class UpdateExpertiseFailed extends BaseAction implements Action {
	public readonly type = UPDATE_EXPERTISE_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching expertise order detail
 */
type FETCH_EXPERTISE_ORDER_SUCCESS = 'pldt/expertiseOrder/fetch/success'
type FETCH_EXPERTISE_ORDER_PENDING = 'pldt/expertiseOrder/fetch/pending'
type FETCH_EXPERTISE_ORDER_FAILED = 'pldt/expertiseOrder/fetch/failed'
export const FETCH_EXPERTISE_ORDER_SUCCESS: FETCH_EXPERTISE_ORDER_SUCCESS = 'pldt/expertiseOrder/fetch/success'
export const FETCH_EXPERTISE_ORDER_PENDING: FETCH_EXPERTISE_ORDER_PENDING = 'pldt/expertiseOrder/fetch/pending'
export const FETCH_EXPERTISE_ORDER_FAILED: FETCH_EXPERTISE_ORDER_FAILED = 'pldt/expertiseOrder/fetch/failed'

export class FetchExpertiseOrderPending extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_PENDING
}

export class FetchExpertiseOrderSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_SUCCESS
	
	constructor(public payload: ExpertiseOrderRecord) {
		super()
	}
}

export class FetchExpertiseOrderFailed extends BaseAction implements Action {
	public readonly type = FETCH_EXPERTISE_ORDER_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Creating expertise order detail
 */
type CREATE_EXPERTISE_ORDER_SUCCESS = 'pldt/expertiseOrder/create/success'
type CREATE_EXPERTISE_ORDER_PENDING = 'pldt/expertiseOrder/create/pending'
type CREATE_EXPERTISE_ORDER_FAILED = 'pldt/expertiseOrder/create/failed'
export const CREATE_EXPERTISE_ORDER_SUCCESS: CREATE_EXPERTISE_ORDER_SUCCESS = 'pldt/expertiseOrder/create/success'
export const CREATE_EXPERTISE_ORDER_PENDING: CREATE_EXPERTISE_ORDER_PENDING = 'pldt/expertiseOrder/create/pending'
export const CREATE_EXPERTISE_ORDER_FAILED: CREATE_EXPERTISE_ORDER_FAILED = 'pldt/expertiseOrder/create/failed'

export class CreateExpertiseOrderPending extends BaseAction implements Action {
	public readonly type = CREATE_EXPERTISE_ORDER_PENDING
}

export class CreateExpertiseOrderSuccess extends BaseAction implements Action {
	public readonly type = CREATE_EXPERTISE_ORDER_SUCCESS
	
	constructor(public payload: ExpertiseOrderRecord) {
		super()
	}
}

export class CreateExpertiseOrderFailed extends BaseAction implements Action {
	public readonly type = CREATE_EXPERTISE_ORDER_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Updating expertise order detail
 */
type UPDATE_EXPERTISE_ORDER_SUCCESS = 'pldt/expertiseOrder/update/success'
type UPDATE_EXPERTISE_ORDER_PENDING = 'pldt/expertiseOrder/update/pending'
type UPDATE_EXPERTISE_ORDER_FAILED = 'pldt/expertiseOrder/update/failed'
export const UPDATE_EXPERTISE_ORDER_SUCCESS: UPDATE_EXPERTISE_ORDER_SUCCESS = 'pldt/expertiseOrder/update/success'
export const UPDATE_EXPERTISE_ORDER_PENDING: UPDATE_EXPERTISE_ORDER_PENDING = 'pldt/expertiseOrder/update/pending'
export const UPDATE_EXPERTISE_ORDER_FAILED: UPDATE_EXPERTISE_ORDER_FAILED = 'pldt/expertiseOrder/update/failed'

export class UpdateExpertiseOrderPending extends BaseAction implements Action {
	public readonly type = UPDATE_EXPERTISE_ORDER_PENDING
}

export class UpdateExpertiseOrderSuccess extends BaseAction implements Action {
	public readonly type = UPDATE_EXPERTISE_ORDER_SUCCESS
	
	constructor(public payload: ExpertiseOrderRecord) {
		super()
	}
}

export class UpdateExpertiseOrderFailed extends BaseAction implements Action {
	public readonly type = UPDATE_EXPERTISE_ORDER_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch testimonials
 */
type FETCH_TESTIMONIALS_SUCCESS = 'pldt/testimonials/fetch/success'
type FETCH_TESTIMONIALS_PENDING = 'pldt/testimonials/fetch/pending'
type FETCH_TESTIMONIALS_FAILED = 'pldt/testimonials/fetch/failed'
export const FETCH_TESTIMONIALS_SUCCESS: FETCH_TESTIMONIALS_SUCCESS = 'pldt/testimonials/fetch/success'
export const FETCH_TESTIMONIALS_PENDING: FETCH_TESTIMONIALS_PENDING = 'pldt/testimonials/fetch/pending'
export const FETCH_TESTIMONIALS_FAILED: FETCH_TESTIMONIALS_FAILED = 'pldt/testimonials/fetch/failed'

export class FetchTestimonialsPending extends BaseAction implements Action {
	public readonly type = FETCH_TESTIMONIALS_PENDING
}

export class FetchTestimonialsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_TESTIMONIALS_SUCCESS
	
	constructor(public payload: ReadonlyArray<TestimonialRecord>) {
		super()
	}
}

export class FetchTestimonialsFailed extends BaseAction implements Action {
	public readonly type = FETCH_TESTIMONIALS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetch page
 */
type FETCH_PAGE_SUCCESS = 'pldt/page/fetch/success'
type FETCH_PAGE_PENDING = 'pldt/page/fetch/pending'
type FETCH_PAGE_FAILED = 'pldt/page/fetch/failed'
export const FETCH_PAGE_SUCCESS: FETCH_PAGE_SUCCESS = 'pldt/page/fetch/success'
export const FETCH_PAGE_PENDING: FETCH_PAGE_PENDING = 'pldt/page/fetch/pending'
export const FETCH_PAGE_FAILED: FETCH_PAGE_FAILED = 'pldt/page/fetch/failed'

export class FetchPagePending extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_PENDING
}

export class FetchPageSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_SUCCESS
	
	constructor(public payload: PageRecord) {
		super()
	}
}

export class FetchPageFailed extends BaseAction implements Action {
	public readonly type = FETCH_PAGE_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Contests
 */
type FETCH_CONTESTS_SUCCESS = 'pldt/contests/fetch/success'
type FETCH_CONTESTS_PENDING = 'pldt/contests/fetch/pending'
type FETCH_CONTESTS_FAILED = 'pldt/contests/fetch/failed'
export const FETCH_CONTESTS_SUCCESS: FETCH_CONTESTS_SUCCESS = 'pldt/contests/fetch/success'
export const FETCH_CONTESTS_PENDING: FETCH_CONTESTS_PENDING = 'pldt/contests/fetch/pending'
export const FETCH_CONTESTS_FAILED: FETCH_CONTESTS_FAILED = 'pldt/contests/fetch/failed'

export class FetchContestsPending extends BaseAction implements Action {
	public readonly type = FETCH_CONTESTS_PENDING
}

export class FetchContestsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_CONTESTS_SUCCESS
	
	constructor(public payload: ReadonlyArray<ContestRecord>) {
		super()
	}
}

export class FetchContestsFailed extends BaseAction implements Action {
	public readonly type = FETCH_CONTESTS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Add entrie
 */
type ADD_ENTRIE_SUCCESS = 'pldt/project/create/success'
export const ADD_ENTRIE_SUCCESS: ADD_ENTRIE_SUCCESS = 'pldt/project/create/success'

export class AddEntrieSuccess extends BaseAction implements Action {
	public readonly type = ADD_ENTRIE_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Entrie
 */
type FETCH_ENTRIE_SUCCESS = 'pldt/entrie/fetch/success'
type FETCH_ENTRIE_PENDING = 'pldt/entrie/fetch/pending'
type FETCH_ENTRIE_FAILED = 'pldt/entrie/fetch/failed'
export const FETCH_ENTRIE_SUCCESS: FETCH_ENTRIE_SUCCESS = 'pldt/entrie/fetch/success'
export const FETCH_ENTRIE_PENDING: FETCH_ENTRIE_PENDING = 'pldt/entrie/fetch/pending'
export const FETCH_ENTRIE_FAILED: FETCH_ENTRIE_FAILED = 'pldt/entrie/fetch/failed'

export class FetchFetchPending extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIE_PENDING
}

export class FetchFetchSuccess extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIE_SUCCESS
	
	constructor(public payload: ReadonlyArray<any>) {
		super()
	}
}

export class FetchFetchFailed extends BaseAction implements Action {
	public readonly type = FETCH_ENTRIE_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching contest detail
 */
type FETCH_CONTEST_DETAIL_SUCCESS = 'pldt/contestDetail/fetch/success'
type FETCH_CONTEST_DETAIL_PENDING = 'pldt/contestDetail/fetch/pending'
type FETCH_CONTEST_DETAIL_FAILED = 'pldt/contestDetail/fetch/failed'
export const FETCH_CONTEST_DETAIL_SUCCESS: FETCH_CONTEST_DETAIL_SUCCESS = 'pldt/contestDetail/fetch/success'
export const FETCH_CONTEST_DETAIL_PENDING: FETCH_CONTEST_DETAIL_PENDING = 'pldt/contestDetail/fetch/pending'
export const FETCH_CONTEST_DETAIL_FAILED: FETCH_CONTEST_DETAIL_FAILED = 'pldt/contestDetail/fetch/failed'

export class FetchContestDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_CONTEST_DETAIL_PENDING
}

export class FetchContestDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_CONTEST_DETAIL_SUCCESS
	
	constructor(public payload: ContestRecord) {
		super()
	}
}

export class FetchContestDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_CONTEST_DETAIL_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching contest detail
 */
type FETCH_ENTRY_DETAIL_SUCCESS = 'pldt/entrytDetail/fetch/success'
type FETCH_ENTRY_DETAIL_PENDING = 'pldt/entrytDetail/fetch/pending'
type FETCH_ENTRY_DETAIL_FAILED = 'pldt/entrytDetail/fetch/failed'
export const FETCH_ENTRY_DETAIL_SUCCESS: FETCH_ENTRY_DETAIL_SUCCESS = 'pldt/entrytDetail/fetch/success'
export const FETCH_ENTRY_DETAIL_PENDING: FETCH_ENTRY_DETAIL_PENDING = 'pldt/entrytDetail/fetch/pending'
export const FETCH_ENTRY_DETAIL_FAILED: FETCH_ENTRY_DETAIL_FAILED = 'pldt/entrytDetail/fetch/failed'

export class FetchEntryDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_ENTRY_DETAIL_PENDING
}

export class FetchEntryDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_ENTRY_DETAIL_SUCCESS
	
	constructor(public payload: ContestEntryRecord) {
		super()
	}
}

export class FetchEntryDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_ENTRY_DETAIL_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching contest member entries
 */
type FETCH_CONTEST_MEMBER_ENTRIES_SUCCESS = 'pldt/contestMemberEntries/fetch/success'
type FETCH_CONTEST_MEMBER_ENTRIES_PENDING = 'pldt/contestMemberEntries/fetch/pending'
type FETCH_CONTEST_MEMBER_ENTRIES_FAILED = 'pldt/contestMemberEntries/fetch/failed'
export const FETCH_CONTEST_MEMBER_ENTRIES_SUCCESS:
	FETCH_CONTEST_MEMBER_ENTRIES_SUCCESS = 'pldt/contestMemberEntries/fetch/success'
export const FETCH_CONTEST_MEMBER_ENTRIES_PENDING:
	FETCH_CONTEST_MEMBER_ENTRIES_PENDING = 'pldt/contestMemberEntries/fetch/pending'
export const FETCH_CONTEST_MEMBER_ENTRIES_FAILED:
	FETCH_CONTEST_MEMBER_ENTRIES_FAILED = 'pldt/contestMemberEntries/fetch/failed'

export class FetchContestMemberEntriesPending extends BaseAction implements Action {
	public readonly type = FETCH_CONTEST_MEMBER_ENTRIES_PENDING
}

export class FetchContestMemberEntriesSuccess extends BaseAction implements Action {
	public readonly type = FETCH_CONTEST_MEMBER_ENTRIES_SUCCESS
	
	constructor(public payload: ContestEntryRecord[]) {
		super()
	}
}

export class FetchContestMemberEntriesFailed extends BaseAction implements Action {
	public readonly type = FETCH_CONTEST_MEMBER_ENTRIES_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Investors Data
 */
type FETCH_INVESTORS_DATA_SUCCESS = 'pldt/investorsData/fetch/success'
type FETCH_INVESTORS_DATA_PENDING = 'pldt/investorsData/fetch/pending'
type FETCH_INVESTORS_DATA_FAILED = 'pldt/investorsData/fetch/failed'
export const FETCH_INVESTORS_DATA_SUCCESS: FETCH_INVESTORS_DATA_SUCCESS = 'pldt/investorsData/fetch/success'
export const FETCH_INVESTORS_DATA_PENDING: FETCH_INVESTORS_DATA_PENDING = 'pldt/investorsData/fetch/pending'
export const FETCH_INVESTORS_DATA_FAILED: FETCH_INVESTORS_DATA_FAILED = 'pldt/investorsData/fetch/failed'

export class FetchInvestorsDataPending extends BaseAction implements Action {
	public readonly type = FETCH_INVESTORS_DATA_PENDING
}

export class FetchInvestorsDataSuccess extends BaseAction implements Action {
	public readonly type = FETCH_INVESTORS_DATA_SUCCESS
	
	constructor(public payload: InvestorsDataRecord) {
		super()
	}
}

export class FetchInvestorsDataFailed extends BaseAction implements Action {
	public readonly type = FETCH_INVESTORS_DATA_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/*
 * Fetching Profile
 */
type FETCH_PROFILE_SUCCESS = 'pldt/profile/fetch/success'
type FETCH_PROFILE_PENDING = 'pldt/profile/fetch/pending'
type FETCH_PROFILE_FAILED = 'pldt/profile/fetch/failed'
export const FETCH_PROFILE_SUCCESS: FETCH_PROFILE_SUCCESS = 'pldt/profile/fetch/success'
export const FETCH_PROFILE_PENDING: FETCH_PROFILE_PENDING = 'pldt/profile/fetch/pending'
export const FETCH_PROFILE_FAILED: FETCH_PROFILE_FAILED = 'pldt/profile/fetch/failed'

export class FetchProfilePending extends BaseAction implements Action {
	public readonly type = FETCH_PROFILE_PENDING
}

export class FetchProfileSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PROFILE_SUCCESS
	
	constructor(public payload: ProfileRecord) {
		super()
	}
}

export class FetchProfileFailed extends BaseAction implements Action {
	public readonly type = FETCH_PROFILE_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Events Data
 */
type FETCH_EVENTS_SUCCESS = 'pldt/events/fetch/success'
type FETCH_EVENTS_PENDING = 'pldt/events/fetch/pending'
type FETCH_EVENTS_FAILED = 'pldt/events/fetch/failed'
export const FETCH_EVENTS_SUCCESS: FETCH_EVENTS_SUCCESS = 'pldt/events/fetch/success'
export const FETCH_EVENTS_PENDING: FETCH_EVENTS_PENDING = 'pldt/events/fetch/pending'
export const FETCH_EVENTS_FAILED: FETCH_EVENTS_FAILED = 'pldt/events/fetch/failed'

export class FetchEventsPending extends BaseAction implements Action {
	public readonly type = FETCH_EVENTS_PENDING
}

export class FetchEventsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EVENTS_SUCCESS
	
	constructor(public payload: ReadonlyArray<EventsRecord>) {
		super()
	}
}

export class FetchEventsFailed extends BaseAction implements Action {
	public readonly type = FETCH_EVENTS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching project detail
 */
type FETCH_EVENT_DETAIL_SUCCESS = 'pldt/eventDetail/fetch/success'
type FETCH_EVENT_DETAIL_PENDING = 'pldt/eventDetail/fetch/pending'
type FETCH_EVENT_DETAIL_FAILED = 'pldt/eventDetail/fetch/failed'
export const FETCH_EVENT_DETAIL_SUCCESS: FETCH_EVENT_DETAIL_SUCCESS = 'pldt/eventDetail/fetch/success'
export const FETCH_EVENT_DETAIL_PENDING: FETCH_EVENT_DETAIL_PENDING = 'pldt/eventDetail/fetch/pending'
export const FETCH_EVENT_DETAIL_FAILED: FETCH_EVENT_DETAIL_FAILED = 'pldt/eventDetail/fetch/failed'

export class FetchEventDetailPending extends BaseAction implements Action {
	public readonly type = FETCH_EVENT_DETAIL_PENDING
}

export class FetchEventDetailSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EVENT_DETAIL_SUCCESS
	
	constructor(public payload: EventsRecord) {
		super()
	}
}

export class FetchEventDetailFailed extends BaseAction implements Action {
	public readonly type = FETCH_EVENT_DETAIL_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching project detail
 */
type FETCH_INVITATION_DATA_SUCCESS = 'pldt/invitationData/fetch/success'
type FETCH_INVITATION_DATA_PENDING = 'pldt/invitationData/fetch/pending'
type FETCH_INVITATION_DATA_FAILED = 'pldt/invitationData/fetch/failed'
export const FETCH_INVITATION_DATA_SUCCESS: FETCH_INVITATION_DATA_SUCCESS = 'pldt/invitationData/fetch/success'
export const FETCH_INVITATION_DATA_PENDING: FETCH_INVITATION_DATA_PENDING = 'pldt/invitationData/fetch/pending'
export const FETCH_INVITATION_DATA_FAILED: FETCH_INVITATION_DATA_FAILED = 'pldt/invitationData/fetch/failed'

export class FetchInvitationDataPending extends BaseAction implements Action {
	public readonly type = FETCH_INVITATION_DATA_PENDING
}

export class FetchInvitationDataSuccess extends BaseAction implements Action {
	public readonly type = FETCH_INVITATION_DATA_SUCCESS
	
	constructor(public payload: InvitationDataRecord) {
		super()
	}
}

export class FetchInvitationDataFailed extends BaseAction implements Action {
	public readonly type = FETCH_INVITATION_DATA_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Request-Access-Observer
 */
type REQUEST_ACCESS_OBSERVER_SUCCESS = 'pldt/requestaccessobserver/success'
type REQUEST_ACCESS_OBSERVER_PENDING = 'pldt/requestaccessobserver/pending'
type REQUEST_ACCESS_OBSERVER_FAILED = 'pldt/requestaccessobserver/failed'
export const REQUEST_ACCESS_OBSERVER_SUCCESS: REQUEST_ACCESS_OBSERVER_SUCCESS = 'pldt/requestaccessobserver/success'
export const REQUEST_ACCESS_OBSERVER_PENDING: REQUEST_ACCESS_OBSERVER_PENDING = 'pldt/requestaccessobserver/pending'
export const REQUEST_ACCESS_OBSERVER_FAILED: REQUEST_ACCESS_OBSERVER_FAILED = 'pldt/requestaccessobserver/failed'

export class RequestAccessObserverPending extends BaseAction implements Action {
	public readonly type = REQUEST_ACCESS_OBSERVER_PENDING
}

export class RequestAccessObserverSuccess extends BaseAction implements Action {
	public readonly type = REQUEST_ACCESS_OBSERVER_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

export class RequestAccessObserverFailed extends BaseAction implements Action {
	public readonly type = REQUEST_ACCESS_OBSERVER_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching email settings
 */
type FETCH_EMAIL_SETTINGS_SUCCESS = 'pldt/emailSettings/fetch/success'
type FETCH_EMAIL_SETTINGS_PENDING = 'pldt/emailSettings/fetch/pending'
type FETCH_EMAIL_SETTINGS_FAILED = 'pldt/emailSettings/fetch/failed'
export const FETCH_EMAIL_SETTINGS_SUCCESS: FETCH_EMAIL_SETTINGS_SUCCESS = 'pldt/emailSettings/fetch/success'
export const FETCH_EMAIL_SETTINGS_PENDING: FETCH_EMAIL_SETTINGS_PENDING = 'pldt/emailSettings/fetch/pending'
export const FETCH_EMAIL_SETTINGS_FAILED: FETCH_EMAIL_SETTINGS_FAILED = 'pldt/emailSettings/fetch/failed'

export class FetchEmailSettingsPending extends BaseAction implements Action {
	public readonly type = FETCH_EMAIL_SETTINGS_PENDING
}

export class FetchEmailSettingsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_EMAIL_SETTINGS_SUCCESS
	
	constructor(public payload: EmailSettingsRecord) {
		super()
	}
}

export class FetchEmailSettingsFailed extends BaseAction implements Action {
	public readonly type = FETCH_EMAIL_SETTINGS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Update Email Settings
 */
type UPDATE_EMAIL_SETTINGS_SUCCESS = 'pldt/emailSettings/update/success'
type UPDATE_EMAIL_SETTINGS_PENDING = 'pldt/emailSettings/update/pending'
type UPDATE_EMAIL_SETTINGS_FAILED = 'pldt/emailSettings/update/failed'
export const UPDATE_EMAIL_SETTINGS_SUCCESS: UPDATE_EMAIL_SETTINGS_SUCCESS = 'pldt/emailSettings/update/success'
export const UPDATE_EMAIL_SETTINGS_PENDING: UPDATE_EMAIL_SETTINGS_PENDING = 'pldt/emailSettings/update/pending'
export const UPDATE_EMAIL_SETTINGS_FAILED: UPDATE_EMAIL_SETTINGS_FAILED = 'pldt/emailSettings/update/failed'

export class UpdateEmailSettingsPending extends BaseAction implements Action {
	public readonly type = UPDATE_EMAIL_SETTINGS_PENDING
}

export class UpdateEmailSettingsSuccess extends BaseAction implements Action {
	public readonly type = UPDATE_EMAIL_SETTINGS_SUCCESS
	
	constructor(public payload: EmailSettingsRecord) {
		super()
	}
}

export class UpdateEmailSettingsFailed extends BaseAction implements Action {
	public readonly type = UPDATE_EMAIL_SETTINGS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching contest LeaderBoard
 */
type FETCH_LEADERBOARD_SUCCESS = 'pldt/leaderboard/fetch/success'
type FETCH_LEADERBOARD_PENDING = 'pldt/leaderboard/fetch/pending'
type FETCH_LEADERBOARD_FAILED = 'pldt/leaderboard/fetch/failed'
export const FETCH_LEADERBOARD_SUCCESS: FETCH_LEADERBOARD_SUCCESS = 'pldt/leaderboard/fetch/success'
export const FETCH_LEADERBOARD_PENDING: FETCH_LEADERBOARD_PENDING = 'pldt/leaderboard/fetch/pending'
export const FETCH_LEADERBOARD_FAILED: FETCH_LEADERBOARD_FAILED = 'pldt/leaderboard/fetch/failed'

export class FetchLeaderBoardPending extends BaseAction implements Action {
	public readonly type = FETCH_LEADERBOARD_PENDING
}

export class FetchLeaderBoardSuccess extends BaseAction implements Action {
	public readonly type = FETCH_LEADERBOARD_SUCCESS
	
	constructor(public payload: any) {
		super()
	}
}

export class FetchLeaderBoardFailed extends BaseAction implements Action {
	public readonly type = FETCH_LEADERBOARD_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching All Convertation Data
 */
type FETCH_ALL_CONVERTATIONS_SUCCESS = 'pldt/allconvertations/fetch/success'
type FETCH_ALL_CONVERTATIONS_PENDING = 'pldt/allconvertations/fetch/pending'
type FETCH_ALL_CONVERTATIONS_FAILED = 'pldt/allconvertations/fetch/failed'
export const FETCH_ALL_CONVERTATIONS_SUCCESS: FETCH_ALL_CONVERTATIONS_SUCCESS = 'pldt/allconvertations/fetch/success'
export const FETCH_ALL_CONVERTATIONS_PENDING: FETCH_ALL_CONVERTATIONS_PENDING = 'pldt/allconvertations/fetch/pending'
export const FETCH_ALL_CONVERTATIONS_FAILED: FETCH_ALL_CONVERTATIONS_FAILED = 'pldt/allconvertations/fetch/failed'

export class FetchAllConvertationsPending extends BaseAction implements Action {
	public readonly type = FETCH_ALL_CONVERTATIONS_PENDING
}

export class FetchAllConvertationsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_ALL_CONVERTATIONS_SUCCESS
	
	constructor(public payload: ReadonlyArray<any>) {
		super()
	}
}

export class FetchAllConvertationsFailed extends BaseAction implements Action {
	public readonly type = FETCH_ALL_CONVERTATIONS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching All single Convertation Data
 */
type FETCH_ALL_SINGLE_CONVERTATIONS_SUCCESS = 'pldt/allsingleconvertations/fetch/success'
type FETCH_ALL_SINGLE_CONVERTATIONS_PENDING = 'pldt/allsingleconvertations/fetch/pending'
type FETCH_ALL_SINGLE_CONVERTATIONS_FAILED = 'pldt/allsingleconvertations/fetch/failed'
export const FETCH_ALL_SINGLE_CONVERTATIONS_SUCCESS:
	FETCH_ALL_SINGLE_CONVERTATIONS_SUCCESS = 'pldt/allsingleconvertations/fetch/success'
export const FETCH_ALL_SINGLE_CONVERTATIONS_PENDING:
	FETCH_ALL_SINGLE_CONVERTATIONS_PENDING = 'pldt/allsingleconvertations/fetch/pending'
export const FETCH_ALL_SINGLE_CONVERTATIONS_FAILED:
	FETCH_ALL_SINGLE_CONVERTATIONS_FAILED = 'pldt/allsingleconvertations/fetch/failed'

export class FetchAllSingleConvertationsPending extends BaseAction implements Action {
	public readonly type = FETCH_ALL_SINGLE_CONVERTATIONS_PENDING
}

export class FetchAllSingleConvertationsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_ALL_SINGLE_CONVERTATIONS_SUCCESS
	
	constructor(public payload: ReadonlyArray<any>) {
		super()
	}
}

export class FetchAllSingleConvertationsFailed extends BaseAction implements Action {
	public readonly type = FETCH_ALL_SINGLE_CONVERTATIONS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Expertise
 */
type FETCH_MY_EXPERTISE_SUCCESS = 'pldt/my-expertise/fetch/success'
type FETCH_MY_EXPERTISE_PENDING = 'pldt/my-expertise/fetch/pending'
type FETCH_MY_EXPERTISE_FAILED = 'pldt/my-expertise/fetch/failed'
export const FETCH_MY_EXPERTISE_SUCCESS: FETCH_MY_EXPERTISE_SUCCESS = 'pldt/my-expertise/fetch/success'
export const FETCH_MY_EXPERTISE_PENDING: FETCH_MY_EXPERTISE_PENDING = 'pldt/my-expertise/fetch/pending'
export const FETCH_MY_EXPERTISE_FAILED: FETCH_MY_EXPERTISE_FAILED = 'pldt/my-expertise/fetch/failed'

export class FetchMyExpertisePending extends BaseAction implements Action {
	public readonly type = FETCH_MY_EXPERTISE_PENDING
}

export class FetchMyExpertiseSuccess extends BaseAction implements Action {
	public readonly type = FETCH_MY_EXPERTISE_SUCCESS
	
	constructor(public payload: ReadonlyArray<ExpertiseRecord>) {
		super()
	}
}

export class FetchMyExpertiseFailed extends BaseAction implements Action {
	public readonly type = FETCH_MY_EXPERTISE_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Expertise
 */
type FETCH_USER_TRANSACTIONS_SUCCESS = 'pldt/user/transactions/fetch/success'
type FETCH_USER_TRANSACTIONS_PENDING = 'pldt/user/transactions/fetch/pending'
type FETCH_USER_TRANSACTIONS_FAILED = 'pldt/user/transactions/fetch/failed'
export const FETCH_USER_TRANSACTIONS_SUCCESS: FETCH_USER_TRANSACTIONS_SUCCESS = 'pldt/user/transactions/fetch/success'
export const FETCH_USER_TRANSACTIONS_PENDING: FETCH_USER_TRANSACTIONS_PENDING = 'pldt/user/transactions/fetch/pending'
export const FETCH_USER_TRANSACTIONS_FAILED: FETCH_USER_TRANSACTIONS_FAILED = 'pldt/user/transactions/fetch/failed'

export class FetchUserTransactionsPending extends BaseAction implements Action {
	public readonly type = FETCH_USER_TRANSACTIONS_PENDING
}

export class FetchUserTransactionsSuccess extends BaseAction implements Action {
	public readonly type = FETCH_USER_TRANSACTIONS_SUCCESS
	
	constructor(public payload: UserAssetsRecord) {
		super()
	}
}

export class FetchUserTransactionsFailed extends BaseAction implements Action {
	public readonly type = FETCH_USER_TRANSACTIONS_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

/**
 * Fetching Communities
 */
type FETCH_COMMUNITY_SUCCESS = 'pldt/user/community/fetch/success'
type FETCH_COMMUNITY_PENDING = 'pldt/user/community/fetch/pending'
type FETCH_COMMUNITY_FAILED = 'pldt/user/community/fetch/failed'
export const FETCH_COMMUNITY_SUCCESS: FETCH_COMMUNITY_SUCCESS = 'pldt/user/community/fetch/success'
export const FETCH_COMMUNITY_PENDING: FETCH_COMMUNITY_PENDING = 'pldt/user/community/fetch/pending'
export const FETCH_COMMUNITY_FAILED: FETCH_COMMUNITY_FAILED = 'pldt/user/community/fetch/failed'

export class FetchCommunityPending extends BaseAction implements Action {
	public readonly type = FETCH_COMMUNITY_PENDING
}

export class FetchCommunitySuccess extends BaseAction implements Action {
	public readonly type = FETCH_COMMUNITY_SUCCESS
	
	constructor(public payload: CommunityRecord) {
		super()
	}
}

export class FetchCommunityFailed extends BaseAction implements Action {
	public readonly type = FETCH_COMMUNITY_FAILED
	
	constructor(public payload: any) {
		super()
	}
}


/*
 * Fetching Profile
 */
type FETCH_PUBLIC_PROFILE_SUCCESS = 'pldt/publicProfile/fetch/success'
type FETCH_PUBLIC_PROFILE_PENDING = 'pldt/publicProfile/fetch/pending'
type FETCH_PUBLIC_PROFILE_FAILED = 'pldt/publicProfile/fetch/failed'
export const FETCH_PUBLIC_PROFILE_SUCCESS: FETCH_PUBLIC_PROFILE_SUCCESS = 'pldt/publicProfile/fetch/success'
export const FETCH_PUBLIC_PROFILE_PENDING: FETCH_PUBLIC_PROFILE_PENDING = 'pldt/publicProfile/fetch/pending'
export const FETCH_PUBLIC_PROFILE_FAILED: FETCH_PUBLIC_PROFILE_FAILED = 'pldt/publicProfile/fetch/failed'

export class FetchPublicProfilePending extends BaseAction implements Action {
	public readonly type = FETCH_PUBLIC_PROFILE_PENDING
}

export class FetchPublicProfileSuccess extends BaseAction implements Action {
	public readonly type = FETCH_PUBLIC_PROFILE_SUCCESS
	
	constructor(public payload: PublicProfileRecord) {
		super()
	}
}

export class FetchPublicProfileFailed extends BaseAction implements Action {
	public readonly type = FETCH_PUBLIC_PROFILE_FAILED
	
	constructor(public payload: any) {
		super()
	}
}

export type Actions =
	| FetchCategoriesPending
	| FetchCategoriesSuccess
	| FetchCategoriesFailed
	| SetActiveCategory
	| FetchQuestionnairePending
	| FetchQuestionnaireSuccess
	| FetchQuestionnaireFailed
	| UpdateQuestionValue
	| UpdateLockStatus
	| FetchUserDataPending
	| FetchUserDataSuccess
	| FetchUserDataFailed
	| FetchUserSessionPending
	| FetchUserSessionSuccess
	| FetchUserSessionFailed
	| SaveUserDataSuccess
	| FetchExpertisePending
	| FetchExpertiseSuccess
	| FetchExpertiseFailed
	| FetchBusinessNeedsPending
	| FetchBusinessNeedsSuccess
	| FetchBusinessNeedsFailed
	| ToggleSuggestedExpertise
	| SetActiveExpertise
	| FavouriteExpertise
	| RemoveFavouriteExpertise
	| ShortlistExpertise
	| RemoveShortlistExpertise
	| AuthenticateUserSuccess
	| AuthenticateUserPending
	| AuthenticateUserFailed
	| CreateProjectSuccess
	| FetchProjectsPending
	| FetchProjectsSuccess
	| FetchProjectsFailed
	| FetchProjectDetailPending
	| FetchProjectDetailSuccess
	| FetchProjectDetailFailed
	| FetchExpertiseDetailPending
	| FetchExpertiseDetailSuccess
	| FetchExpertiseDetailFailed
	| FetchExpertiseOrderPending
	| FetchExpertiseOrderSuccess
	| FetchExpertiseOrderFailed
	| CreateExpertiseOrderPending
	| CreateExpertiseOrderSuccess
	| CreateExpertiseOrderFailed
	| UpdateExpertiseOrderPending
	| UpdateExpertiseOrderSuccess
	| UpdateExpertiseOrderFailed
	| FetchProjectDetailUserDataPending
	| FetchProjectDetailUserDataSuccess
	| FetchProjectDetailUserDataFailed
	| FetchProjectDetailOngoingExpertisePending
	| FetchProjectDetailOngoingExpertiseSuccess
	| FetchProjectDetailOngoingExpertiseFailed
	| FetchProjectDetailOngoingBusinessNeedsPending
	| FetchProjectDetailOngoingBusinessNeedsSuccess
	| FetchProjectDetailOngoingBusinessNeedsFailed
	| UpdateProjectDetailPending
	| UpdateProjectDetailSuccess
	| UpdateProjectDetailFailed
	| FetchTestimonialsPending
	| FetchTestimonialsSuccess
	| FetchTestimonialsFailed
	| FetchContestsPending
	| FetchContestsSuccess
	| FetchContestsFailed
	| FetchContestDetailPending
	| FetchContestDetailSuccess
	| FetchContestDetailFailed
	| FetchEntryDetailPending
	| FetchEntryDetailSuccess
	| FetchEntryDetailFailed
	| FetchContestMemberEntriesPending
	| FetchContestMemberEntriesSuccess
	| FetchContestMemberEntriesFailed
	| AddEntrieSuccess
	| FetchFetchPending
	| FetchFetchSuccess
	| FetchFetchFailed
	| FetchInvestorsDataPending
	| FetchInvestorsDataSuccess
	| FetchInvestorsDataFailed
	| FetchEventsPending
	| FetchEventsSuccess
	| FetchEventsFailed
	| FetchEventDetailPending
	| FetchEventDetailSuccess
	| FetchEventDetailFailed
	| FetchProfilePending
	| FetchProfileSuccess
	| FetchProfileFailed
	| FetchInvitationDataPending
	| FetchInvitationDataSuccess
	| FetchInvitationDataFailed
	| RequestAccessObserverPending
	| RequestAccessObserverSuccess
	| RequestAccessObserverFailed
	| FetchPagePending
	| FetchPageSuccess
	| FetchPageFailed
	| FetchEmailSettingsPending
	| FetchEmailSettingsSuccess
	| FetchEmailSettingsFailed
	| UpdateEmailSettingsPending
	| UpdateEmailSettingsSuccess
	| UpdateEmailSettingsFailed
	| FetchAllConvertationsPending
	| FetchAllConvertationsSuccess
	| FetchAllConvertationsFailed
	| FetchMyExpertisePending
	| FetchMyExpertiseSuccess
	| FetchMyExpertiseFailed
	| FetchLeaderBoardPending
	| FetchLeaderBoardSuccess
	| FetchLeaderBoardFailed
	| FetchUserTransactionsPending
	| FetchUserTransactionsSuccess
	| FetchUserTransactionsFailed
	| FetchCommunityPending
	| FetchCommunitySuccess
	| FetchCommunityFailed
	| FetchPublicProfilePending
	| FetchPublicProfileSuccess
	| FetchPublicProfileFailed
