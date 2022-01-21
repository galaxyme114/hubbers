import http from '../utils/httpService'

import { FetchEntryDetailFailed, FetchEntryDetailPending, FetchEntryDetailSuccess } from '../constants/action-types'
import { CONTEST_ENTRY_API } from '../constants/api'
import { ContestEntryRatingRecord, ContestEntryRecord } from '../constants/models'

/**
 * Fetch the entry and dispatch the data
 */
export const fetchEntryDetail = (entryId: string) => (dispatch: any) => {
	dispatch(new FetchEntryDetailPending().toObject())

	return doFetchEntryDetail(entryId)
		.then((entry: ContestEntryRecord) => dispatch(new FetchEntryDetailSuccess(entry).toObject()))
		.catch((error: any) => dispatch(new FetchEntryDetailFailed(error).toObject()))
}

/**
 * Underlying method to fetch the entry from the API
 *
 * @returns {Promise<ContestEntryRecord>}
 */
export const doFetchEntryDetail = (entryId: string): Promise<ContestEntryRecord> => {
	return new Promise<ContestEntryRecord>((resolve: any, reject: any) => {
		http.get(`${CONTEST_ENTRY_API}/${entryId}`)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Save the entry and dispatch the data
 */
export const saveEntryDetail = (entryId: string, updatedEntry: ContestEntryRecord) => (dispatch: any) => {
	return doSaveEntryDetail(entryId, updatedEntry)
		.then(() => doFetchEntryDetail(entryId))
		.then((entry: ContestEntryRecord) => dispatch(new FetchEntryDetailSuccess(entry).toObject()))}

/**
 * Underlying method to save the entry from the API
 *
 * @returns {Promise<ContestEntryRecord>}
 */
export const doSaveEntryDetail = (entryId: string, updatedEntry: ContestEntryRecord): Promise<ContestEntryRecord> => {
	return new Promise<ContestEntryRecord>((resolve: any, reject: any) => {
		http.patch(`${CONTEST_ENTRY_API}/${entryId}`, updatedEntry)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Save the entry and dispatch the data
 */
export const saveEntryRating = (
	contestId: string, entryId: string, rating: ContestEntryRatingRecord) => (dispatch: any) => {
	return doSaveEntryRating(entryId, rating)
		.then(() => doFetchEntryDetail(entryId))
		.then((entry: ContestEntryRecord) => dispatch(new FetchEntryDetailSuccess(entry).toObject()))
}

/**
 * Underlying method to save the entry from the API
 *
 * @returns {Promise<ContestEntryRecord>}
 */
export const doSaveEntryRating = (entryId: string, rating: ContestEntryRatingRecord): Promise<ContestEntryRecord> => {
	return new Promise<ContestEntryRecord>((resolve: any, reject: any) => {
		http.request({
			method: rating._id ? 'PATCH' : 'PUT',
			url: rating._id ? `${CONTEST_ENTRY_API}/${entryId}/ratings/${rating._id}` :
				`${CONTEST_ENTRY_API}/${entryId}/ratings/`,
			data: rating
		}).then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}