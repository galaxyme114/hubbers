import {
	FetchInvestorsDataFailed,
	FetchInvestorsDataPending,
	FetchInvestorsDataSuccess,
	FetchUserTransactionsFailed,
	FetchUserTransactionsPending,
	FetchUserTransactionsSuccess
} from '../constants/action-types'
import { INVESTORS_DATA_API, USER_TRANSACTIONS_API } from '../constants/api'
import { InvestorsDataRecord, TransactionRecord, UserAssetsRecord } from '../constants/models'
import http from '../utils/httpService'

/**
 * Fetch all grab a share investor public data
 */
export const fetchInvestorsData = () => (dispatch: any) => {
	dispatch(new FetchInvestorsDataPending().toObject())
	
	return doFetchInvestorsData()
		.then((investorsData: InvestorsDataRecord) => dispatch(new FetchInvestorsDataSuccess(investorsData).toObject()))
		.catch((error: any) => dispatch(new FetchInvestorsDataFailed(error).toObject()))
}

/**
 * Helper function to fetch all investor public data
 *
 * @returns {Promise<ReadonlyArray<InvestorsDataRecord>>}
 */
const doFetchInvestorsData = () => {
	return new Promise<InvestorsDataRecord>((resolve, reject) => {
		http.get(`${INVESTORS_DATA_API}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch all grab a share investor public data
 */
export const fetchUserTransactions = () => (dispatch: any) => {
	dispatch(new FetchUserTransactionsPending().toObject())
	
	return doFetchUserTransactions()
		.then((userAssets: UserAssetsRecord) => dispatch(new FetchUserTransactionsSuccess(userAssets).toObject()))
		.catch((error: any) => dispatch(new FetchUserTransactionsFailed(error).toObject()))
}

/**
 * Helper function to fetch all investor public data
 *
 * @returns {Promise<ReadonlyArray<TransactionRecord[]>>}
 */
const doFetchUserTransactions = () => {
	return new Promise<UserAssetsRecord>((resolve, reject) => {
		http.get(`${USER_TRANSACTIONS_API}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}