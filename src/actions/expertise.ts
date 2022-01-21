import {
	CreateExpertiseOrderFailed,
	CreateExpertiseOrderPending,
	CreateExpertiseOrderSuccess,
	FetchExpertiseDetailFailed,
	FetchExpertiseDetailPending,
	FetchExpertiseDetailSuccess,
	FetchExpertiseOrderFailed,
	FetchExpertiseOrderPending,
	FetchExpertiseOrderSuccess,
	FetchMyExpertiseFailed,
	FetchMyExpertisePending,
	FetchMyExpertiseSuccess,
	UpdateExpertiseFailed,
	UpdateExpertiseOrderFailed,
	UpdateExpertiseOrderPending,
	UpdateExpertiseOrderSuccess,
	UpdateExpertisePending,
	UpdateExpertiseSuccess
} from '../constants/action-types'
import { EXPERTISE_API, EXPERTISE_ORDER_API, MY_EXPERTISE_API } from '../constants/api'
import { BriefDataRecord, ExpertiseOrderRecord, ExpertiseRecord } from '../constants/models'
import http from '../utils/httpService'

/**
 * Fetch a single expertise
 */
export const fetchExpertiseDetail = (id: string, isEditable?: boolean) => (dispatch: any) => {
	dispatch(new FetchExpertiseDetailPending().toObject())
	
	return doFetchExpertiseDetail(id, isEditable)
		.then((expertise: ExpertiseRecord) => dispatch(new FetchExpertiseDetailSuccess(expertise).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseDetailFailed(error).toObject()))
}

/**
 * Helper function to fetch a single expertise
 *
 * @returns {Promise<ExpertiseRecord>}
 */
const doFetchExpertiseDetail = (id: string, isEditable?: boolean) => {
	return new Promise<ExpertiseRecord>((resolve, reject) => {
		http.get(`${EXPERTISE_API}/${id}`, {
			params: {token: window.localStorage.fundator_token, isEditable}
		}).then(response => resolve(response.data)).catch(error => reject(error))
	})
}

/**
 * Helper function to create a new expertise if there is no draft expertise
 *
 * @returns {Promise<ExpertiseRecord>}
 */
export const doCreateExpertise = () => {
	return new Promise<ExpertiseRecord>((resolve, reject) => {
		http.post(`${EXPERTISE_API}`, {params: {token: window.localStorage.fundator_token}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update a single expertise
 */
export const updateExpertise = (id: string, updatedExpertise: Partial<ExpertiseRecord>) => (dispatch: any) => {
	dispatch(new UpdateExpertisePending().toObject())
	
	return doUpdateExpertise(id, updatedExpertise)
		.then((expertise: ExpertiseRecord) => dispatch(new UpdateExpertiseSuccess(expertise).toObject()))
		.catch((error: any) => dispatch(new UpdateExpertiseFailed(error).toObject()))
}

/**
 * Helper function to update a single expertise
 *
 * @returns {Promise<ExpertiseRecord>}
 */
const doUpdateExpertise = (id: string, updatedExpertise: Partial<ExpertiseRecord>) => {
	return new Promise<ExpertiseRecord>((resolve, reject) => {
		
		http.patch(`${EXPERTISE_API}/${id}`, updatedExpertise,
			{params: {token: window.localStorage.fundator_token}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch a single expertise order
 */
export const fetchExpertiseOrder = (id: string) => (dispatch: any) => {
	dispatch(new FetchExpertiseOrderPending().toObject())
	
	return doFetchExpertiseOrder(id)
		.then((expertiseOrder: ExpertiseOrderRecord) =>
			dispatch(new FetchExpertiseOrderSuccess(expertiseOrder).toObject()))
		.catch((error: any) => dispatch(new FetchExpertiseOrderFailed(error).toObject()))
}

/**
 * Helper function to fetch a single expertise order
 *
 * @returns {Promise<ExpertiseOrderRecord>}
 */
const doFetchExpertiseOrder = (id: string) => {
	return new Promise<ExpertiseOrderRecord>((resolve, reject) => {
		http.get(`${EXPERTISE_API}/${id}/order`, {params: {token: window.localStorage.fundator_token}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Create a single expertise order
 */
export const createExpertiseOrder = (id: string, selectedPackageId: string, projectId: number) => (dispatch: any) => {
	dispatch(new CreateExpertiseOrderPending().toObject())
	
	return doCreateExpertiseOrder(id, selectedPackageId, projectId)
		.then((expertiseOrder: ExpertiseOrderRecord) =>
			dispatch(new CreateExpertiseOrderSuccess(expertiseOrder).toObject()))
		.catch((error: any) => dispatch(new CreateExpertiseOrderFailed(error).toObject()))
}

/**
 * Helper function to create a single expertise order
 *
 * @returns {Promise<ExpertiseOrderRecord>}
 */
const doCreateExpertiseOrder = (id: string, selectedPackageId: string, projectId: number) => {
	return new Promise<ExpertiseOrderRecord>((resolve, reject) => {
		http.post(`${EXPERTISE_API}/${id}/order`, {selectedPackageId, projectId},
			{params: {token: window.localStorage.fundator_token}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update a single expertise order
 */
export const updateExpertiseOrder = (id: string, briefData: BriefDataRecord) => (dispatch: any) => {
	dispatch(new UpdateExpertiseOrderPending().toObject())
	
	return doUpdateExpertiseOrder(id, briefData)
		.then((expertiseOrder: ExpertiseOrderRecord) =>
			dispatch(new UpdateExpertiseOrderSuccess(expertiseOrder).toObject()))
		.catch((error: any) => dispatch(new UpdateExpertiseOrderFailed(error).toObject()))
}

/**
 * Helper function to update a single expertise order
 *
 * @returns {Promise<ExpertiseOrderRecord>}
 */
const doUpdateExpertiseOrder = (id: string, briefData: BriefDataRecord) => {
	return new Promise<ExpertiseOrderRecord>((resolve, reject) => {
		
		http.patch(`${EXPERTISE_ORDER_API}/${id}`, {briefData},
			{params: {token: window.localStorage.fundator_token}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch the expertise for the logged in user
 *
 */
export const fetchMyExpertise = () => (dispatch: any) => {
	dispatch(new FetchMyExpertisePending().toObject())
	
	return doFetchMyExpertise()
		.then((expertiseList: ReadonlyArray<ExpertiseRecord>) =>
			dispatch(new FetchMyExpertiseSuccess(expertiseList).toObject()))
		.catch((error: any) => dispatch(new FetchMyExpertiseFailed(error).toObject()))
}

/**
 * Underlying method to fetch the expertise records for the logged in user
 *
 * @returns {Promise<ReadonlyArray<ExpertiseRecord>>}
 */
export const doFetchMyExpertise = (): Promise<ReadonlyArray<ExpertiseRecord>> => {
	return new Promise<ReadonlyArray<ExpertiseRecord>>((resolve: any, reject: any) => {
		http.get(MY_EXPERTISE_API)
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}
