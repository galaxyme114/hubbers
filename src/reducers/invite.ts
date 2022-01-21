import {
	Actions,
	ActionTypeStates,
	FETCH_INVITATION_DATA_FAILED,
	FETCH_INVITATION_DATA_PENDING,
	FETCH_INVITATION_DATA_SUCCESS
} from '../constants/action-types'
import { InvitationDataRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	invitationData: InvitationDataRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	invitationData: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_INVITATION_DATA_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_INVITATION_DATA_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, invitationData: action.payload}
			break
		case FETCH_INVITATION_DATA_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}