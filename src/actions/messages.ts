import {
	FetchAllConvertationsFailed,
	FetchAllConvertationsPending,
	FetchAllConvertationsSuccess,
	FetchAllSingleConvertationsFailed,
	FetchAllSingleConvertationsPending,
	FetchAllSingleConvertationsSuccess
} from '../constants/action-types'
import { CONVERSATIONS_API } from '../constants/api'
import { EventsRecord } from '../constants/models'
import http from '../utils/httpService'

/**
 * Fetch Convertations
 */
export const fetchAllConvertation = () => (dispatch: any) => {
	dispatch(new FetchAllConvertationsPending().toObject())
	
	return dofetchAllConvertations()
		.then((events: ReadonlyArray<EventsRecord>) => dispatch(new FetchAllConvertationsSuccess(events).toObject()))
		.catch((error: any) => dispatch(new FetchAllConvertationsFailed(error).toObject()))
}

/**
 * Helper function to fetch a list of Convertations
 *
 * @returns {Promise<ReadonlyArray<EventsRecord>>}
 */
const dofetchAllConvertations = () => {
	return new Promise<ReadonlyArray<EventsRecord>>((resolve: any, reject: any) => {
		return http.get(`${CONVERSATIONS_API}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch a single project
 */
export const fetchConvertationDetail = (conversationId: string) => (dispatch: any) => {
	dispatch(new FetchAllSingleConvertationsPending().toObject())
	
	return dofetchConvertationDetail(conversationId)
		.then((Convertations: any) => dispatch(new FetchAllSingleConvertationsSuccess(Convertations).toObject()))
		.catch((error: any) => dispatch(new FetchAllSingleConvertationsFailed(error).toObject()))
}

/**
 * Helper function to fetch a single project
 *
 * @returns {Promise<any>}
 */
const dofetchConvertationDetail = (conversationId: string) => {
	return new Promise<any>((resolve, reject) => {
		http.get(`${CONVERSATIONS_API}/${conversationId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to fetch a single project
 *
 * @returns {Promise<any>}
 */
export const doSendConvertationMessage = (data: any) => {
	return new Promise<any>((resolve, reject) => {
		http.post(`${CONVERSATIONS_API}/${data.conversationId}`, {message: data.message})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}