import {
	AuthenticateUserSuccess,
	FetchProfileFailed,
	FetchProfilePending,
	FetchProfileSuccess,
	FetchPublicProfileFailed,
	FetchPublicProfilePending,
	FetchPublicProfileSuccess
} from '../constants/action-types'
import {
	CHECK_FOLLOW_API,
	FOLLOW_API,
	PASSWORD_CHANGE_API,
	PROFILE_API,
	PROFILE_SELF_API,
	REQUEST_SMS_API,
	UNFOLLOW_API,
	VERIFY_SMS_API
} from '../constants/api'
import { ProfileRecord, PublicProfileRecord } from '../constants/models'
import { UserRecord } from '../interfaces/user'
import http from '../utils/httpService'
import { doAuthenticate } from './authenticate'

/**
 * Fetch Profile
 */
export const fetchProfile = (id?: string) => (dispatch: any) => {
	console.log(id);
	dispatch(new FetchProfilePending().toObject())
	
	return doFetchProfile(id)
		.then((profile: ProfileRecord) => dispatch(new FetchProfileSuccess(profile).toObject()))
		.catch((error: any) => dispatch(new FetchProfileFailed(error).toObject()))
}

/**
 * Underlying function to fetch user profile
 */
export const doFetchProfile = (id?: string) => {
	console.log(id);
	return new Promise<ProfileRecord>((resolve: any, reject: any) => {
		http.get(id ? `${PROFILE_API}/${id}` : PROFILE_SELF_API)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Fetch Public Profile
 */
export const fetchPublicProfile = (id?: string, slug?: string) => (dispatch: any) => {
	console.log(id);
	dispatch(new FetchPublicProfilePending().toObject())
	
	return doFetchPublicProfile(id, slug)
		.then((publicProfile: PublicProfileRecord) => dispatch(new FetchPublicProfileSuccess(publicProfile).toObject()))
		.catch((error: any) => dispatch(new FetchPublicProfileFailed(error).toObject()))
}

/**
 * Underlying function to fetch user public profile
 */
export const doFetchPublicProfile = (id?: string, slug?: string) => {
	console.log(id);
	return new Promise<PublicProfileRecord>((resolve: any, reject: any) => {
		http.get(`${PROFILE_API}/${id}/${slug}`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Save Profile
 */
export const saveProfile = (profile: ProfileRecord) => (dispatch: any) => {
	return doSaveProfile(profile)
		.then((response: ProfileRecord) => dispatch(new FetchProfileSuccess(response).toObject()))
		.then(() => doAuthenticate())
		.then((user: UserRecord) => dispatch(new AuthenticateUserSuccess({user}).toObject()))
}

/**
 * Underlying function to save user profile
 */
export const doSaveProfile = (profile: ProfileRecord) => {
	return new Promise<ProfileRecord>((resolve: any, reject: any) => {
		http.put(PROFILE_SELF_API, profile)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to change the password of a user
 */
export const doChangePassword = (password: string, newPassword: string) => {
	return new Promise<any>((resolve: any, reject: any) => {
		http.post(PASSWORD_CHANGE_API, {password, new_password: newPassword})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to request the sms code
 */
export const doRequestSMSCode = (phoneNumber: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(REQUEST_SMS_API, {phoneNumber})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to verify the sms code
 */
export const doVerifySMSCode = (phoneNumber: string, code: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(VERIFY_SMS_API, {phoneNumber, code})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}

/**
 * Helper function to Follow
 */
export const doFollow = (targetId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.put(`${FOLLOW_API}/${targetId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}
/**
 * Helper function to Follow
 */
export const doUnFollow = (targetId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.put(`${UNFOLLOW_API}/${targetId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}
/**
 * Helper function to Check-Follow
 */
export const doCheckFollow = (targetId: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.get(`${CHECK_FOLLOW_API}/${targetId}`, {})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}