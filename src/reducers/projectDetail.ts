import {
	Actions,
	ActionTypeStates,
	FETCH_PROJECT_DETAIL_FAILED,
	FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_FAILED,
	FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_PENDING,
	FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_SUCCESS,
	FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_FAILED,
	FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_PENDING,
	FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_SUCCESS,
	FETCH_PROJECT_DETAIL_PENDING,
	FETCH_PROJECT_DETAIL_SUCCESS,
	FETCH_PROJECT_DETAIL_USER_DATA_FAILED,
	FETCH_PROJECT_DETAIL_USER_DATA_PENDING,
	FETCH_PROJECT_DETAIL_USER_DATA_SUCCESS,
	SAVE_USER_DATA_SUCCESS,
	UPDATE_PROJECT_DETAIL_SUCCESS
} from '../constants/action-types'
import { BusinessNeedsRecord, ProjectRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	userDataStatus: ActionTypeStates
	ongoingBusinessNeedsStatus: ActionTypeStates
	ongoingExpertiseStatus: ActionTypeStates
	project: ProjectRecord
	userData: any
	ongoingExpertise: string[]
	ongoingBusinessNeeds: BusinessNeedsRecord[]
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	userDataStatus: ActionTypeStates.INPROGRESS,
	ongoingBusinessNeedsStatus: ActionTypeStates.INPROGRESS,
	ongoingExpertiseStatus: ActionTypeStates.INPROGRESS,
	project: null,
	userData: null,
	ongoingExpertise: [],
	ongoingBusinessNeeds: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_PROJECT_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PROJECT_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, project: action.payload}
			break
		case FETCH_PROJECT_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case UPDATE_PROJECT_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, project: action.payload}
			break
		case FETCH_PROJECT_DETAIL_USER_DATA_PENDING:
			state = {...state, userDataStatus: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PROJECT_DETAIL_USER_DATA_SUCCESS:
			state = {...state, userDataStatus: ActionTypeStates.SUCCESS, userData: action.payload}
			break
		case FETCH_PROJECT_DETAIL_USER_DATA_FAILED:
			state = {...state, userDataStatus: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_PENDING:
			state = {...state, ongoingExpertiseStatus: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_SUCCESS:
			state = {...state, ongoingExpertiseStatus: ActionTypeStates.SUCCESS, ongoingExpertise: action.payload}
			break
		case FETCH_PROJECT_DETAIL_ONGOING_EXPERTISE_FAILED:
			state = {...state, ongoingExpertiseStatus: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_PENDING:
			state = {...state, ongoingBusinessNeedsStatus: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_SUCCESS:
			state = {...state, ongoingBusinessNeedsStatus: ActionTypeStates.SUCCESS, ongoingBusinessNeeds: action.payload}
			break
		case FETCH_PROJECT_DETAIL_ONGOING_BUSINESS_NEEDS_FAILED:
			state = {...state, ongoingBusinessNeedsStatus: ActionTypeStates.FAILED, error: action.payload}
			break
		case SAVE_USER_DATA_SUCCESS:
			if (state.project && (state.project.pldt_session === action.payload.sessionKey)) {
				state = {...state, userDataStatus: ActionTypeStates.SUCCESS, userData: action.payload.userData}
			}
			break
	}
	
	return state
}