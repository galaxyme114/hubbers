import {
	CreateProjectSuccess,
	FetchProjectDetailFailed,
	FetchProjectDetailOngoingBusinessNeedsFailed,
	FetchProjectDetailOngoingBusinessNeedsPending,
	FetchProjectDetailOngoingBusinessNeedsSuccess,
	FetchProjectDetailOngoingExpertiseFailed,
	FetchProjectDetailOngoingExpertisePending,
	FetchProjectDetailOngoingExpertiseSuccess,
	FetchProjectDetailPending,
	FetchProjectDetailSuccess,
	FetchProjectDetailUserDataFailed,
	FetchProjectDetailUserDataPending,
	FetchProjectDetailUserDataSuccess,
	FetchProjectsFailed,
	FetchProjectsPending,
	FetchProjectsSuccess,
	UpdateProjectDetailFailed,
	UpdateProjectDetailPending,
	UpdateProjectDetailSuccess
} from '../constants/action-types'
import { BUSINESS_NEEDS_API, PROJECTS_API } from '../constants/api'
import { BusinessNeedsRecord, ProjectRecord } from '../constants/models'
import http from '../utils/httpService'
import { doFetchUserData } from './userData'

/**
 * Fetch Projects
 */
export const fetchProjects = () => (dispatch: any) => {
	dispatch(new FetchProjectsPending().toObject())
	
	return doFetchProjects()
		.then((projects: ReadonlyArray<ProjectRecord>) => dispatch(new FetchProjectsSuccess(projects).toObject()))
		.catch((error: any) => dispatch(new FetchProjectsFailed(error).toObject()))
}

/**
 * Helper function to fetch a list of projects
 *
 * @returns {Promise<ReadonlyArray<ProjectRecord>>}
 */
