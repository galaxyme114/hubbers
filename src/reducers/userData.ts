import {
	Actions,
	ActionTypeStates,
	FAVOURITE_EXPERTISE_SUCCESS,
	FETCH_USER_DATA_FAILED,
	FETCH_USER_DATA_PENDING,
	FETCH_USER_DATA_SUCCESS,
	FETCH_USER_SESSION_FAILED,
	FETCH_USER_SESSION_PENDING,
	FETCH_USER_SESSION_SUCCESS,
	REMOVE_FAVOURITE_EXPERTISE_SUCCESS,
	REMOVE_SHORTLIST_EXPERTISE_SUCCESS,
	SAVE_USER_DATA_SUCCESS,
	SHORTLIST_EXPERTISE_SUCCESS
} from '../constants/action-types'
import { AnswerRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	email: '',
	sessionKey: string
	answers: ReadonlyArray<AnswerRecord>
	shortlistedExpertise: ReadonlyArray<string>
	favouriteExpertise: ReadonlyArray<string>
	displaySuggestedExpertise: boolean
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	email: null,
	sessionKey: null,
	answers: [],
	shortlistedExpertise: [],
	favouriteExpertise: [],
	displaySuggestedExpertise: true,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_USER_SESSION_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_USER_SESSION_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_USER_SESSION_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, ...action.payload}
			break
		case FETCH_USER_DATA_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_USER_DATA_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_USER_DATA_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, ...action.payload}
			break
		case SAVE_USER_DATA_SUCCESS:
			if (state.sessionKey === action.payload.sessionKey) {
				state = {...state, ...action.payload.userData}
			}
			break
		case SHORTLIST_EXPERTISE_SUCCESS:
			state = {...state, shortlistedExpertise: [...state.shortlistedExpertise, action.payload]}
			break
		case REMOVE_SHORTLIST_EXPERTISE_SUCCESS:
			state = {...state, shortlistedExpertise: state.shortlistedExpertise.filter(se => se !== action.payload)}
			break
		case FAVOURITE_EXPERTISE_SUCCESS:
			state = {...state, favouriteExpertise: [...state.favouriteExpertise, action.payload]}
			break
		case REMOVE_FAVOURITE_EXPERTISE_SUCCESS:
			state = {...state, favouriteExpertise: state.favouriteExpertise.filter(fe => fe !== action.payload)}
			break
	}
	
	return state
}