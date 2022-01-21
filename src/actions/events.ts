import {
	FetchEventDetailFailed,
	FetchEventDetailPending,
	FetchEventDetailSuccess,
	FetchEventsFailed,
	FetchEventsPending,
	FetchEventsSuccess
} from '../constants/action-types'
import { EVENTS_API } from '../constants/api'
import { EventsRecord } from '../constants/models'
import http from '../utils/httpService'

/**
 * Fetch Projects
 */
export const fetchEvents = () => (dispatch: any) => {
	dispatch(new FetchEventsPending().toObject())
	
	return doFetchEvents()
		.then((events: ReadonlyArray<EventsRecord>) => dispatch(new FetchEventsSuccess(events).toObject()))
		.catch((error: any) => dispatch(new FetchEventsFailed(error).toObject()))
}

/**
 * Helper function to fetch a list of Events
 *
 * @returns {Promise<ReadonlyArray<EventsRecord>>}
 */
const doFetchEvents = () => {
	return new Promise<ReadonlyArray<EventsRecord>>((resolve: any, reject: any) => {
		return http.get(`${EVENTS_API}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch a single project
 */
export const fetchEventDetail = (shortId: string) => (dispatch: any) => {
	dispatch(new FetchEventDetailPending().toObject())
	
	return doFetchEventDetail(shortId)
		.then((event: EventsRecord) => dispatch(new FetchEventDetailSuccess(event).toObject()))
		.catch((error: any) => dispatch(new FetchEventDetailFailed(error).toObject()))
}

/**
 * Helper function to fetch a single project
 *
 * @returns {Promise<any>}
 */
const doFetchEventDetail = (shortId: string) => {
	return new Promise<EventsRecord>((resolve, reject) => {
		http.get(`${EVENTS_API}/${shortId}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update Event Attendance
 */
export const updateEventAttendance = (id: string, attending: boolean) => (dispatch: any) => {
	return doUpdateEventAttendance(id, attending)
		.then((event: EventsRecord) => dispatch(new FetchEventDetailSuccess(event).toObject()))
}

/**
 * Helper function to update event attendance for the user
 *
 * @returns {Promise<any>}
 */
const doUpdateEventAttendance = (id: string, attending: boolean) => {
	return new Promise<EventsRecord>((resolve, reject) => {
		http.put(`${EVENTS_API}/${id}/attend`, {attending: attending ? 'true' : 'false'})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}