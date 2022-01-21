import http from '../utils/httpService'

import {
	FetchEmailSettingsFailed,
	FetchEmailSettingsPending,
	FetchEmailSettingsSuccess,
	UpdateEmailSettingsFailed,
	UpdateEmailSettingsSuccess
} from '../constants/action-types'
import { EMAIL_SETTINGS_API } from '../constants/api'
import { EmailSettingsRecord } from '../constants/models'

/**
 * Fetch the email settings for a user
 */
export const fetchEmailSettings = (shortId: string, accessCode: string) => (dispatch: any) => {
	dispatch(new FetchEmailSettingsPending().toObject())
	
	return doFetchEmailSettings(shortId, accessCode)
		.then((emailSettings: EmailSettingsRecord) =>
			dispatch(new FetchEmailSettingsSuccess(emailSettings).toObject()))
		.catch((error: any) => dispatch(new FetchEmailSettingsFailed(error).toObject()))
}

/**
 * Underlying method to fetch the email settings
 *
 * @returns {Promise<EmailSettingsRecord>}
 */
export const doFetchEmailSettings = (shortId: string, accessCode: string): Promise<EmailSettingsRecord> => {
	return new Promise<EmailSettingsRecord>((resolve: any, reject: any) => {
		http.get(`${EMAIL_SETTINGS_API}/${shortId}/${accessCode}`)
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}

/**
 * Update the email settings for a user
 */
export const updateEmailSettings = (
	shortId: string, accessCode: string, updatedEmailSettings: EmailSettingsRecord) => (dispatch: any) => {
	return doUpdateEmailSettings(shortId, accessCode, updatedEmailSettings)
		.then((emailSettings: EmailSettingsRecord) => {
			dispatch(new UpdateEmailSettingsSuccess(emailSettings).toObject())
			dispatch(new FetchEmailSettingsSuccess(emailSettings).toObject())
		}).catch((error: any) => dispatch(new UpdateEmailSettingsFailed(error).toObject()))
}

/**
 * Underlying method to fetch the email settings
 *
 * @returns {Promise<EmailSettingsRecord>}
 */
export const doUpdateEmailSettings = (
	shortId: string, accessCode: string, updatedEmailSettings: EmailSettingsRecord): Promise<EmailSettingsRecord> => {
	return new Promise<EmailSettingsRecord>((resolve: any, reject: any) => {
		http.patch(`${EMAIL_SETTINGS_API}/${shortId}/${accessCode}`, updatedEmailSettings)
			.then((response: any) => resolve(response.data))
			.catch((error: any) => reject(error))
	})
}