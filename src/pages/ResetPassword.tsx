import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import Input from '../components/Input'

import { Link } from 'react-router-dom'
import { doResetUserPassword, recoverUserPassword } from '../actions/authenticate'
import PasswordInput from '../components/PasswordInput'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { InputType, PasswordInputType } from '../constants/enums'
import { State as AuthenticateState } from '../reducers/authenticate'
import { RootState } from '../reducers/index'
import {
	EmailValidation,
	emailValidation as doEmailValidation,
	PasswordValidation,
	passwordValidation as doPasswordValidation
} from '../utils/validation'

interface ResetPasswordParams {
	role: string
}

interface ResetPasswordProps extends RouteComponentProps<ResetPasswordParams> {
	authenticateState: AuthenticateState
	recoverUserPassword: any
}

interface ResetPasswordState {
	email: string
	password: string
	passwordRepeat: string
	emailValidation: EmailValidation
	passwordValidation: PasswordValidation
	isValid: boolean
	isLoading: boolean
	isConfirmPassword: boolean
	resetPasswordStatus: ActionTypeStates
	token: string,
	isError: boolean
}

class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {
	public constructor(props: ResetPasswordProps) {
		super(props)
		
		this.state = {
			email: '',
			password: '',
			passwordRepeat: '',
			emailValidation: null,
			passwordValidation: null,
			isValid: false,
			isLoading: false,
			isConfirmPassword: false,
			resetPasswordStatus: null,
			token: '',
			isError: false
		}
	}
	
	public componentDidMount() {
		const urlString = this.props.location.search
		const urlToken = urlString.substring(7, urlString.lastIndexOf('&'))
		const urlEmail = urlString.split('email=').pop()
		
		this.setState({token: urlToken, email: urlEmail, isConfirmPassword: this.props.location.search !== ''})
	}
	
	public componentWillReceiveProps(nextProps: ResetPasswordProps) {
		if (nextProps.authenticateState.user) {
			this.props.history.push('/profile')
		}
	}
	
	public backReset() {
		this.props.history.push('/reset-password')
		
		this.setState({
			email: '',
			password: '',
			passwordRepeat: '',
			emailValidation: null,
			passwordValidation: null,
			isValid: false,
			isLoading: false,
			isConfirmPassword: false,
			resetPasswordStatus: null,
			token: '',
			isError: false
		})
	}
	
	public render() {
		const {isLoading, isValid, isConfirmPassword, resetPasswordStatus, isError} = this.state
		
		return (
			<div>
				<Helmet>
					<title>Reset Password | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="page-heading">
					<div className="container">
						<h1 className="page-heading__title">Reset Password</h1>
						<p className="page-heading__caption">
							Please enter your email address and we'll send you a link to reset your password.
						</p>
					</div>
				</div>
				
				<div className="reset-wrap">
					<div className="reset-container">
						{
							resetPasswordStatus === ActionTypeStates.SUCCESS && (
								<div className="reset-section__success">
									We've send you a link to reset your password on your E-mail Address.
								</div>
							)
						}
						{
							resetPasswordStatus === ActionTypeStates.FAILED && (
								<div className="reset-section__error">
									Please Enter Correct Email Address
								</div>
							)
						}
						<div className="reset-section">
							{
								isLoading && (
									<div className="reset-section__progress">
										<span className="reset-section__progress__label">Resetting your password ...</span>
										<Spinner name="three-dots" fadeIn="none"/>
									</div>
								)
							}
							{
								!isLoading && (
									<div className="reset-section__fields">
										{
											!isConfirmPassword && (
												<form onSubmit={() => {
													this.submitResetForm()
												}}>
													<Input
														name="email"
														placeholder="Enter your email"
														value={this.state.email}
														type={InputType.EMAIL}
														onChange={(value: string) => {
															this.emailValidateForm({email: value})
														}}/>
													<button
														disabled={!isValid}
														onClick={() => {
															this.submitResetForm()
														}}
														className="btn btn-rounded">RESET PASSWORD NOW
													</button>
												</form>
											)
										}
										{
											isConfirmPassword && (
												<div>
													{
														!isError && (
															<form onSubmit={() => {
																this.submitRecoverForm()
															}}>
																<Input
																	name="email"
																	placeholder="Enter Your email"
																	value={this.state.email}
																	type={InputType.EMAIL}
																	disabled={true}/>
																<PasswordInput
																	name="password"
																	placeholder="Password"
																	value={this.state.password}
																	type={PasswordInputType.VALIDATE}
																	onChange={(value: string) => this.validateForm({password: value})}/>
																
																<PasswordInput
																	name="password-repeat"
																	placeholder="Repeat Password"
																	value={this.state.passwordRepeat}
																	type={PasswordInputType.MATCH}
																	isValid={this.state.password === this.state.passwordRepeat}
																	onChange={(value: string) => this.validateForm({passwordRepeat: value})}/>
																<button
																	disabled={!isValid}
																	onClick={() => {
																		this.submitRecoverForm()
																	}}
																	className="btn btn-rounded">RESET PASSWORD NOW
																</button>
															</form>
														)
													}
												</div>
											)
										}
										{
											isError && (
												<div>
													<div className="reset-section__progress">
													<span
														className="reset-section__progress__label">There was an resetting your password,<br/><br/>
														<span onClick={() => {
															this.backReset()
														}} className="tryagain">
															Click here to try again
														</span>
													</span>
													</div>
												</div>
											)
										}
										{
											!isError && (
												<div>
													<div className="clearline"/>
													<div className="backtosignin">
														<Link to="/signin">Sign in</Link>
													</div>
												</div>
											)
										}
									</div>
								)
							}
							
							<div className="reset-section__description">
								<div className="reset-section__description__item">
									<div className="reset-section__description__show">
										<img src="/images/lock_icon.png"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private emailValidateForm(modifiedState?: any) {
		const newState: ResetPasswordState = {...this.state, ...modifiedState}
		const {email} = newState
		
		newState.emailValidation = doEmailValidation(email)
		newState.isValid = newState.emailValidation === EmailValidation.VALID
		
		this.setState(newState)
	}
	
	private validateForm(modifiedState?: any) {
		const newState: ResetPasswordState = {...this.state, ...modifiedState}
		const {password, passwordRepeat} = newState
		
		newState.passwordValidation = doPasswordValidation(password, passwordRepeat)
		newState.isValid = newState.passwordValidation >= PasswordValidation.WEAK && passwordRepeat.length > 0
		
		this.setState(newState)
	}
	
	private submitResetForm() {
		if (this.state.isValid) {
			this.setState({isLoading: true})
			
			doResetUserPassword(this.state.email)
				.then(() => {
					this.setState({resetPasswordStatus: ActionTypeStates.SUCCESS, email: '', isLoading: false})
				}).catch(() => {
				this.setState({resetPasswordStatus: ActionTypeStates.FAILED, isLoading: false})
			})
		}
	}
	
	private submitRecoverForm() {
		this.setState({isLoading: true})
		
		this.props.recoverUserPassword(this.state.token, this.state.email, this.state.password)
			.then(() => {
				// this.setState({ resetPasswordStatus: ActionTypeStates.SUCCESS, email: '', isLoading: false })
			}).catch(() => {
			this.setState({isLoading: false, isError: true})
		})
	}
	
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	recoverUserPassword
})(ResetPassword)