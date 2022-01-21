import * as moment from 'moment'

/**
 * Calculate a formatted duration with numeric duration
 *
 * @param {string} endTime
 * @param {number} duration
 */
export const formattedDuration = (endTime: string, duration: number) => {
	const endDate = new Date(endTime).getTime()
	let endTimestamp = moment(endDate).unix()
	
	if (typeof (endTimestamp) === 'undefined') {
		endTimestamp = (new Date(endTime).getTime() / 1000)
	}
	
	const daysToGo = moment(endTimestamp * 1000).diff(moment(new Date()), 'days')
	return daysToGo < 0 ? `Ended ${Math.abs(daysToGo)} days ago` :
		(daysToGo > duration) ? `Starting in ${(daysToGo - duration)} days` : `${daysToGo} days to go`
}

/**
 * Check if the event has already passed
 */
export const dateHasEnded = (endTime: string) => {
	const endDate = new Date(endTime).getTime()
	let endTimestamp = moment(endDate).unix()
	
	if (typeof (endTimestamp) === 'undefined') {
		endTimestamp = (new Date(endTime).getTime() / 1000)
	}
	
	const daysToGo = moment(endTimestamp * 1000).diff(moment(new Date()), 'days')
	return daysToGo < 0
}

/**
 * Calculate a formatted duration with numeric duration
 *
 * @param {string} endTime
 */
export const momentDaysToGo = (endTime: string) => {
	let timeAgo = Math.abs(moment(endTime).diff(moment(new Date()), 'days'))
	let timeAgoString = 'days ago'
	
	if (timeAgo <= 0) {
		timeAgo = Math.abs(moment(endTime).diff(moment(new Date()), 'hours'))
		timeAgoString = 'hours ago'
	}
	
	if (timeAgo <= 0) {
		timeAgo = Math.abs(moment(endTime).diff(moment(new Date()), 'minutes'))
		timeAgoString = 'minutes ago'
	}
	
	return `${timeAgo} ${timeAgoString}`
}

/**
 * Format date to a pre defined date format
 */
export const formatDate = (date: string) => {
	return date ? moment(date).format('YYYY-MM-DD') : ''
}