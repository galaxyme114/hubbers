import axios from 'axios'

import {
	FavouriteExpertise,
	FetchUserDataFailed,
	FetchUserDataSuccess,
	FetchUserSessionFailed,
	FetchUserSessionPending,
	FetchUserSessionSuccess,
	RemoveFavouriteExpertise,
	RemoveShortlistExpertise,
	SaveUserDataSuccess,
	ShortlistExpertise
} from '../constants/action-types'
import { USER_DATA_API, USER_SESSION_API } from '../constants/api'
import { AnswerRecord, CategoryRecord, QuestionRecord } from '../constants/models'

/**
 * Fetch users data
 */
export const fetchUserData = (manualSessionKey?: string) => (dispatch: any) => {
	const sessionKey = manualSessionKey ? manualSessionKey : window.localStorage.pldtSessionKey
	
	return doFetchUserData(sessionKey)
		.then(data => dispatch(new FetchUserDataSuccess(data).toObject()))
		.catch(error => dispatch(new FetchUserDataFailed(error).toObject()))
}

/**
 * Underlying function to fetch user data
 */
export const doFetchUserData = (sessionKey: string) => {
	return new Promise<any>((resolve: any, reject: any) => {
		axios.get(USER_DATA_API, {params: {sessionKey}})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

export const shortlistExpertise = (expertiseId: number) => (dispatch: any) => {
	dispatch(new ShortlistExpertise(expertiseId).toObject())
	dispatch(saveUserData())
}

export const removeShortlistExpertise = (expertiseId: number) => (dispatch: any) => {
	dispatch(new RemoveShortlistExpertise(expertiseId).toObject())
	dispatch(saveUserData())
}

export const favouriteExpertise = (expertiseId: number) => (dispatch: any) => {
	dispatch(new FavouriteExpertise(expertiseId).toObject())
	dispatch(saveUserData())
}

export const removeFavouriteExpertise = (expertiseId: number) => (dispatch: any) => {
	dispatch(new RemoveFavouriteExpertise(expertiseId).toObject())
	dispatch(saveUserData())
}

/**
 * Save the users answers
 */
export const saveUserData = () => (dispatch: any, getState: any) => {
	let answeredQuestions: ReadonlyArray<AnswerRecord> = []
	getState().productLauncher.categories.map((c: CategoryRecord) => {
		answeredQuestions = [
			...answeredQuestions,
			...c.questions.filter((cq: QuestionRecord) => cq.value !== null)
				.map(cq => ({questionId: cq.id, value: cq.value}))
		]
	})
	
	const sessionKey = getState().userData.sessionKey
	const userData = {
		email: getState().userData.email || null,
		shortlistedExpertise: getState().userData.shortlistedExpertise || [],
		favouriteExpertise: getState().userData.favouriteExpertise || [],
		displaySuggestedExpertise: getState().userData.displaySuggestedExpertise || false,
		answers: answeredQuestions
	}
	
	// Special background save if the user has a session key
	return doSaveUserData(sessionKey, userData).then(() =>
		dispatch(new SaveUserDataSuccess({sessionKey, userData}).toObject()))
}

/**
 * Clear user answers and restart
 */
export const resetUserData = () => (dispatch: any, getState: any) => {
	const sessionKey = getState().userData.sessionKey
	const userData: any = {
		email: null,
		shortlistedExpertise: null,
		favouriteExpertise: null,
		displaySuggestedExpertise: null,
		answers: null
	}
	
	// Special background save if the user has a session key
	doSaveUserData(sessionKey, userData).then(() =>
		dispatch(new SaveUserDataSuccess({sessionKey, userData}).toObject()))
}

/**
 * Underlying function to save user data
 */
export const doSaveUserData = (sessionKey: string, data: any) => {
	return new Promise<any>((resolve: any, reject: any) => {
		axios.post(USER_DATA_API, {sessionKey, data})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch User Session
 */
export const fetchUserSession = (userEmail: string) => (dispatch: any) => {
	dispatch(new FetchUserSessionPending().toObject())
	
	// Get the user session key and store it in the database
	return doFetchUserSession(userEmail)
		.then(sessionKey => {
			window.localStorage.pldtSessionKey = sessionKey
			return dispatch(new FetchUserSessionSuccess({email: userEmail, sessionKey}).toObject())
		})
		.catch(error => dispatch(new FetchUserSessionFailed(error).toObject()))
}

export const doFetchUserSession = (userEmail: string) => {
	return new Promise<any>((resolve: any, reject: any) => {
		axios.post(USER_SESSION_API, {userEmail})
			.then(response => resolve(response.data.sessionKey ? response.data.sessionKey : null))
			.catch(error => reject(error))
	})
}

/**
 * Fetch User Session
 */
export const checkUserSession = (manualSessionKey?: string) => (dispatch: any) => {
	const sessionKey = manualSessionKey ? manualSessionKey : window.localStorage.pldtSessionKey
	dispatch(new FetchUserSessionSuccess({sessionKey}).toObject())
}