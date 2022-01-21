import { FetchPageFailed, FetchPagePending, FetchPageSuccess } from '../constants/action-types'
import { PAGE_API } from '../constants/api'
import { PageRecord } from '../constants/models'
import http from '../utils/httpService'

/**
 * Fetch all testimonials
 */
export const fetchPage = (pageSlug: string) => (dispatch: any) => {
	dispatch(new FetchPagePending().toObject())
	
	return doFetchTestimonials(pageSlug)
		.then((page: PageRecord) => dispatch(new FetchPageSuccess(page).toObject()))
		.catch((error: any) => dispatch(new FetchPageFailed(error).toObject()))
}

/**
 * Helper function to fetch a single page
 *
 * @returns {Promise<PageRecord>}
 */
const doFetchTestimonials = (pageSlug: string) => {
	return new Promise<PageRecord>((resolve, reject) => {
		http.get(`${PAGE_API}/${pageSlug}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}