import { AuthenticateUserFailed, AuthenticateUserPending, AuthenticateUserSuccess } from '../constants/action-types'
import {
	AUTHENTICATE_API, LOGIN_API, ONBOARDING_API,
	RECOVER_PASSWORD_API, REGISTER_API, RESET_PASSWORD_API
} from '../constants/api'
import { UserRecord } from '../interfaces/user'
import http, { rebuildHttp } from '../utils/httpService'

/**
 * Authenticate the user
 *
 */
export const authenticateUser = (redirectTo?: string) => (dispatch: any) => {
	dispatch(new AuthenticateUserPending().toObject())
	
	return doAuthenticate()
		.then((user: UserRecord) => dispatch(new AuthenticateUserSuccess({user, redirectTo}).toObject()))
		.then(() => {
			if (redirectTo) {
				window.location.href = redirectTo
			}
		})
		.catch((error: any) => {
			if (error && error.response && error.response.status === 401) {
				doLogoutUser().then(() => dispatch(new AuthenticateUserFailed(error).toObject()))
			} else {
				dispatch(new AuthenticateUserFailed(error).toObject())
			}
		})
}

/**
 * Helper function to retrieve the user data after authenticating using the token from local storage
 *
 * @returns {Promise<any>}
 */
export const doAuthenticate = () => {
	return new Promise((resolve: any, reject: any) => {
		http.get(AUTHENTICATE_API).then(response => {
			if (response.data.message) { reject(response) } else { resolve(response.data) }
		}).catch(error => reject(error))
	})
}

/**
 * Register the user
 *
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @param {string} redirectTo
 */
export const registerUser = (email: string, password: string, role: string, redirectTo?: string) => (dispatch: any) => {
	return doRegisterUser(email, password, role)
		.then(() => dispatch(authenticateUser(redirectTo)))
}

/**
 * Helper function to register the user giving an email and password
 *
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @returns {Response}
 */
const doRegisterUser = (email: string, password: string, role: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(REGISTER_API, { email, password, role })
			.then(response => {
				const token = response.data.token
				window.localStorage.fundator_token = token
				rebuildHttp()
				resolve(token)
			})
			.catch(error => reject(error))
	})
}

/**
 * Onboard user
 *
 * @param {string} role
 * @param {string} data
 * @param code
 * @param {string} redirectTo
 */
export const onboardUser = (role: string, data: any, code: string, redirectTo?: string) => (dispatch: any) => {
	return doOnboardUser(role, data, code)
		.then(() => dispatch(authenticateUser(redirectTo)))
}

/**
 * Helper function to onboard user giving their onboarding data
 *
 * @param role
 * @param data
 * @param code
 * @returns {Response}
 */
const doOnboardUser = (role: string, data: any, code: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(ONBOARDING_API.replace('{role}' , role), {...data, code})
			.then(response => {
				const token = response.data.token
				window.localStorage.fundator_token = token
				resolve(token)
			}).catch(error => reject(error))
	})
}

/**
 * Login user
 *
 */
export const loginUser = (email: string, password: string, redirectTo?: string) => (dispatch: any) => {
	return doLoginUser(email, password)
		.then(() => dispatch(authenticateUser(redirectTo)))
}

/**
 * Helper function to login user
 *
 * @returns {Promise<any>}
 */
const doLoginUser = (email: string, password: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(LOGIN_API, { email, password })
			.then(response => {
				const token = response.data.token
				window.localStorage.fundator_token = token
				rebuildHttp()
				resolve(token)
			})
			.catch(error => reject(error))
	})
}

/**
 * Logout user
 *
 */
export const logoutUser = (redirectTo?: string) => (dispatch: any) => {
	return doLogoutUser()
		.then(() => dispatch(authenticateUser(redirectTo)))
}

/**
 * Helper function to login user
 *
 * @returns {Promise<any>}
 */
const doLogoutUser = () => {
	return new Promise((resolve: any) => {
		window.localStorage.removeItem('fundator_token')
		rebuildHttp()
		resolve()
	})
}

/**
 * Authenticate the user via linkedin
 *
 */
export const authenticateLinkedin = (props: any, redirectTo?: string) => (dispatch: any) => {
	return doAuthenticateLinkedin(props)
		.then(() => dispatch(authenticateUser(redirectTo)))
}

/**
 * Helper function to authenticate the user via linkedin
 *
 * @returns {Promise<any>}
 */
const doAuthenticateLinkedin = (props: any) => {
	return new Promise((resolve: any, reject: any) => {
		if (props.token) {
			const token = props.token
			window.localStorage.fundator_token = token
			rebuildHttp()
			resolve(token)
		} else {
			reject()
		}
	})
}

/**
 * Reset user password
 */
export const doResetUserPassword = (email: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(RESET_PASSWORD_API, { email})
		.then(response => resolve(response.data))
		.catch(error => reject(error))
	})
}

/**
 * Authenticate the user via linkedin
 *
 */
export const recoverUserPassword = (token: string, email: string, password: string) => (dispatch: any) => {
	return doRecoverUserPassword(token, email, password)
		.then(() => dispatch(authenticateUser()))
}

/**
 * Recover user password
 */
const doRecoverUserPassword = (token: string, email: string, password: string) => {
	return new Promise((resolve: any, reject: any) => {
		http.post(RECOVER_PASSWORD_API, { token, email, password, password_confirmation: password })
		.then(response => {
			const loginToken = response.data.token
			window.localStorage.fundator_token = loginToken
			rebuildHttp()
			resolve(loginToken)
		})
		.catch(error => reject(error))
	})
}