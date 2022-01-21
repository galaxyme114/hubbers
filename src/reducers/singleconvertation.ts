import {
	Actions,
	ActionTypeStates,
	FETCH_EVENTS_FAILED,
	FETCH_EVENTS_PENDING,
	FETCH_EVENTS_SUCCESS
} from '../constants/action-types'
import { EventsRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	eventsList: ReadonlyArray<EventsRecord>
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	eventsList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EVENTS_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EVENTS_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, eventsList: action.payload}
			break
		case FETCH_EVENTS_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}