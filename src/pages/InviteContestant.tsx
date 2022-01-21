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
import Checkbox from '../components/Checkbox'
import LinkedinLogin from '../components/LinkedinLogin'
import { ActionTypeStates } from '../constants/action-types'
import { innovationCategories, nationalityCountries, productCategories } from '../constants/selectOptions'

interface InviteContestantMatchParams {
	invitationCode: string
}

interface InviteContestantProps extends RouteComponentProps<InviteContestantMatchParams> {
	authenticateState: AuthenticateState
	invitationState: InviteState
	onSave: any
	onboardUser: any
	authenticateLinkedin: any
	fetchInvitationData: any
}

interface InviteContestantState {
	email: string
	name: string
	lastName: string
	nationality: string
	bio: string
	productCategories: any[]
	innovationCategories: any[]
	password: string
	passwordRepeat: string
	thumbnail: string
	emailValidation: EmailValidation
	passwordValidation: PasswordValidation
	acceptDisclaimer: boolean
	isValid: boolean
	isLoading: boolean
	isLinkedinLoading: boolean
	isError: boolean
}

class InviteContestant extends React.Component<InviteContestantProps, InviteContestantState> {
	public constructor(props: InviteContestantProps) {
		super(props)
		
		this.state = {
			email: '',
			name: '',
			lastName: '',
			nationality: '',
			bio: '',
			productCategories: [],
			innovationCategories: [],
			password: '',
			passwordRepeat: '',
			thumbnail: '',
			emailValidation: null,
			passwordValidation: null,
			acceptDisclaimer: false,
			isValid: false,
			isLoading: false,
			isLinkedinLoading: false,
			isError: false
		}
	}
	
	public componentDidMount() {
		this.props.fetchInvitationData('contestant', this.props.match.params.invitationCode)
		
		setTimeout(() => {
			this.validateForm({})
		}, 1000)
	}
	