export const doFetchProjects = () => {
	return new Promise<ReadonlyArray<ProjectRecord>>((resolve: any, reject: any) => {
		return http.get(PROJECTS_API)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch a single project
 */
export const fetchProjectDetail = (id: string) => (dispatch: any) => {
	dispatch(new FetchProjectDetailPending().toObject())
	
	return doFetchProjectDetail(id)
		.then((project: ProjectRecord) => dispatch(new FetchProjectDetailSuccess(project).toObject()))
		.catch((error: any) => dispatch(new FetchProjectDetailFailed(error).toObject()))
}

/**
 * Helper function to fetch a single project
 *
 * @returns {Promise<any>}
 */
const doFetchProjectDetail = (id: string) => {
	return new Promise<ProjectRecord>((resolve, reject) => {
		http.get(`${PROJECTS_API}/${id}`, {params: {token: window.localStorage.fundator_token}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Update a single project
 */
export const updateProjectDetail = (updatedProjectRecord: ProjectRecord) => (dispatch: any) => {
	dispatch(new UpdateProjectDetailPending().toObject())
	
	return doUpdateProjectDetail(updatedProjectRecord)
		.then((project: ProjectRecord) => dispatch(new UpdateProjectDetailSuccess(project).toObject()))
		.catch((error: any) => dispatch(new UpdateProjectDetailFailed(error).toObject()))
}

/**
 * Helper function to update a single project
 *
 * @returns {Promise<ProjectRecord>}
 */
const doUpdateProjectDetail = (updatedProjectRecord: ProjectRecord) => {
	return new Promise<ProjectRecord>((resolve, reject) => {
		http.patch(`${PROJECTS_API}/${updatedProjectRecord._id}`, updatedProjectRecord,
			{params: {token: window.localStorage.fundator_token}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch a single project's user data
 */
export const fetchProjectDetailUserData = (projectPldtSession: string) => (dispatch: any) => {
	dispatch(new FetchProjectDetailUserDataPending().toObject())
	
	return doFetchUserData(projectPldtSession)
		.then((userData: any) => dispatch(new FetchProjectDetailUserDataSuccess(userData).toObject()))
		.catch((error: any) => dispatch(new FetchProjectDetailUserDataFailed(error).toObject()))
}

/**
 * Fetch a single project's user data
 */
export const fetchProjectDetailOngoingExpertise = (projectId: string) => (dispatch: any) => {
	dispatch(new FetchProjectDetailOngoingExpertisePending().toObject())
	
	return doFetchProjectDetailOngoingExpertise(projectId)
		.then((ids: string[]) => dispatch(new FetchProjectDetailOngoingExpertiseSuccess(ids).toObject()))
		.catch((error: any) => dispatch(new FetchProjectDetailOngoingExpertiseFailed(error).toObject()))
}

/**
 * Underlying function to fetch project detail ongoing expertise
 */
export const doFetchProjectDetailOngoingExpertise = (id: string) => {
	return new Promise<string[]>((resolve: any, reject: any) => {
		http.get(`${PROJECTS_API}/${id}/ongoing-tasks`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch a single project's user data
 */
export const fetchProjectDetailOngoingBusinessNeeds = (projectId: string) => (dispatch: any) => {
	dispatch(new FetchProjectDetailOngoingBusinessNeedsPending().toObject())
	
	return doFetchProjectDetailOngoingBusinessNeeds(projectId)
		.then((businessNeeds: BusinessNeedsRecord[]) =>
			dispatch(new FetchProjectDetailOngoingBusinessNeedsSuccess(businessNeeds).toObject()))
		.catch((error: any) => dispatch(new FetchProjectDetailOngoingBusinessNeedsFailed(error).toObject()))
}

/**
 * Underlying function to fetch project detail ongoing expertise
 */
export const doFetchProjectDetailOngoingBusinessNeeds = (id: string) => {
	return new Promise<BusinessNeedsRecord[]>((resolve: any, reject: any) => {
		http.get(`${PROJECTS_API}/${id}/ongoing-business-needs`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Create the businessNeeds. fetch and dispatch the data
 */
export const createProjectBusinessNeeds = (newBusinessNeedsData: any) => (dispatch: any) => {
	return doCreateBusinessNeeds(newBusinessNeedsData)
		.then(() => doFetchProjectDetailOngoingBusinessNeeds(newBusinessNeedsData.projectId))
		.then((businessNeeds: BusinessNeedsRecord[]) =>
			dispatch(new FetchProjectDetailOngoingBusinessNeedsSuccess(businessNeeds).toObject()))
		.catch((error: any) => dispatch(new FetchProjectDetailOngoingBusinessNeedsFailed(error).toObject()))
}

/**
 * Create a business need
 *
 * @returns {Promise<any>}
 */
const doCreateBusinessNeeds = (newBusinessNeedsData: any) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(BUSINESS_NEEDS_API, newBusinessNeedsData)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Delete the businessNeeds. fetch and dispatch the data
 */
export const deleteProjectBusinessNeeds = (businessNeed: BusinessNeedsRecord) => (dispatch: any) => {
	return doDeleteBusinessNeeds(businessNeed._id)
		.then(() => doFetchProjectDetailOngoingBusinessNeeds(businessNeed.project._id))
		.then((businessNeeds: BusinessNeedsRecord[]) =>
			dispatch(new FetchProjectDetailOngoingBusinessNeedsSuccess(businessNeeds).toObject()))
		.catch((error: any) => dispatch(new FetchProjectDetailOngoingBusinessNeedsFailed(error).toObject()))
}

/**
 * Delete a business need
 *
 * @returns {Promise<any>}
 */
const doDeleteBusinessNeeds = (id: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.delete(`${BUSINESS_NEEDS_API}/${id}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Create a new project
 */
export const createProject = (name: string) => (dispatch: any) => {
	return doCreateProject(name)
		.then((project: ProjectRecord) => dispatch(new CreateProjectSuccess({project}).toObject()))
}

/**
 * Helper function to create a new project
 *
 * @returns {Promise<any>}
 */
const doCreateProject = (name: string) => {
	return new Promise((resolve: any, reject: any) => {
		const pldtSession = window.localStorage.pldtSessionKey
		
		http.post(PROJECTS_API, {name, pldtSession}, {params: {token: window.localStorage.fundator_token}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}