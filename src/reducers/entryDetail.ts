import {
	Actions,
	ActionTypeStates,
	FETCH_ENTRY_DETAIL_FAILED,
	FETCH_ENTRY_DETAIL_PENDING,
	FETCH_ENTRY_DETAIL_SUCCESS
} from '../constants/action-types'
import { ContestEntryRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	entry: ContestEntryRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	entry: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_ENTRY_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS, entry: null}
			break
		case FETCH_ENTRY_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, entry: action.payload}
			break
		case FETCH_ENTRY_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}