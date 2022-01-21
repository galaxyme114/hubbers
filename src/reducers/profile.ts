import {
	Actions,
	ActionTypeStates,
	FETCH_PROFILE_FAILED,
	FETCH_PROFILE_PENDING,
	FETCH_PROFILE_SUCCESS
} from '../constants/action-types'
import { ProfileRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates,
	profile: ProfileRecord,
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	profile: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_PROFILE_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PROFILE_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, profile: action.payload}
			break
		case FETCH_PROFILE_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}