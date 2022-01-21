import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import Input from '../components/Input'
import LinkedinLogin from '../components/LinkedinLogin'

import { InputType, PasswordInputType } from '../constants/enums'
import { State as AuthenticateState } from '../reducers/authenticate'
import { RootState } from '../reducers/index'

import { Link } from 'react-router-dom'
import { authenticateLinkedin, logoutUser, registerUser } from '../actions/authenticate'
import PasswordInput from '../components/PasswordInput'
import Spinner from '../components/Spinner'
import UserThumbnail from '../components/UserThumbnail'
import {
	EmailValidation,
	emailValidation as doEmailValidation,
	PasswordValidation,
	passwordValidation as doPasswordValidation
} from '../utils/validation'

import { parse as parseQueryString } from 'querystring'
import { ActionTypeStates } from '../constants/action-types'

const SignupRoles = require('../data/signupRoles.json')

interface SignupMatchParams {
	role: string
}

interface SignupProps extends Partial<RouteComponentProps<SignupMatchParams>> {
	authenticateState: AuthenticateState
	registerUser: any
	authenticateLinkedin: any
	logoutUser: any
}

interface SignupState {
	email: string
	password: string
	passwordRepeat: string
	emailValidation: EmailValidation
	passwordValidation: PasswordValidation
	isValid: boolean
	isLoading: boolean
	signupStatus: ActionTypeStates
	signupErrorMessage: string
}

class Signup extends React.Component<SignupProps, SignupState> {
	public constructor(props: SignupProps) {
		super(props)
		
		this.state = {
			email: '',
			password: '',
			passwordRepeat: '',
			emailValidation: null,
			passwordValidation: null,
			isValid: false,
			isLoading: false,
			signupStatus: null,
			signupErrorMessage: ''
		}
	}
	
	public render() {
		const {isLoading, isValid, signupStatus, signupErrorMessage} = this.state
		const {authenticateState, match} = this.props
		
		const signupRolesInfo = SignupRoles[match.params.role] || SignupRoles.default
		
		return (
			<div>
				<Helmet>
					<title>Sign Up | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="page-heading">
					<div className="container">
						<h1 className="page-heading__title">Sign up with hubbers</h1>
						<p className="page-heading__caption">
							Hubbers welcomes thinkers, designers, marketers and creators!
						</p>
					</div>
				</div>
				
				<div className="signin-wrap">
					<div className="signin-container">
						{
							(signupStatus === ActionTypeStates.FAILED && signupErrorMessage) && (
								<div className="signin-section__error">{signupErrorMessage}</div>
							)
						}
						{
							(signupStatus === ActionTypeStates.FAILED && !signupErrorMessage) && (
								<div className="signin-section__error">Failed to signup, please try again later</div>
							)
						}
						<div className="signin-section">
							{
								(!authenticateState.user && isLoading) && (
									<div className="signin-section__progress">
										<span className="signin-section__progress__label">Signing Up</span>
										<Spinner name="three-dots" fadeIn="none"/>
									</div>
								)
							}
							{
								(!authenticateState.user && !isLoading) && (
									<div className="signin-section__fields">
										<div className="signin-section__fields__social">
											<LinkedinLogin
												text="Sign up with Linkedin"
												onLogin={(props: any) => {
													this.submitSocial('linkedin', props)
												}}/>
										</div>
										
										<form onSubmit={() => {
											this.submitForm()
										}}>
											<Input
												name="email"
												placeholder="Your e-mail"
												value={this.state.email}
												type={InputType.EMAIL}
												onChange={(email: string) => {
													this.setState({email})
												}}
												onFocusLost={() => {
													this.validateForm({})
												}}/>
											
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
													this.submitForm()
												}}
												className="btn btn-rounded">Sign up
											</button>
										</form>
										
										<div className="signin-section__fields__help">
											<Link to={'/signin'}>Have an account ?</Link>
										</div>
									</div>
								)
							}
							{
								authenticateState.user && (
									<div className="signin-section__user">
										<div className="signin-section__user__caption">You're signed in as</div>
										<UserThumbnail
											name={authenticateState.user.name}
											thumbnailImageUrl={authenticateState.user.thumbnailImageUrl}/>
										<div className="signin-section__user__name">{authenticateState.user.fullName}</div>
										<div className="signin-section__user__cta">
											<Link to={'/'}>Homepage</Link>
											<Link to={'/my-desk'}>My Desk</Link>
											<Link to={'/profile'}>Profile</Link>
											<a onClick={() => {
												this.props.logoutUser()
											}} className="danger">Logout</a>
										</div>
									</div>
								)
							}
							<div className="signin-section__description">
								{
									signupRolesInfo.map((sri: any, i: number) => (
										<div className="signin-section__description__item" key={i}>
											<div className="signin-section__description__item__image"><img src={sri.icon}/></div>
											<div className="signin-section__description__item__content">
												<h3 className="signin-section__description__item__title">{sri.title}</h3>
												<p className="signin-section__description__item__caption">{sri.description}</p>
											</div>
										</div>
									))
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private validateForm(modifiedState?: any) {
		const newState: SignupState = {...this.state, ...modifiedState}
		const {email, password, passwordRepeat} = newState
		
		newState.emailValidation = doEmailValidation(email)
		newState.passwordValidation = doPasswordValidation(password, passwordRepeat)
		newState.isValid = newState.emailValidation === EmailValidation.VALID &&
			newState.passwordValidation >= PasswordValidation.WEAK && passwordRepeat.length > 0
		
		this.setState(newState)
	}
	
	private submitForm() {
		if (this.state.isValid) {
			this.setState({isLoading: true})
			
			const params = parseQueryString(window.location.search.replace('?', ''))
			this.props.registerUser(this.state.email, this.state.password, this.props.match.params.role, params.redirect)
				.then(() => {
					this.setState({
						signupStatus: ActionTypeStates.SUCCESS, signupErrorMessage: '', isLoading: false
					})
				})
				.catch((error: any) => {
					console.log('error', error)
					this.setState({
						signupStatus: ActionTypeStates.FAILED,
						signupErrorMessage: error.response.data.error.message, isLoading: false
					})
				})
		}
	}
	
	private submitSocial(provider: string, props: any) {
		if (provider === 'linkedin') {
			this.setState({isLoading: true})
			this.props.authenticateLinkedin(props)
				.then(() => {
					this.setState({isLoading: false})
				})
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	registerUser,
	authenticateLinkedin,
	logoutUser
})(Signup)