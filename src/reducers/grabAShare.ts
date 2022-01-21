import {
	Actions,
	ActionTypeStates,
	FETCH_INVESTORS_DATA_FAILED,
	FETCH_INVESTORS_DATA_PENDING,
	FETCH_INVESTORS_DATA_SUCCESS,
	FETCH_USER_TRANSACTIONS_FAILED,
	FETCH_USER_TRANSACTIONS_PENDING,
	FETCH_USER_TRANSACTIONS_SUCCESS
} from '../constants/action-types'
import { InvestorsDataRecord, KPIRecord, UserAssetsRecord } from '../constants/models'

export interface State extends InvestorsDataRecord {
	status: ActionTypeStates
	userTransactionsStatus: ActionTypeStates
	userTransactions: UserAssetsRecord
	shareValue: number
	totalShares: number
	kpi: KPIRecord
	error: any
}

const initialState: State = {
	status: ActionTypeStates.INPROGRESS,
	userTransactionsStatus: ActionTypeStates.INPROGRESS,
	userTransactions: null,
	shareValue: 0.56,
	totalShares: 10000000,
	kpi: null,
	investors: [],
	observers: [],
	notices: [],
	legalDocs: [],
	error: null
}

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case FETCH_INVESTORS_DATA_PENDING:
			state = {...state, status: ActionTypeStates.INPROGRESS}
			break
		case FETCH_INVESTORS_DATA_SUCCESS:
			state = {...state, status: ActionTypeStates.SUCCESS, ...action.payload}
			break
		case FETCH_INVESTORS_DATA_FAILED:
			state = {...state, status: ActionTypeStates.FAILED, error: action.payload}
			break
		case FETCH_USER_TRANSACTIONS_PENDING:
			state = {...state, userTransactionsStatus: ActionTypeStates.INPROGRESS}
			break
		case FETCH_USER_TRANSACTIONS_SUCCESS:
			state = {...state, userTransactionsStatus: ActionTypeStates.SUCCESS, userTransactions: action.payload}
			break
		case FETCH_USER_TRANSACTIONS_FAILED:
			state = {...state, userTransactionsStatus: ActionTypeStates.FAILED, error: action.payload}
			break
	}
	
	return state
}