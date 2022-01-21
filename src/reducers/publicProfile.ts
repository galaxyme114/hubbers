import {
	Actions,
	ActionTypeStates,
	FETCH_PUBLIC_PROFILE_FAILED,
	FETCH_PUBLIC_PROFILE_PENDING,
	FETCH_PUBLIC_PROFILE_SUCCESS
} from '../constants/action-types'
import { PublicProfileRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates,
	publicProfile: PublicProfileRecord,
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	publicProfile: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_PUBLIC_PROFILE_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PUBLIC_PROFILE_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, publicProfile: action.payload}
			break
		case FETCH_PUBLIC_PROFILE_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}