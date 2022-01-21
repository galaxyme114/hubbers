import {
	Actions,
	ActionTypeStates,
	FETCH_ALL_CONVERTATIONS_FAILED,
	FETCH_ALL_CONVERTATIONS_PENDING,
	FETCH_ALL_CONVERTATIONS_SUCCESS
} from '../constants/action-types'
import { MessageRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	AllConversationList: ReadonlyArray<MessageRecord>
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	AllConversationList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_ALL_CONVERTATIONS_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_ALL_CONVERTATIONS_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, AllConversationList: action.payload}
			break
		case FETCH_ALL_CONVERTATIONS_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}