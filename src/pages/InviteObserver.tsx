import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import Input from '../components/Input'

import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { InputType, PasswordInputType } from '../constants/enums'
import { RootState } from '../reducers'
import { State as AuthenticateState } from '../reducers/authenticate'

import { State as InviteState } from '../reducers/invite'

import { authenticateLinkedin, onboardUser } from '../actions/authenticate'
import PasswordInput from '../components/PasswordInput'
import Spinner from '../components/Spinner'
import {
	EmailValidation,
	emailValidation as doEmailValidation,
	PasswordValidation,
	passwordValidation as doPasswordValidation
} from '../utils/validation'

import { fetchInvitationData } from '../actions/invite'
import LinkedinLogin from '../components/LinkedinLogin'
import { ActionTypeStates } from '../constants/action-types'
import { nationalityCountries } from '../constants/selectOptions'

interface InviteObserverMatchParams {
	invitationCode: string
}

interface InviteObserverProps extends RouteComponentProps<InviteObserverMatchParams> {
	authenticateState: AuthenticateState
	invitationState: InviteState
	onSave: any
	onboardUser: any
	authenticateLinkedin: any
	fetchInvitationData: any
}

interface InviteObserverState {
	email: string
	name: string
	lastName: string
	nationality: string
	comments: string
	password: string
	passwordRepeat: string
	thumbnail: string
	emailValidation: EmailValidation
	passwordValidation: PasswordValidation
	isValid: boolean
	isLoading: boolean
	isLinkedinLoading: boolean
	isError: boolean
}

class InviteObserver extends React.Component<InviteObserverProps, InviteObserverState> {
	public constructor(props: InviteObserverProps) {
		super(props)
		
		this.state = {
			email: '',
			name: '',
			lastName: '',
			nationality: '',
			comments: '',
			password: '',
			passwordRepeat: '',
			thumbnail: '',
			emailValidation: null,
			passwordValidation: null,
			isValid: false,
			isLoading: false,
			isLinkedinLoading: false,
			isError: false
		}
	}
	
	public componentDidMount() {
		this.props.fetchInvitationData('observer', this.props.match.params.invitationCode)
		
		setTimeout(() => {
			this.validateForm({})
		}, 1000)
	}
	
	public componentWillReceiveProps(nextProps: InviteObserverProps) {
		// if (nextProps.authenticateState.user && nextProps.authenticateState.user.isHubbersInvestor) {
		if (nextProps.authenticateState.user &&
			nextProps.authenticateState.user.capabilities.indexOf('site-investor') !== -1) {
			this.props.history.push('/grab-a-share')
		}
		
		if (nextProps.authenticateState.status === ActionTypeStates.FAILED && nextProps.invitationState.invitationData
			&& (this.state.email === '' && this.state.name === '')) {
			this.setState({
				name: nextProps.invitationState.invitationData.name,
				lastName: nextProps.invitationState.invitationData.lastName,
				email: nextProps.invitationState.invitationData.email
			})
		} else if (nextProps.authenticateState.status === ActionTypeStates.SUCCESS
			&& (this.state.email === '' || this.state.name === '' || this.state.lastName === '')) {
			this.setState({
				name: nextProps.authenticateState.user.name,
				lastName: nextProps.authenticateState.user.lastName,
				email: nextProps.authenticateState.user.email
			})
		}
	}
	
