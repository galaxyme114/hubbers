import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Input from '../components/Input'
import LinkedinLogin from '../components/LinkedinLogin'
import Spinner from '../components/Spinner'
import UserThumbnail from '../components/UserThumbnail'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'

import { authenticateLinkedin, loginUser, logoutUser } from '../actions/authenticate'
import { State as AuthenticateState } from '../reducers/authenticate'
import { RootState } from '../reducers/index'

import { parse as parseQueryString } from 'querystring'

interface SigninProps {
	authenticateState: AuthenticateState
	loginUser: any
	authenticateLinkedin: any
	logoutUser: any
}

interface SigninState {
	email: string
	password: string
	isValid: boolean
	isLoading: boolean
	loginStatus: ActionTypeStates
}

class Signin extends React.Component<SigninProps, SigninState> {
	public constructor(props: SigninProps) {
		super(props)
		
		this.state = {
			email: '',
			password: '',
			isValid: false,
			isLoading: false,
			loginStatus: null
		}
	}
	
	public componentDidMount() {
		setTimeout(() => {
			this.validateForm({})
		}, 500)
	}
	
	public render() {
		const {isValid, isLoading, loginStatus} = this.state
		const {authenticateState} = this.props
		
		return (
			<div>
				<Helmet>
					<title>Sign In | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="page-heading">
					<div className="container">
						<h1 className="page-heading__title">Welcome back to hubbers</h1>
						<p className="page-heading__caption">
							{/*Dear future contestant of great innovative contest, welcome on HUBBERS, <br/>*/}
							{/*the creative HUB for innovative consumer products.*/}
						</p>
					</div>
				</div>
				
				<div className="signin-wrap">
					<div className="signin-container">
						{
							loginStatus === ActionTypeStates.FAILED && (
								<div className="signin-section__error">
									Please Enter Correct Email Address and Password
								</div>
							)
						}
						<div className="signin-section">
							{
								(!authenticateState.user && isLoading) && (
									<div className="signin-section__progress">
										<span className="signin-section__progress__label">Signing In</span>
										<Spinner name="three-dots" fadeIn="none"/>
									</div>
								)
							}
							{
								(!authenticateState.user && !isLoading) && (
									<div className="signin-section__fields">
										<div className="signin-section__fields__social">
											<LinkedinLogin
												text="Sign in with Linkedin"
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
													this.validateForm({email})
												}}
												onFocusLost={() => {
													this.validateForm({})
												}}/>
											
											<Input
												name="password"
												placeholder="Your password"
												value={this.state.password}
												type={InputType.PASSWORD}
												onChange={(password: string) => {
													this.validateForm({password})
												}}
												onFocusLost={() => {
													this.validateForm({})
												}}/>
											
											<button
												type="submit"
												disabled={!isValid}
												onClick={() => {
													this.submitForm()
												}}
												className="btn btn-rounded">Sign in
											</button>
										</form>
										
										<div className="signin-section__fields__help">
											<Link to={'/signup'}>Need an account ?</Link>
											<Link to={'/reset-password'}>Forgot password ?</Link>
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
											thumbnailImageUrl={authenticateState.user.thumbnailImageUrl} />
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
								<div className="signin-section__description__item">
									<div className="signin-section__description__item__image">
										<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/signup/signup-feature-1.png"/>
									</div>
									<div className="signin-section__description__item__content">
										<h3 className="signin-section__description__item__title">Earn Money</h3>
										<p className="signin-section__description__item__caption">
											Invest in innovative and exciting products.
										</p>
									</div>
								</div>
								<div className="signin-section__description__item">
									<div className="signin-section__description__item__image">
										<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/signup/signup-feature-2.png"/>
									</div>
									<div className="signin-section__description__item__content">
										<h3 className="signin-section__description__item__title">Be a judge</h3>
										<p className="signin-section__description__item__caption">
											Become a part of creating entirely new products or further developing existing products.
										</p>
									</div>
								</div>
								<div className="signin-section__description__item">
									<div className="signin-section__description__item__image">
										<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/signup/signup-feature-3.png"/>
									</div>
									<div className="signin-section__description__item__content">
										<h3 className="signin-section__description__item__title">Become a super-expert</h3>
										<p className="signin-section__description__item__caption">
											Share your opinion on hubbers contest and help manage product innovation projects.
										</p>
									</div>
								</div>
								<div className="signin-section__description__item">
									<div className="signin-section__description__item__image">
										<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/signup/signup-feature-4.png"/>
									</div>
									<div className="signin-section__description__item__content">
										<h3 className="signin-section__description__item__title">Support new talents</h3>
										<p className="signin-section__description__item__caption">
											Inspire, get involved and provide help making creator's "dream product" come true.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private validateForm(modifiedState?: any) {
		const {email, password} = this.state
		this.setState({...this.state, ...modifiedState, isValid: (email && password)})
	}
	
	private submitForm() {
		if (this.state.isValid) {
			this.setState({isLoading: true})
			
			const params = parseQueryString(window.location.search.replace('?', ''))
			this.props.loginUser(this.state.email, this.state.password, params.redirect)
				.then(() => {
					this.setState({loginStatus: ActionTypeStates.SUCCESS, isLoading: false})
				})
				.catch(() => {
					this.setState({loginStatus: ActionTypeStates.FAILED, isLoading: false})
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
	loginUser,
	authenticateLinkedin,
	logoutUser
})(Signin)