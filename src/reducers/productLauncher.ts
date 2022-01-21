import {
	Actions,
	ActionTypeStates,
	FETCH_CATEGORIES_FAILED,
	FETCH_CATEGORIES_PENDING,
	FETCH_CATEGORIES_SUCCESS,
	SET_ACTIVE_CATEGORY_SUCCESS,
	SET_ACTIVE_EXPERTISE_SUCCESS,
	UPDATE_LOCK_STATUS,
	UPDATE_QUESTION_VALUE_SUCCESS
} from '../constants/action-types'
import { CategoryRecord, ExpertiseRecord } from '../constants/models'

export interface State {
	isLocked: boolean,
	status: ActionTypeStates,
	activeCategory: CategoryRecord,
	activeExpertise: ExpertiseRecord,
	categories: ReadonlyArray<CategoryRecord>
	error: any
}

const initialState: State = {
	isLocked: true,
	status: ActionTypeStates.INPROGRESS,
	activeCategory: null,
	activeExpertise: null,
	categories: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_CATEGORIES_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_CATEGORIES_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, categories: action.payload}
			break
		case FETCH_CATEGORIES_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case SET_ACTIVE_CATEGORY_SUCCESS:
			state = {...state, activeCategory: action.payload}
			break
		case UPDATE_QUESTION_VALUE_SUCCESS:
			state.activeCategory.questions = state.activeCategory.questions.map(q => {
				if (q.id === action.payload.id) {
					q.value = action.payload.value
				}
				return q
			})
			
			state = {...state, activeCategory: state.activeCategory}
			break
		case UPDATE_LOCK_STATUS:
			state.isLocked = action.payload
			break
		case SET_ACTIVE_EXPERTISE_SUCCESS:
			state = {...state, activeExpertise: action.payload}
			break
	}
	
	return state
}