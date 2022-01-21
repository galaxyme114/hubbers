import {
	Actions,
	ActionTypeStates,
	FETCH_MY_EXPERTISE_FAILED,
	FETCH_MY_EXPERTISE_PENDING,
	FETCH_MY_EXPERTISE_SUCCESS
} from '../constants/action-types'
import { ExpertiseRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates,
	myExpertise: ReadonlyArray<ExpertiseRecord>
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	myExpertise: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_MY_EXPERTISE_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_MY_EXPERTISE_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, myExpertise: action.payload}
			break
		case FETCH_MY_EXPERTISE_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}