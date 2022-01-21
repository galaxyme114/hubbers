import {
	Actions,
	ActionTypeStates,
	CREATE_EXPERTISE_ORDER_SUCCESS,
	FETCH_EXPERTISE_DETAIL_FAILED,
	FETCH_EXPERTISE_DETAIL_PENDING,
	FETCH_EXPERTISE_DETAIL_SUCCESS,
	FETCH_EXPERTISE_ORDER_FAILED,
	FETCH_EXPERTISE_ORDER_PENDING,
	FETCH_EXPERTISE_ORDER_SUCCESS,
	UPDATE_EXPERTISE_ORDER_SUCCESS
} from '../constants/action-types'
import { ExpertiseOrderRecord, ExpertiseRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	orderStatus: ActionTypeStates
	expertise: ExpertiseRecord
	expertiseOrder: ExpertiseOrderRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	orderStatus: ActionTypeStates.INPROGRESS,
	expertise: null,
	expertiseOrder: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_EXPERTISE_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_DETAIL_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, expertise: action.payload}
			break
		case FETCH_EXPERTISE_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_EXPERTISE_ORDER_PENDING:
			state = {...state, orderStatus: ActionTypeStates.INPROGRESS}
			break
		case FETCH_EXPERTISE_ORDER_SUCCESS:
			state = {...state, orderStatus: ActionTypeStates.SUCCESS, expertiseOrder: action.payload}
			break
		case FETCH_EXPERTISE_ORDER_FAILED:
			state = {...state, orderStatus: ActionTypeStates.FAILED, error: action.payload}
			break
		case CREATE_EXPERTISE_ORDER_SUCCESS:
			state = {...state, orderStatus: ActionTypeStates.SUCCESS, expertiseOrder: action.payload}
			break
		case UPDATE_EXPERTISE_ORDER_SUCCESS:
			state = {...state, orderStatus: ActionTypeStates.SUCCESS, expertiseOrder: action.payload}
			break
	}
	
	return state
}