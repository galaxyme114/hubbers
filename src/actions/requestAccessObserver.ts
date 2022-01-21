import axios from 'axios'
import { OBSERVER_FORM_API } from '../constants/api'

/**
 * Recover user password
 */
export const doRequestAccessObserver = (email: string, name: string) => {
	return new Promise((resolve: any, reject: any) => {
		axios.post(OBSERVER_FORM_API, {email, name})
			.then(response => resolve(response.data))
			.catch(error => reject(error))
	})
}