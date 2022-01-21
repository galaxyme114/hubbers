import * as React from 'react'

export interface UserThumbnailProps {
	name: string,
	thumbnailImageUrl?: string
}

const UserThumbnail: React.StatelessComponent<UserThumbnailProps> = ({name, thumbnailImageUrl}) => {
	const initialsRegex = name.match(/\b\w/g)
	const initials = initialsRegex ? ((initialsRegex.shift() || '') + (initialsRegex.pop() || '')).toUpperCase() : ''
	
	return (
		<div className="user-thumbnail">
			{
				thumbnailImageUrl && <img src={thumbnailImageUrl}/>
			}
			{
				!thumbnailImageUrl && <span className="initials">{initials}</span>
			}
		</div>
	)
}

export default UserThumbnail