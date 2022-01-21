import {
	Actions,
	ActionTypeStates,
	FETCH_TESTIMONIALS_FAILED,
	FETCH_TESTIMONIALS_PENDING,
	FETCH_TESTIMONIALS_SUCCESS
} from '../constants/action-types'
import { TestimonialRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	testimonialsList: ReadonlyArray<TestimonialRecord>
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	testimonialsList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_TESTIMONIALS_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_TESTIMONIALS_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, testimonialsList: action.payload}
			break
		case FETCH_TESTIMONIALS_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}