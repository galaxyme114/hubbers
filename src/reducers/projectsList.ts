import {
	Actions,
	ActionTypeStates,
	FETCH_PROJECTS_FAILED,
	FETCH_PROJECTS_PENDING,
	FETCH_PROJECTS_SUCCESS
} from '../constants/action-types'
import { ProjectRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	projectsList: ReadonlyArray<ProjectRecord>
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	projectsList: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_PROJECTS_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_PROJECTS_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, projectsList: action.payload}
			break
		case FETCH_PROJECTS_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}