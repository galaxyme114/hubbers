/**
 * Get the file extension
 *
 * @param {string} fileUrl
 * @returns {string}
 */
export const getFileExtension = (fileUrl: string) => {
	const fileExtension = fileUrl.split('.').pop()
	return (fileExtension && fileExtension !== 'undefined') ? fileExtension.toUpperCase() : 'FILE'
}