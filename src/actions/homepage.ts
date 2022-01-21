import axios from 'axios'
import http from '../utils/httpService'

import {
	FetchContestDetailFailed,
	FetchContestDetailPending,
	FetchContestDetailSuccess,
	FetchContestMemberEntriesFailed,
	FetchContestMemberEntriesPending,
	FetchContestMemberEntriesSuccess,
	FetchContestsFailed,
	FetchContestsPending,
	FetchContestsSuccess,
	FetchLeaderBoardFailed,
	FetchLeaderBoardPending,
	FetchLeaderBoardSuccess
} from '../constants/action-types'
import { ATTACHMENT_API, CONTESTS_API, ENTRIES_CONTEST_API } from '../constants/api'
import { ContestMemberType } from '../constants/enums'
import { ContestEntryRecord, ContestLeaderBoardRecord, ContestRecord } from '../constants/models'

/**
 * Fetch the contests and dispatch the data
 */
export const fetchContests = () => (dispatch: any) => {
	dispatch(new FetchContestsPending().toObject())
	
	return doFetchContests()
		.then((contests: ReadonlyArray<ContestRecord>) =>
			dispatch(new FetchContestsSuccess(contests).toObject()))
		.catch((error: any) => dispatch(new FetchContestsFailed(error).toObject()))
}

/**
 * Underlying method to fetch the contests from the API
 *
 * @returns {Promise<[ContestRecord]>}
 */
