import {
	Actions,
	ActionTypeStates,
	FETCH_BUSINESS_NEEDS_FAILED,
	FETCH_BUSINESS_NEEDS_PENDING,
	FETCH_BUSINESS_NEEDS_SUCCESS,
	FETCH_EXPERTISE_FAILED,
	FETCH_EXPERTISE_PENDING,
	FETCH_EXPERTISE_SUCCESS
} from '../constants/action-types'
import { BusinessNeedsRecord, ExpertiseRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	expertiseList: ReadonlyArray<ExpertiseRecord>
	businessNeedsList: ReadonlyArray<BusinessNeedsRecord>
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	expertiseList: [],
	businessNeedsList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERTISE_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expertiseList: action.payload}
			break
		case FETCH_EXPERTISE_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_BUSINESS_NEEDS_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_BUSINESS_NEEDS_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, businessNeedsList: action.payload}
			break
		case FETCH_BUSINESS_NEEDS_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}