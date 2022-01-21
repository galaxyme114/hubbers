import {
	Actions,
	ActionTypeStates,
	FETCH_EVENT_DETAIL_FAILED,
	FETCH_EVENT_DETAIL_PENDING,
	FETCH_EVENT_DETAIL_SUCCESS
} from '../constants/action-types'
import { EventsRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	event: EventsRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	event: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EVENT_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EVENT_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, event: action.payload}
			break
		case FETCH_EVENT_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}