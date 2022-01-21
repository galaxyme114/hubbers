import * as React from 'react'

import PublicUserProfile from '../containers/PublicProfile'

export interface UserProfileModalProps {
	userId: number
}

export default class UserProfileModal extends React.Component<UserProfileModalProps, {}> {
	private static handleRootClick(e: any) {
		const isRoot = e.target.className === 'user-profile-modal' || e.target.className === 'user-profile-modal__body'
		if (isRoot) {
			UserProfileModal.handleClose()
		}
	}
	
	private static handleClose() {
		document.body.classList.remove('show-user-profile-modal')
	}
	
	public render() {
		const {userId} = this.props
		
		return (
			<div
				id="user-profile-modal"
				className="user-profile-modal"
				onClick={(e: any) => {
					UserProfileModal.handleRootClick(e)
				}}>
				<div className="user-profile-modal__body">
					<PublicUserProfile id={userId}/>
				</div>
			</div>
		)
	}
}