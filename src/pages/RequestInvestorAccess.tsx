import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import HeroBanner from '../components/HeroBanner'

import { fetchContests } from '../actions/homepage'

import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { doRequestAccessObserver } from '../actions/requestAccessObserver'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { State as HomeContestListState } from '../reducers/homeContestsList'
import { RootState } from '../reducers/index'
import { EmailValidation, emailValidation as doEmailValidation } from '../utils/validation'

import { parse as parseQueryString } from 'querystring'

const expertiseItems = require('../data/expertiseItems.json').items

interface RequestInvestorAccessProps extends RouteComponentProps<any> {
	stateContests: HomeContestListState
	fetchContests: any
}

interface RequestInvestorAccessState {
	email: string
	name: string
	observerStatus: ActionTypeStates
	emailValidation: EmailValidation
	isValid: boolean
}

class RequestInvestorAccess extends React.Component<RequestInvestorAccessProps, RequestInvestorAccessState> {
	public constructor(props: RequestInvestorAccessProps) {
		super(props)
		
		this.state = {
			email: '',
			name: '',
			emailValidation: null,
			observerStatus: null,
			isValid: false
		}
	}
	
	public componentDidMount() {
		this.props.fetchContests()
	}
	
	public render() {
		const {stateContests} = this.props
		const {observerStatus, isValid} = this.state
		
		return (
			<div>
				<Helmet>
					<title>Request Investor Access - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="/images/requestinvestor_banner.png"
					title="<small>Hubbers Grab-a-share</small>"
					caption=""
					description="INVITATION ONLY"
					cta={null}
					overlay={true}/>
				<div className="access-grabshare">
					<div className="container">
						<div className="access-grabshare__items">
							<div className="access-grabshare__items_title">
								How to qualify for Grab-a-Share
							</div>
							<div className="access-grabshare__item">
								<div className="access-grabshare__item__icon">
									<img src="/images/heart_icon.png" className="icon1"/>
								</div>
								<div className="access-grabshare__item__caption">
									You love Hubbers, the hub of makers where innovative and creative
									consumer products are created.
								</div>
							</div>
							<div className="access-grabshare__item">
								<div className="access-grabshare__item__icon">
									<img
										src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/signup/signup-feature-3.png"
										className="icon2"/>
								</div>
								<div className="access-grabshare__item__caption">
									You love Hubbers, the hub of makers where innovative and creative
									consumer products are created.
								</div>
							</div>
							<div className="access-grabshare__item">
								<div className="access-grabshare__item__icon">
									<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/signup/signup-feature-2.png"
									     className="icon3"/>
								</div>
								<div className="access-grabshare__item__caption">
									You love Hubbers, the hub of makers where innovative and creative
									consumer products are created.
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="allows-useto">
					<div className="container">
						<div className="allows-useto__title">The Grab-a-Share Dashboard allows you to:</div>
						
						<div className="allows-useto__items">
							<div className="allows-useto__item">
								<Link to="/become-a-creator">
									<div
										className="allows-useto__item__image"
										style={{
											backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
												'tiles/become-a-creator.png)'
										}}/>
									<div className="allows-useto__item__caption">
										Be part of a creative and inspiring founders community
									</div>
								</Link>
							</div>
							<div className="allows-useto__item">
								<Link to="/become-an-expert">
									<div
										className="allows-useto__item__image"
										style={{
											backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
												'tiles/become-an-expert.png)'
										}}/>
									<div className="allows-useto__item__caption">
										Stay informed about shares and be the first to acquire them
									</div>
								</Link>
							</div>
							<div className="allows-useto__item">
								<Link to="/grab-a-share">
									<div
										className="allows-useto__item__image"
										style={{
											backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
												'tiles/become-an-investor.png)'
										}}/>
									<div className="allows-useto__item__caption">
										Receive regular updates about Hubbers :
									</div>
									<div className="allows-useto__item__subcaption">
										existing shareholders
									</div>
									<div className="allows-useto__item__subcaption">
										financial statements
									</div>
									<div className="allows-useto__item__subcaption">
										receive regular company updates
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="access-grab-desh">
					<div className="container">
						<div className="access-grab-desh__items_title">
							Access to Grab-a-Share dashboard:
						</div>
						<div className="access-grab-desh__items">
							<div className="access-grab-desh__item">
								<div className="access-grab-desh__icon">
									<img src="/images/linked_icon.png"/>
								</div>
								<div className="access-grab-desh__item_title">
									Qualify through Hubbers directly via Linkedin.
								</div>
								<div className="access-grab-desh__link">
									Check out who we are
								</div>
							</div>
							<div className="access-grab-desh__item">
								<div className="access-grab-desh__icon">
									<img src="/images/msg_icon.png"/>
								</div>
								<div className="access-grab-desh__item_title">
									Ask a Hubbers shareholder to invite you.
								</div>
								<div className="access-grab-desh__caption">
									Explain your motivation for becoming a Hubbers shareholder. Making a return on our stock shouldn't be
									the only reason.
								</div>
							</div>
						</div>
						<div className="access-grab-desh__form">
							{
								observerStatus === ActionTypeStates.INPROGRESS && (
									<div className="access-grab-desh__form__loading">
										<Spinner name="three-dots" fadeIn="none"/>
									</div>
								)
							}
							{
								observerStatus === ActionTypeStates.FAILED && (
									<div className="access-grab-desh__form__notice access-grab-desh__form__notice--danger">
										Please Enter Name
									</div>
								)
							}
							{
								observerStatus === ActionTypeStates.SUCCESS && (
									<div className="access-grab-desh__form__notice access-grab-desh__form__notice--success">
										Your Request has been Submited successfully!
									</div>
								)
							}
							{
								observerStatus !== ActionTypeStates.INPROGRESS && (
									<form onSubmit={() => {
										this.submitForm()
									}}>
										<Input
											name="email"
											placeholder="Your email"
											type={InputType.EMAIL}
											value={this.state.email}
											onChange={(value: string) => {
												this.emailvalidateForm({email: value})
											}}
										/>
										<Input
											name="message"
											placeholder="Enter Name"
											type={InputType.TEXT}
											value={this.state.name}
											onChange={(name: string) => {
												this.setState({name})
											}}
										/>
										<div className="access-grab-desh__form_btn">
											<button
												className="btn"
												disabled={!isValid}
												onClick={() => {
													this.submitForm()
												}}>Send Now
											</button>
										</div>
									</form>
								)
							}
						</div>
					</div>
				</div>
			
			</div>
		)
	}
	
	private emailvalidateForm(modifiedState?: any) {
		const newState: RequestInvestorAccessState = {...this.state, ...modifiedState}
		const {email} = newState
		
		newState.emailValidation = doEmailValidation(email)
		newState.isValid = newState.emailValidation === EmailValidation.VALID
		
		this.setState(newState)
	}
	
	private submitForm() {
		this.setState({observerStatus: ActionTypeStates.INPROGRESS})
		const params = parseQueryString(window.location.search.replace('?', ''))
		doRequestAccessObserver(this.state.email, this.state.name)
			.then(() => {
				this.setState({
					observerStatus: ActionTypeStates.SUCCESS,
					email: '',
					name: '',
					emailValidation: null,
					isValid: false
				})
			}).catch(() => {
			this.setState({observerStatus: ActionTypeStates.FAILED})
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	stateContests: state.homeContestsList
})

export default connect(mapStateToProps, {
	fetchContests
})(RequestInvestorAccess)