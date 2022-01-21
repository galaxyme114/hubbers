import {
	Actions,
	ActionTypeStates,
	FETCH_LEADERBOARD_FAILED,
	FETCH_LEADERBOARD_PENDING,
	FETCH_LEADERBOARD_SUCCESS
} from '../constants/action-types'

export interface State {
	status: ActionTypeStates
	leaderboardList: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	leaderboardList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_LEADERBOARD_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS, leaderboardList: []}
			break
		case FETCH_LEADERBOARD_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, leaderboardList: action.payload}
			break
		case FETCH_LEADERBOARD_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}