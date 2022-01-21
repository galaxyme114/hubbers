import axios from 'axios'

import {
	FetchExpertiseFailed,
	FetchExpertisePending,
	FetchExpertiseSuccess,
	ToggleSuggestedExpertise
} from '../constants/action-types'
import { EXPERTISE_API, EXPERTISE_CATEGORY_API, EXPERTISE_IDS_API } from '../constants/api'
import { ExpertiseRecord } from '../constants/models'

/**
 * Fetch the expertise and dispatch the data
 *
 */
export const fetchExpertise = (category: string, tags: string[]) => (dispatch: any) => {
	dispatch(new FetchExpertisePending().toObject())
	
	return doFetchExpertise(category, tags)
		.then((expertiseList: ReadonlyArray<ExpertiseRecord>) =>
			dispatch(new FetchExpertiseSuccess(expertiseList).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseFailed(error).toObject()))
}

/**
 * Underlying method to fetch the expertise records from the plat-api using axios
 *
 * @returns {Promise<[ExpertiseRecord]>}
 */
export const doFetchExpertise = (category: string, tags: string[]): Promise<[ExpertiseRecord]> => {
	return new Promise<[ExpertiseRecord]>((resolve: any, reject: any) => {
		axios.get(category ? `${EXPERTISE_CATEGORY_API}/${category}` : EXPERTISE_API,
			{params: {tags: tags.join(',')}})
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}

export const doFetchExpertiseByIds = (ids: string[]): Promise<[ExpertiseRecord]> => {
	return new Promise<[ExpertiseRecord]>((resolve: any, reject: any) => {
		axios.get(EXPERTISE_IDS_API, {params: {ids: ids.join(',')}})
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}

/**
 * Toggle the display of suggested expertise
 *
 */
export const toggleSuggestedExpertise = (isSelected: boolean) => (dispatch: any) => {
	dispatch(new ToggleSuggestedExpertise(isSelected).toObject())
}