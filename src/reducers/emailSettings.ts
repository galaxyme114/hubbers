import {
	Actions,
	ActionTypeStates,
	FETCH_EMAIL_SETTINGS_FAILED,
	FETCH_EMAIL_SETTINGS_PENDING,
	FETCH_EMAIL_SETTINGS_SUCCESS
} from '../constants/action-types'
import { EmailSettingsRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	emailSettings: EmailSettingsRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	emailSettings: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EMAIL_SETTINGS_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EMAIL_SETTINGS_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, emailSettings: action.payload}
			break
		case FETCH_EMAIL_SETTINGS_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}