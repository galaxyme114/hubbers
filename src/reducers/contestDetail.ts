import {
	Actions,
	ActionTypeStates,
	FETCH_CONTEST_DETAIL_FAILED,
	FETCH_CONTEST_DETAIL_PENDING,
	FETCH_CONTEST_DETAIL_SUCCESS,
	FETCH_CONTEST_MEMBER_ENTRIES_FAILED,
	FETCH_CONTEST_MEMBER_ENTRIES_PENDING,
	FETCH_CONTEST_MEMBER_ENTRIES_SUCCESS
} from '../constants/action-types'
import { ContestMemberType } from '../constants/enums'
import { ContestEntryRecord, ContestRecord } from '../constants/models'

export interface State {
	status: ActionTypeStates
	contest: ContestRecord
	memberType: ContestMemberType
	entriesStatus: ActionTypeStates
	myEntries: ContestEntryRecord[]
	leaderboard: any
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	contest: null,
	memberType: ContestMemberType.NONE,
	entriesStatus: ActionTypeStates.INPROGRESS,
	myEntries: [],
	leaderboard: null,
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_CONTEST_DETAIL_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_CONTEST_DETAIL_SUCCESS:
			const contest = action.payload
			let memberTypeKey = 'none' as keyof typeof ContestMemberType
			
			if (contest.memberApplication) {
				memberTypeKey = (contest.memberApplication.isPending ?
					`PENDING_${contest.memberApplication.type.toUpperCase()}` :
					contest.memberApplication.type.toUpperCase()) as keyof typeof ContestMemberType
			}
			
			state = {...state, status: ActionTypeStates.SUCCESS, contest, memberType: ContestMemberType[memberTypeKey]}
			break
		case FETCH_CONTEST_DETAIL_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_CONTEST_MEMBER_ENTRIES_PENDING:
			state = {...state, entriesStatus: ActionTypeStates.INPROGRESS}
			break
		case FETCH_CONTEST_MEMBER_ENTRIES_SUCCESS:
			state = {...state, entriesStatus: ActionTypeStates.SUCCESS, myEntries: action.payload}
			break
		case FETCH_CONTEST_MEMBER_ENTRIES_FAILED:
			state = {...state, entriesStatus: ActionTypeStates.FAILED, myEntries: [], error: action.payload}
			break
	}
	
	return state
}