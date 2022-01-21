import http from '../utils/httpService'

import {
	FetchBusinessNeedsFailed,
	FetchBusinessNeedsPending,
	FetchBusinessNeedsSuccess
} from '../constants/action-types'
import { BUSINESS_NEEDS_API, BUSINESS_NEEDS_CATEGORY_API } from '../constants/api'
import { BusinessNeedsRecord } from '../constants/models'

/**
 * Fetch the businessNeeds and dispatch the data
 */
export const fetchBusinessNeeds = (category: string, tags: string[]) => (dispatch: any) => {
	dispatch(new FetchBusinessNeedsPending().toObject())
	
	return doFetchBusinessNeeds(category, tags)
		.then((businessNeedsList: ReadonlyArray<BusinessNeedsRecord>) =>
			dispatch(new FetchBusinessNeedsSuccess(businessNeedsList).toObject()))
		.catch((error: any) => dispatch(new FetchBusinessNeedsFailed(error).toObject()))
}

/**
 * Underlying method to fetch the businessNeeds records from the plat-api using axios
 *
 * @returns {Promise<[BusinessNeedsRecord]>}
 */
export const doFetchBusinessNeeds = (category: string, tags: string[]): Promise<[BusinessNeedsRecord]> => {
	return new Promise<[BusinessNeedsRecord]>((resolve: any, reject: any) => {
		http.get(category ? `${BUSINESS_NEEDS_CATEGORY_API}/${category}` : BUSINESS_NEEDS_API,
			{params: {tags: tags.join(',')}})
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}