import * as React from 'react'
import { emailValidation, EmailValidation } from '../utils/validation'

export interface UserEmailModalProps {
	onSubmit: any
	onCancel: any
}

export interface UserEmailModalState {
	userEmail: string
}

export default class UserEmailModal extends React.Component<UserEmailModalProps, UserEmailModalState> {
	public constructor(props: UserEmailModalProps) {
		super(props)
		
		this.state = {
			userEmail: ''
		}
	}
	
	public render() {
		const {userEmail} = this.state
		const {onSubmit, onCancel} = this.props
		
		return (
			<div id="user-email-modal" className="user-email-modal" onClick={this.handleRootClick}>
				<div className="user-email-modal__body">
					<h3 className="user-email-modal__title">
						Save your product launch Quiz
					</h3>
					<p className="user-email-modal__description">
						Save changes and keep record of it <br/>
						Come back to complete it <br/>
						Ease your registration process and get access to hubbers resources.
					</p>
					<input
						className="user-email-modal__input"
						type="text"
						value={userEmail}
						onChange={(e: any) => {
							this.setState({userEmail: e.target.value})
						}}/>
					<div className="user-email-modal__actions">
						<button
							className="btn btn-rounded btn-transparent"
							onClick={() => {
								this.handleClose()
								onCancel()
							}}>
							Not Now
						</button>
						<button
							className="btn btn-rounded btn-outline"
							disabled={emailValidation(userEmail) !== EmailValidation.VALID}
							onClick={() => {
								onSubmit(userEmail)
							}}>
							Proceed
						</button>
					</div>
				</div>
			</div>
		)
	}
	
	private handleRootClick(e: any) {
		const isRoot = e.target.className === 'user-email-modal'
		
		if (isRoot) {
			document.body.classList.remove('show-user-email-modal')
		}
	}
	
	private handleClose() {
		document.body.classList.remove('show-user-email-modal')
	}
}