	public componentWillReceiveProps(nextProps: InviteContestantProps) {
		// if ((nextProps.authenticateState.user && nextProps.authenticateState.user.contesting) &&
		// 	nextProps.invitationState.invitationData) {
		//
		// 	const contestId = nextProps.invitationState.invitationData.contestId
		// 	const isParticipating = nextProps.authenticateState.user.contesting.find((j: any) => j.contest_id === contestId)
		// 	if (isParticipating) {
		// 		this.props.history.push(`/contests/${contestId}`)
		// 	}
		// }

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
				email: nextProps.authenticateState.user.email,
				nationality: nextProps.authenticateState.user.nationality,
				bio: nextProps.authenticateState.user.bio,
				productCategories: nextProps.authenticateState.user.productCategories,
				innovationCategories: nextProps.authenticateState.user.innovationCategories
			})
		}
	}
	
	public render() {
		const {isLoading, isValid, acceptDisclaimer} = this.state
		const {invitationState, authenticateState} = this.props
		
		return (
			<div>
				<Helmet>
					<title>Register as a contestant | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="observer-page-heading">
					<div className="container">
						<h1 className="observer-page-heading__title">Register as a contestant</h1>
						{/*<p className="observer-page-heading__caption">*/}
						{/*Register as an observer and have exclusive access to the same tools as our shareholders*/}
						{/*</p>*/}
					</div>
				</div>
				<div className="observer-wrap">
					<div className="observer-container">
						<div className="observer-section">
							{
								(isLoading) && (
									<div className="page-loading">
										<div>
											<em>Registering as a contestant ...</em>
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
															disabled={authenticateState.user !== null}
															required={true}
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
															required={true}
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
															value={this.state.nationality}
															type={InputType.SELECT}
															placeholder="Select your nationality"
															options={nationalityCountries}
															simpleValue={true}
															onChange={(nationality: string) => {
																this.validateForm({nationality})
															}}/>
													</div>
												</div>
												<div className="observer-section__fields_box">
													<div className="observer-section__fields_box_label">
														<label>Bio</label>
													</div>
													<div className="observer-section__fields_box_input">
														<Input
															name="bio"
															placeholder=""
															value={this.state.bio}
															type={InputType.TEXTAREA}
															required={true}
															onChange={(bio: string) => {
																this.validateForm({bio})
															}}/>
													</div>
												</div>
												<div className="observer-section__fields_box">
													<div className="observer-section__fields_box_label">
														<label>Product</label>
														<p className="observer-section__fields_box_label_optional">(Optional)</p>
													</div>
													<div className="observer-section__fields_box_input">
														<Input
															name="productCategories"
															value={this.state.productCategories}
															type={InputType.SELECT}
															placeholder=""
															options={productCategories}
															multi={true}
															simpleValue={true}
															onChange={(v: any) => { this.validateForm({ productCategories: v }) }}/>
													</div>
												</div>
												<div className="observer-section__fields_box">
													<div className="observer-section__fields_box_label">
														<label>Innovation</label>
														<p className="observer-section__fields_box_label_optional">(Optional)</p>
													</div>
													<div className="observer-section__fields_box_input">
														<Input
															name="innovationCategories"
															value={(this.state.innovationCategories && this.state.innovationCategories.length > 0) ?
																this.state.innovationCategories.map((p: any) => p.id) : 0}
															type={InputType.SELECT}
															placeholder=""
															options={innovationCategories}
															multi={true}
															onChange={(v: any) => {
																this.validateForm({
																	innovationCategories: v.map((vv: any) => ({...vv, id: vv.value}))
																})
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
												<div className="observer-section__disclaimer">
													<div className="observer-section__disclaimer__text">
														<h4>CONTESTANT USER’S DISCLAIMER OF USE:</h4>
														
														<p>You are submitting an entry to a product innovation contest. By doing so you might be
															allowed to use https://hubbers.io website as a “Contestant”.</p>
														
														<p>By clicking “I agree”, you agree to be unconditionally bound to Hubbers’s Innovation <a
															target="_blank" href="https://hubbers.io/contest-policy">Contest Policy</a>, Hubbers <a
															target="_blank" href="https://hubbers.io/terms-of-use">Terms of use</a> and Hubbers <a
															target="_blank" href="https://hubbers.io/privacy-policy">Privacy Policy</a>.</p>
														
														<p>In particular, by clicking “I agree” you agree that :</p>
														
														<ul>
															<li>The contest is subject to hubbers’ Terms of Use. If you do not agree with the terms in
																any way, please do not use hubbers's website.
															</li>
															<li>You have carefully read the Contest Rules and the <a
																href="https://hubbers.io/tips-for-contestants">Tips for contestants</a>.
															</li>
															<li>You might be granting, waiving or releasing important legal rights (as per above
																documents). In particular, you are aware that prizes are granted to the winners on the
																condition that he/she agrees and signs a licence agreement with Hubbers to develop,
																produce and sell the proposed product. Please read Article 3 of Hubbers Contest policy.
															</li>
															<li>Your entry does not infringe any intellectual property rights, or any pre-existing
																licensing or commercial rights. Please read Article 9 of Hubbers Contest policy.
															</li>
														</ul>
													</div>
													<div className="observer-section__disclaimer__approve">
														<Checkbox
															text="I have read the disclaimer and agree to signup as a Contestant"
															checked={acceptDisclaimer}
															onChange={() => {
																this.validateForm({acceptDisclaimer: !acceptDisclaimer})
															}}/>
													</div>
												</div>
												<div className="observer-section__submitbtn_box">
													<div className="observer-section__submitbtn">
														<button
															className="btn btn-large btn-cta"
															onClick={() => {
																this.submitForm()
															}}
															disabled={!isValid}>{authenticateState.user ? 'Continue' : 'Register'}</button>
														{
															!isValid && (
																<div className="observer-section__submitbtn__error">
																	Please fill the entire form and accept <br/>the disclaimer before submitting
																</div>
															)
														}
													</div>
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
		const newState: InviteContestantState = {...this.state, ...modifiedState}
		const {email, name, nationality, bio, password, passwordRepeat, acceptDisclaimer} = newState
		
		newState.emailValidation = doEmailValidation(email)
		newState.passwordValidation = doPasswordValidation(password, passwordRepeat)
		
		const isPasswordValid = (this.props.authenticateState.user ||
			newState.passwordValidation >= PasswordValidation.WEAK && passwordRepeat.length > 0)
		
		newState.isValid = newState.emailValidation === EmailValidation.VALID &&
			isPasswordValid &&
			name.length > 0 &&
			nationality.length > 0 &&
			bio.length > 0
			&& acceptDisclaimer
		
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
				bio: this.state.bio,
				productCategories: this.state.productCategories,
				innovationCategories: this.state.innovationCategories,
				password: this.state.password,
				thumbnail: this.state.thumbnail
			}
			
			const redirect = this.props.invitationState.invitationData ?
				`/contests/${this.props.invitationState.invitationData.contestId}` : '/contests'
			
			this.props.onboardUser('contestant', data, this.props.match.params.invitationCode, redirect)
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
})(InviteContestant)