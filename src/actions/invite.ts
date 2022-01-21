import {
	FetchInvitationDataFailed,
	FetchInvitationDataPending,
	FetchInvitationDataSuccess
} from '../constants/action-types'
import { INVITE_API } from '../constants/api'
import { InvitationDataRecord } from '../constants/models'
import http from '../utils/httpService'

/**
 * Fetch all grab a share investor public data
 */
export const fetchInvitationData = (role: string, code: string) => (dispatch: any) => {
	dispatch(new FetchInvitationDataPending().toObject())
	
	return doFetchInvitationData(role, code)
		.then((investorsData: InvitationDataRecord) => dispatch(new FetchInvitationDataSuccess(investorsData).toObject()))
		.catch((error: any) => dispatch(new FetchInvitationDataFailed(error).toObject()))
}

/**
 * Helper function to verify an invitation for a given user role
 *
 * @param role
 * @param code
 * @returns {Response}
 */
const doFetchInvitationData = (role: string, code: string) => {
	return new Promise<InvitationDataRecord>((resolve: any, reject: any) => {
		http.get(INVITE_API.replace('{role}', role).replace('{code}', code))
			.then(response => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}
