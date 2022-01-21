import { FetchTestimonialsFailed, FetchTestimonialsPending, FetchTestimonialsSuccess } from '../constants/action-types'
import { TESTIMONIALS_API } from '../constants/api'
import { TestimonialRecord } from '../constants/models'
import http from '../utils/httpService'

/**
 * Fetch all testimonials
 */
export const fetchTestimonials = () => (dispatch: any) => {
	dispatch(new FetchTestimonialsPending().toObject())
	
	return doFetchTestimonials()
		.then((testimonials: ReadonlyArray<TestimonialRecord>) => dispatch(new FetchTestimonialsSuccess(testimonials).toObject()))
		.catch((error: any) => dispatch(new FetchTestimonialsFailed(error).toObject()))
}

/**
 * Helper function to fetch all testimonials
 *
 * @returns {Promise<ReadonlyArray<TestimonialRecord>>}
 */
const doFetchTestimonials = () => {
	return new Promise<ReadonlyArray<TestimonialRecord>>((resolve, reject) => {
		http.get(`${TESTIMONIALS_API}`, {params: {token: window.localStorage.fundator_token}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}