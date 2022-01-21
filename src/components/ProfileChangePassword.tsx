import * as React from 'react'

import Input from './Input'
import PasswordInput from './PasswordInput'

import { InputType, PasswordInputType } from '../constants/enums'
import { PasswordValidation, passwordValidation as doPasswordValidation } from '../utils/validation'
import { doChangePassword } from '../actions/profile'
import { ActionTypeStates } from '../constants/action-types'
import Spinner from './Spinner'

export interface ProfileChangePasswordProps {
	onChange: any
}

export interface ProfileChangePasswordState {
	oldPassword: string
	password: string
	passwordRepeat: string
	passwordValidation: PasswordValidation
	isValid: boolean
	passwordChangeStatus: ActionTypeStates
}

export default class ProfileChangePassword
	extends React.Component<ProfileChangePasswordProps, ProfileChangePasswordState> {
	public constructor(props: ProfileChangePasswordProps) {
		super(props)
		
		this.state = {
			oldPassword: '',
			password: '',
			passwordRepeat: '',
			passwordValidation: null,
			isValid: false,
			passwordChangeStatus: null
		}
	}
	
	public render() {
		const {passwordChangeStatus} = this.state
		
		return (
			<div>
				{
					passwordChangeStatus === ActionTypeStates.INPROGRESS && (
						<div className="profile-section__loading">
							<Spinner name="three-dots" fadeIn="none"/>
						</div>
					)
				}
				{
					passwordChangeStatus === ActionTypeStates.FAILED && (
						<div className="profile-section__notice profile-section__notice--danger">
							Password change failed, invalid password.
						</div>
					)
				}
				{
					passwordChangeStatus === ActionTypeStates.SUCCESS && (
						<div className="profile-section__notice profile-section__notice--success">
							Your password has been changed successfully!
						</div>
					)
				}
				{
					passwordChangeStatus !== ActionTypeStates.INPROGRESS && (
						<div>
							<div className="profile-role-details__half">
								<Input
									name="old-password"
									label="Enter your password"
									placeholder="Enter your password"
									value={this.state.oldPassword}
									type={InputType.PASSWORD}
									onChange={(value: string) => {
										this.validateForm({oldPassword: value})
									}}/>
								
								<button
									className="btn onmobilechange"
									disabled={!this.state.isValid}
									onClick={() => {
										this.changePassword()
									}}>
									Change Password
								</button>
							</div>
							<div className="profile-role-details__half">
								<PasswordInput
									name="password"
									placeholder="New Password"
									label="New Password"
									value={this.state.password}
									type={PasswordInputType.VALIDATE}
									onChange={(value: string) => this.validateForm({password: value})}/>
								
								<PasswordInput
									name="password-repeat"
									placeholder="Repeat Password"
									label="Repeat Password"
									value={this.state.passwordRepeat}
									type={PasswordInputType.MATCH}
									isValid={this.state.password === this.state.passwordRepeat}
									onChange={(value: string) => this.validateForm({passwordRepeat: value})}/>
							</div>
						</div>
					)
				}
			</div>
		)
	}
	
	private validateForm(modifiedState?: any) {
		const newState: ProfileChangePasswordState = {...this.state, ...modifiedState}
		const {oldPassword, password, passwordRepeat} = newState
		
		newState.passwordValidation = doPasswordValidation(password, passwordRepeat)
		newState.isValid = oldPassword.length > 0
			&& newState.passwordValidation >= PasswordValidation.WEAK
			&& password === passwordRepeat
		
		this.setState(newState)
	}
	
	private changePassword() {
		const {onChange} = this.props
		this.setState({passwordChangeStatus: ActionTypeStates.INPROGRESS})
		
		doChangePassword(this.state.oldPassword, this.state.password)
			.then(() => {
				this.setState({
					passwordChangeStatus: ActionTypeStates.SUCCESS,
					oldPassword: '',
					password: '',
					passwordRepeat: '',
					passwordValidation: null,
					isValid: false
				})
				onChange()
			}).catch(() => {
			this.setState({passwordChangeStatus: ActionTypeStates.FAILED})
		})
	}
}