	public render() {
		const {isLoading, isValid} = this.state
		const {invitationState, authenticateState} = this.props
		
		return (
			<div>
				<Helmet>
					<title>Register as an Observer | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="observer-page-heading">
					<div className="container">
						<h1 className="observer-page-heading__title">Register as an observer</h1>
						<p className="observer-page-heading__caption">
							Register as an observer and have exclusive access to the same tools as our shareholders
						</p>
					</div>
				</div>
				<div className="observer-wrap">
					<div className="observer-container">
						<div className="observer-section">
							{
								(isLoading) && (
									<div className="page-loading">
										<div>
											<em>Registering as an observer ...</em>
											<Spinner name="three-dots" fadeIn="none"/>
										</div>
									</div>
								)
							}
							{
								(invitationState.status === ActionTypeStates.INPROGRESS) && (
									<div className="page-loading">
										<div>
											<em>Verifying invitation ...</em>
											<Spinner name="three-dots" fadeIn="none"/>
										</div>
									</div>
								)
							}
							{
								(invitationState.status === ActionTypeStates.FAILED) && (
									<div className="page-loading">
										<div>
											<em>Invalid invitation</em>
										</div>
									</div>
								)
							}
							{
								((invitationState.status === ActionTypeStates.SUCCESS) && (!isLoading)) && (
									<div>
										{
											this.state.isError && <div className="observer-section__error">
												Registration failed, please try again later.
											</div>
										}
										<div className="observer-section__fields">
											<form onSubmit={() => {
												this.submitForm()
											}}>
												{
													(!authenticateState.user || !authenticateState.user.linkedinId) && (
														<div className="signin-section__fields__social">
															{
																!this.state.isLinkedinLoading && (
																	<div>
																		<p>Login with ease by connecting your linkedin account</p>
																		<LinkedinLogin
																			text="Connect with Linkedin"
																			onLogin={(props: any) => {
																				this.connectLinkedin(props)
																			}}/>
																	</div>
																)
															}
															{
																this.state.isLinkedinLoading && <Spinner name="three-dots" fadeIn="none"/>
															}
														</div>
													)
												}
												<div className="observer-section__fields_box">
													<div className="observer-section__fields_box_label">
														<label>Email Address</label>
													</div>
													<div className="observer-section__fields_box_input">
														<Input
															name="email"
															placeholder=""
															value={this.state.email}
															type={InputType.EMAIL}
															onChange={(email: string) => {
																this.validateForm({email})
															}}/>
													</div>
												</div>
												<div className="observer-section__fields_box">
													<div className="observer-section__fields_box_label">
														<label>Name</label>
													</div>
													<div className="observer-section__fields_box_input two-col">
														<Input
															name="name"
															placeholder="First Name"
															value={this.state.name}
															type={InputType.TEXT}
															onChange={(name: string) => {
																this.validateForm({name})
															}}/>
														<Input
															name="lastName"
															placeholder="Last Name"
															value={this.state.lastName}
															type={InputType.TEXT}
															onChange={(lastName: string) => {
																this.validateForm({lastName})
															}}/>
													</div>
												</div>
												<div className="observer-section__fields_box">
													<div className="observer-section__fields_box_label">
														<label>Nationality</label>
													</div>
													<div className="observer-section__fields_box_input">
														<Input
															name="nationality"
															placeholder=""
															value={this.state.nationality}
															type={InputType.SELECT}
															options={nationalityCountries}
															simpleValue={true}
															onChange={(nationality: string) => {
																this.validateForm({nationality})
															}}/>
													</div>
												</div>
												<div className="observer-section__fields_box">
													<div className="observer-section__fields_box_label">
														<label>Comments</label>
														<p className="observer-section__fields_box_label_optional">(Optional)</p>
													</div>
													<div className="observer-section__fields_box_input">
														<Input
															name="comments"
															placeholder=""
															value={this.state.comments}
															type={InputType.TEXTAREA}
															onChange={(comments: string) => {
																this.validateForm({comments})
															}}/>
													</div>
												</div>
												{
													!authenticateState.user && (
														<div className="observer-section__fields_outerbox_pwd">
															<div className="observer-section__fields_fields_box_pwd">
																<div className="observer-section__fields_box">
																	<div className="observer-section__fields_box_label">
																		<label>Password</label>
																	</div>
																	<div className="observer-section__fields_box_input">
																		<PasswordInput
																			name="password"
																			placeholder=""
																			value={this.state.password}
																			type={PasswordInputType.VALIDATE}
																			onChange={(password: string) => this.validateForm({password})}/>
																	</div>
																</div>
																<div className="observer-section__fields_box">
																	<div className="observer-section__fields_box_label_confirm_pwd">
																		<label>Confirm Password</label>
																	</div>
																	<div className="observer-section__fields_box_input">
																		<PasswordInput
																			name="password-repeat"
																			placeholder=""
																			value={this.state.passwordRepeat}
																			type={PasswordInputType.MATCH}
																			isValid={this.state.password === this.state.passwordRepeat}
																			onChange={(passwordRepeat: string) => this.validateForm({passwordRepeat})}/>
																	</div>
																</div>
															</div>
															<div className="observer-section__upload__image_box">
																<div className="observer-section__upload__image_box_inner">
																	<UserThumbnailUpload
																		autoUpload={true}
																		thumbnailImageUrl={this.state.thumbnail}
																		onUpload={(thumbnail: string) => {
																			this.validateForm({thumbnail})
																		}}/>
																</div>
															</div>
														</div>
													)
												}
												<div className="observer-section__submitbtn_box">
													<div className="observer-section__submitbtn">
														<button
															className="btn btn-large btn-cta"
															onClick={() => {
																this.submitForm()
															}}
															disabled={!isValid}>{authenticateState.user ? 'Continue' : 'Register'}</button>
													</div>
													{
														// (!authenticateState.user || !authenticateState.user.linkedin) && (
														// 	<div className="observer-section__linkedinbtn signin-section__fields__social">
														// 		{
														// 			!this.state.isLinkedinLoading && (
														// 				<LinkedinLogin
														// 					text="Connect with Linkedin"
														// 					onLogin={(props: any) => { this.connectLinkedin(props) }}/>
														// 			)
														// 		}
														// 		{
														// 			this.state.isLinkedinLoading && <Spinner name="three-dots" fadeIn="none"/>
														// 		}
														// 	</div>
														// )
													}
												</div>
											</form>
										</div>
									</div>
								)
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private validateForm(modifiedState?: any) {
		const newState: InviteObserverState = {...this.state, ...modifiedState}
		const {email, name, lastName, nationality, password, passwordRepeat} = newState
		
		newState.emailValidation = doEmailValidation(email)
		newState.passwordValidation = doPasswordValidation(password, passwordRepeat)
		
		const isPasswordValid = (this.props.authenticateState.user ||
			newState.passwordValidation >= PasswordValidation.WEAK && passwordRepeat.length > 0)
		
		newState.isValid = newState.emailValidation === EmailValidation.VALID &&
			isPasswordValid &&
			name.length > 0 &&
			lastName.length > 0 &&
			nationality.length > 0
		
		this.setState(newState)
	}
	
	private submitForm() {
		if (this.state.isValid) {
			this.setState({isLoading: true, isError: false})
			const data = {
				email: this.state.email,
				name: this.state.name,
				last_name: this.state.lastName,
				nationality: this.state.nationality,
				comments: this.state.comments,
				password: this.state.password,
				thumbnail: this.state.thumbnail
			}
			
			this.props.onboardUser('observer', data, this.props.match.params.invitationCode, '/grab-a-share')
				.then(() => {
					this.setState({isLoading: false})
				})
				.catch(() => {
					this.setState({isLoading: false, isError: true})
				})
		}
	}
	
	private connectLinkedin(props: any) {
		this.setState({isLinkedinLoading: true})
		this.props.authenticateLinkedin(props).then(() => {
			this.setState({isLinkedinLoading: false})
			setTimeout(() => {
				this.validateForm({})
			}, 500)
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate,
	invitationState: state.invite
})

export default connect(mapStateToProps, {
	onboardUser,
	authenticateLinkedin,
	fetchInvitationData
})(InviteObserver)