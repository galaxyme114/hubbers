import * as React from 'react'
import { connect } from 'react-redux'

import Icon from '../components/Icon'

import { fetchUserData, fetchUserSession } from '../actions/userData'
import { State as AuthenticateState } from '../reducers/authenticate'
import { RootState } from '../reducers/index'
import { State as UserDataState } from '../reducers/userData'

import { authenticateUser, registerUser } from '../actions/authenticate'
import {
	EmailValidation,
	emailValidation as doEmailValidation,
	PasswordValidation,
	passwordValidation as doPasswordValidation
} from '../utils/validation'
import PasswordInput from '../components/PasswordInput'
import { PasswordInputType } from '../constants/enums'

const Spinner = require('react-spinkit')

interface RegistrationProps {
	userDataState: UserDataState
	authenticateState: AuthenticateState
	fetchUserSession: any
	fetchUserData: any
	authenticateUser: any
	registerUser: any
}

interface RegistrationState {
	email: string,
	hideEmail: boolean,
	emailValidation: EmailValidation
	passwordValidation: PasswordValidation
	isValid: boolean
	password: string
	repeatPassword: string,
	acceptDisclaimer: boolean,
	isRegistering: boolean
}

class Registration extends React.Component<RegistrationProps, RegistrationState> {
	public constructor(props: any) {
		super(props)
		
		this.state = {
			email: '',
			hideEmail: false,
			emailValidation: null,
			passwordValidation: null,
			isValid: false,
			password: '',
			repeatPassword: '',
			acceptDisclaimer: true,
			isRegistering: false
		}
	}
	
	public componentDidMount() {
		this.props.fetchUserData()
			.then(() => {
				this.validateForm()
			})
	}
	
	public componentWillReceiveProps(nextProps: RegistrationProps) {
		const {userDataState} = this.props
		
		if (userDataState.email) {
			this.setState({email: userDataState.email, hideEmail: true})
		}
	}
	
	public render() {
		const {email, acceptDisclaimer, hideEmail, isValid, isRegistering} = this.state
		const validationMessage = this.getValidationMessage()
		
		return (
			<div className="registration">
				{
					isRegistering && (
						<div className="page-loading page-loading-sm">
							<div>
								<em>Registering ...</em>
								<Spinner name="three-dots" fadeIn="none"/>
							</div>
						</div>
					)
				}
				{
					!isRegistering && (
						<div>
							<h3 className="registration__title">Register Now</h3>
							<div className={'registration__inputs registration__inputs--email ' + (hideEmail ? 'hide' : '')}>
								<input
									className="form-input"
									name="registration-email"
									placeholder="E-Mail"
									type="email"
									value={this.state.email}
									onChange={(e: any) => this.validateForm({email: e.target.value})}/>
							</div>
							<div className="registration__inputs registration__inputs--password">
								{/*<input*/}
								{/*className="form-input"*/}
								{/*name="registration-password"*/}
								{/*placeholder="Password"*/}
								{/*type="password"*/}
								{/*value={this.state.password}*/}
								{/*onChange={(e: any) => this.validateForm({ password: e.target.value })}/>*/}
								<PasswordInput
									name="registration-password"
									placeholder="Password"
									value={this.state.password}
									type={PasswordInputType.VALIDATE}
									onChange={(value: string) => this.validateForm({password: value})}/>
								<PasswordInput
									name="registration-password-confirm"
									placeholder="Repeat Password"
									value={this.state.repeatPassword}
									type={PasswordInputType.MATCH}
									isValid={this.state.password === this.state.repeatPassword}
									onChange={(value: string) => this.validateForm({repeatPassword: value})}/>
								{/*<input*/}
								{/*className="form-input"*/}
								{/*name="registration-password-confirm"*/}
								{/*placeholder="Repeat Password"*/}
								{/*type="password"*/}
								{/*value={this.state.repeatPassword}*/}
								{/*onChange={(e: any) => this.validateForm({ repeatPassword: e.target.value })}/>*/}
							</div>
							<div className="registration__disclaimer">
								{
									email && (
										<div>
											<label htmlFor="registration-disclaimer">
												<input
													id="registration-disclaimer"
													type="checkbox"
													checked={acceptDisclaimer}
													onChange={() => {
														this.validateForm({acceptDisclaimer: !acceptDisclaimer})
													}}
												/>
												I agree to register with {email}
											</label>
											{
												hideEmail && (
													<span onClick={() => {
														this.setState({hideEmail: false})
													}}>
											<Icon name="edit"/>
										</span>
												)
											}
										</div>
									)
								}
							</div>
							<div className="registration__footer">
								<div className="registration__submit">
									<button
										className="btn btn-rounded btn-outline"
										disabled={!isValid || isRegistering}
										onClick={() => {
											this.setState({isRegistering: true})
											
											if (this.props.userDataState.sessionKey) {
												this.props.registerUser(this.state.email, this.state.password, 'creator')
													.then(() => {
														this.resetRegistrationForm()
													})
													.catch(() => {
														this.setState({isRegistering: false})
													})
											} else {
												this.props.fetchUserSession(this.state.email)
													.then(() => this.props.registerUser(this.state.email, this.state.password, 'creator'))
													.then(() => {
														this.resetRegistrationForm()
													})
													.catch(() => {
														this.setState({isRegistering: false})
													})
											}
										}}>
										Register Now
									</button>
								</div>
								{
									validationMessage && <div className="registration__validation">{validationMessage}</div>
								}
							</div>
						</div>
					)
				}
			</div>
		)
	}
	
	/**
	 * Validates the registration form and assigns the validation states
	 * from the
	 */
	private validateForm(modifiedState?: any) {
		const newState: RegistrationState = {...this.state, ...modifiedState}
		const {email, password, repeatPassword} = newState
		
		newState.emailValidation = doEmailValidation(email)
		newState.passwordValidation = doPasswordValidation(password, repeatPassword)
		newState.isValid = newState.emailValidation === EmailValidation.VALID &&
			newState.passwordValidation >= PasswordValidation.WEAK && repeatPassword.length > 0 && newState.acceptDisclaimer
		
		this.setState(newState)
	}
	
	/**
	 *
	 * @returns {string}
	 */
	private getValidationMessage() {
		const {emailValidation, passwordValidation} = this.state
		
		switch (emailValidation) {
			case EmailValidation.EMPTY:
				return <span className="info-message">Enter your e-mail</span>
			case EmailValidation.INVALID:
				return <span className="error-message">Invalid e-mail</span>
		}
		
		switch (passwordValidation) {
			case PasswordValidation.EMPTY:
				return <span className="info-message">Enter a password</span>
			case PasswordValidation.SHORT:
				return <span className="error-message">Too short, try something longer</span>
			case PasswordValidation.NO_MATCH:
				return <span className="error-message">Passwords don't match</span>
			case PasswordValidation.WEAK:
				return <span className="error-message">Weak, try something complex</span>
		}
		
		if (this.state.repeatPassword.length === 0) {
			return <span className="info-message">Repeat your password</span>
		}
		
		return <span className="success-message">Good to go!</span>
	}
	
	private resetRegistrationForm(): any {
		this.setState({
			email: '',
			hideEmail: false,
			emailValidation: null,
			passwordValidation: null,
			isValid: false,
			password: '',
			repeatPassword: '',
			acceptDisclaimer: true,
			isRegistering: false
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	userDataState: state.userData,
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	fetchUserData,
	fetchUserSession,
	authenticateUser,
	registerUser
})(Registration)