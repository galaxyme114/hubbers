import {
	FetchCommunityFailed,
	FetchCommunityPending,
	FetchCommunitySuccess
} from '../constants/action-types'
import { COMMUNITY_API } from '../constants/api'
import { CommunityRecord } from '../constants/models'
import http from '../utils/httpService'

/**
 * Fetch Communities
 */
export const fetchCommunity = () => (dispatch: any) => {
	dispatch(new FetchCommunityPending().toObject())
	
	return doFetchCommunity()
		.then((community: CommunityRecord) => dispatch(new FetchCommunitySuccess(community).toObject()))
		.catch((error: any) => dispatch(new FetchCommunityFailed(error).toObject()))
}

/**
 * Helper function to fetch a list of Communities
 *
 * @returns {Promise<CommunityRecord>}
 */
const doFetchCommunity = () => {
	return new Promise<CommunityRecord>((resolve: any, reject: any) => {
		return http.get(`${COMMUNITY_API}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