export const doFetchContests = (): Promise<[ContestRecord]> => {
	return new Promise<[ContestRecord]>((resolve: any, reject: any) => {
		axios.get(CONTESTS_API)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}

/**
 * Fetch a single contest and dispatch the data
 */
export const fetchContestDetail = (contestId: string) => (dispatch: any) => {
	dispatch(new FetchContestDetailPending().toObject())
	
	return doFetchContestDetail(contestId)
		.then((contest: ContestRecord) =>
			dispatch(new FetchContestDetailSuccess(contest).toObject()))
		.catch((error: any) => dispatch(new FetchContestDetailFailed(error).toObject()))
}

/**
 * Underlying method to fetch a single contest from the API
 *
 * @returns {Promise<ContestRecord>}
 */
export const doFetchContestDetail = (contestId: string): Promise<ContestRecord> => {
	return new Promise<ContestRecord>((resolve: any, reject: any) => {
		axios.get(`${CONTESTS_API}/${contestId}`)
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}

export const doViewContest = (contestId: string, data: any): Promise<any> => {
	return new Promise<any>((resolve: any, reject: any) => {
		axios.post(`${CONTESTS_API}/${contestId}/view`, {view: data.view})
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}
export const doLikeContest = (contestId: string, data: any): Promise<any> => {
	return new Promise<any>((resolve: any, reject: any) => {
		http.post(`${CONTESTS_API}/${contestId}/like`, {like: data.like})
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}

/**
 * Participate a contestant and dispatch the new contest data
 */
export const participateContestant = (contestId: string) => (dispatch: any) => {
	return doParticipateContestant(contestId)
		.then((contest: ContestRecord) => dispatch(new FetchContestDetailSuccess(contest).toObject()))
}

/**
 * Underlying method to participate a contestant
 *
 * @returns {Promise<ContestRecord>}
 */
export const doParticipateContestant = (contestId: string): Promise<ContestRecord> => {
	return new Promise<ContestRecord>((resolve: any, reject: any) => {
		http.post(`${CONTESTS_API}/${contestId}/participate/contestant`)
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}

/**
 * Participate a contestant and dispatch the new contest data
 */
export const participateJudge = (contestId: string) => (dispatch: any) => {
	return doParticipateJudge(contestId)
		.then((contest: ContestRecord) => dispatch(new FetchContestDetailSuccess(contest).toObject()))
}

/**
 * Underlying method to participate a judge
 *
 * @returns {Promise<ContestRecord>}
 */
export const doParticipateJudge = (contestId: string): Promise<ContestRecord> => {
	return new Promise<ContestRecord>((resolve: any, reject: any) => {
		http.post(`${CONTESTS_API}/${contestId}/participate/judge`)
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}

/**
 * Fetch a single contest and dispatch the data
 */
export const fetchContestMemberEntries =
	(contestId: string, memberType: ContestMemberType, silent?: boolean) => (dispatch: any) => {
		if (!silent) {
			dispatch(new FetchContestMemberEntriesPending().toObject())
		}
		
		return doFetchContestMemberEntries(contestId, memberType)
			.then((entries: ContestEntryRecord[]) =>
				dispatch(new FetchContestMemberEntriesSuccess(entries).toObject()))
			.catch((error: any) => {
				if (!silent) {
					dispatch(new FetchContestMemberEntriesFailed(error).toObject())
				}
			})
	}

/**
 * Helper function to fetch contest member entries
 *
 * @returns {Promise<ContestEntryRecord[]>}
 */
export const doFetchContestMemberEntries = (contestId: string, memberType: ContestMemberType) => {
	return new Promise<ContestEntryRecord[]>((resolve: any, reject: any) => {
		http.get(`${ENTRIES_CONTEST_API}/${contestId}/${memberType}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Create an entry and dispatch its data
 */
export const createEntry = (contestId: string, memberType: ContestMemberType) => (dispatch: any) => {
	return doCreateEntry(contestId)
		.then((entry: ContestEntryRecord) => doFetchContestMemberEntries(contestId, memberType))
		.then((entries: ContestEntryRecord[]) => dispatch(new FetchContestMemberEntriesSuccess(entries).toObject()))
	// .catch((error: any) => dispatch(new CreateContestEntryFailed(error).toObject()))
}

/**
 * Helper function to create a single entry
 *
 * @returns {Promise<ContestEntryRecord>}
 */
export const doCreateEntry = (contestId: string) => {
	return new Promise<ContestEntryRecord>((resolve: any, reject: any) => {
		http.post(`${ENTRIES_CONTEST_API}/${contestId}`, {
			title: '',
			descriptionDesign: '',
			descriptionFunctionality: '',
			descriptionUsability: '',
			descriptionMarketPotential: '',
			isDraft: true
		})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Create an entry and dispatch its data
 */
export const updateEntry = (
	contestId: string, entryId: string, memberType: ContestMemberType, entryData: any) => (dispatch: any) => {
	return doUpdateEntry(contestId, entryId, entryData)
		.then((entry: ContestEntryRecord) => doFetchContestMemberEntries(contestId, memberType))
		.then((entries: ContestEntryRecord[]) => dispatch(new FetchContestMemberEntriesSuccess(entries).toObject()))
}

/**
 * Helper function to update an entry
 *
 * @returns {Promise<ContestEntryRecord>}
 */
export const doUpdateEntry = (contestId: string, entryId: string, entryData: any) => {
	return new Promise<ContestEntryRecord>((resolve: any, reject: any) => {
		http.patch(`${ENTRIES_CONTEST_API}/${contestId}/${entryId}`, entryData)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

// /**
//  * Helper function to get entrie
//  *
//  * @returns {Promise<any>}
//  */
export const doUploadAttachment = (contestId: string, data: any) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(`${ENTRIES_CONTEST_API}/${contestId}`, {data})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

export interface MediaMetadata {
	dimensions?: {
		width: number
		height: number
		crop?: boolean
	},
	uploadOrientation?: number
}

export const doUploadAttachments = (file: any, entrieId: string) => {
	console.log(file)
	return new Promise((resolve: any, reject: any) => {
		http.put(`${ATTACHMENT_API}/${entrieId}/attachments`, {attachements: file})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch the leaderboard and dispatch the data
 */
export const fetchLeaderboard = (contestId: string) => (dispatch: any) => {
	dispatch(new FetchLeaderBoardPending().toObject())
	
	return doFetchLeaderboard(contestId)
		.then((leaderboard: ReadonlyArray<ContestLeaderBoardRecord>) =>
			dispatch(new FetchLeaderBoardSuccess(leaderboard).toObject()))
		.catch((error: any) => dispatch(new FetchLeaderBoardFailed(error).toObject()))
}

/**
 * Underlying method to fetch the leaderboard from the API
 *
 * @returns {Promise<[ContestLeaderBoardRecord]>}
 */
export const doFetchLeaderboard = (contestId: string): Promise<[ContestLeaderBoardRecord]> => {
	return new Promise<[ContestLeaderBoardRecord]>((resolve: any, reject: any) => {
		axios.get(`${CONTESTS_API}/${contestId}/leaderboard`)
			.then((data: any) => resolve(data.data ? data.data : []))
			.catch((error: any) => reject(error))
	})
}