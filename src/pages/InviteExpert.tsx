import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Input from '../components/Input'
import {
	availabilityPriceOptions,
	availabilityScopeOptions,
	availabilityTimeOptions,
	educationDegreeYearsOptions,
	eductionDegreeTypeOptions,
	languageExperienceLevel,
	nationalityCountries
} from '../constants/selectOptions'

import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { InputType, PasswordInputType } from '../constants/enums'
import { State as AuthenticateState } from '../reducers/authenticate'
import { RootState } from '../reducers'
import { State as InviteState } from '../reducers/invite'

import { authenticateLinkedin, onboardUser } from '../actions/authenticate'
import { doGetExpertiseCategory } from '../actions/categories'
import { fetchInvitationData } from '../actions/invite'
import PasswordInput from '../components/PasswordInput'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { EducationRecord, ExpertiseCategoryRecord, LanguageRecord } from '../constants/models'
import {
	EmailValidation,
	emailValidation as doEmailValidation,
	PasswordValidation,
	passwordValidation as doPasswordValidation
} from '../utils/validation'

import Checkbox from '../components/Checkbox'
import Icon from '../components/Icon'

import LinkedinLogin from '../components/LinkedinLogin'

interface InviteExpertMatchParams {
	invitationCode: string
}

interface InviteExpertProps
	extends Partial<RouteComponentProps<InviteExpertMatchParams>> {
	authenticateState: AuthenticateState
	invitationState: InviteState
	onSave: any
	onboardUser: any
	authenticateLinkedin: any
	fetchInvitationData: any
}

interface InviteExpertState {
	name: string
	lastName: string
	email: string
	thumbnail: string
	nationality: string
	bio: string
	emailValidation: EmailValidation
	passwordValidation: PasswordValidation
	
	password: string
	passwordRepeat: string
	
	categories: ExpertiseCategoryRecord[]
	languages: LanguageRecord[]
	education: EducationRecord[]
	
	availabilityScope: string
	availabilityTime: string
	availabilityPrice: string
	
	isPersonalDetailsValid: boolean
	isProfessionalDetailsValid: boolean
	isLoading: boolean
	isLinkedinLoading: boolean
	isError: boolean
	disclaimerAccept: boolean
	
	tabIndex: number
	showHideHeader: any
}

class InviteExpert extends React.Component<InviteExpertProps,
	InviteExpertState> {
	public constructor(props: InviteExpertProps) {
		super(props)
		
		this.state = {
			name: '',
			lastName: '',
			email: '',
			thumbnail: '',
			nationality: '',
			bio: '',
			emailValidation: null,
			passwordValidation: null,
			
			password: '',
			passwordRepeat: '',
			
			categories: [],
			languages: [{language: '', level: ''}],
			education: [{country: '', name: '', title: '', degree: '', year: 0}],
			
			availabilityScope: '',
			availabilityTime: '',
			availabilityPrice: '',
			
			isPersonalDetailsValid: false,
			isProfessionalDetailsValid: false,
			isLoading: false,
			isLinkedinLoading: false,
			isError: false,
			disclaimerAccept: false,
			
			tabIndex: 0,
			showHideHeader: false
		}
	}
	
	public componentDidMount() {
		this.props.fetchInvitationData(
			'expert',
			this.props.match.params.invitationCode
		)
		
		setTimeout(() => {
			this.validateForm({})
		}, 1000)
	}
	
	public componentWillReceiveProps(nextProps: InviteExpertProps) {
		if (
			nextProps.authenticateState.status === ActionTypeStates.FAILED &&
			nextProps.invitationState.invitationData &&
			(this.state.email === '' && this.state.name === '')
		) {
			this.setState({
				name: nextProps.invitationState.invitationData.name,
				lastName: nextProps.invitationState.invitationData.lastName,
				email: nextProps.invitationState.invitationData.email
			})
		} else if (
			nextProps.authenticateState.status === ActionTypeStates.SUCCESS &&
			(this.state.email === '' ||
				this.state.name === '' ||
				this.state.lastName === '')
		) {
			this.setState({
				name: nextProps.authenticateState.user.name,
				lastName: nextProps.authenticateState.user.lastName,
				email: nextProps.authenticateState.user.email,
				nationality: nextProps.authenticateState.user.nationality,
				bio: nextProps.authenticateState.user.bio
			})
		}
	}
	
	public showHideHeader() {
		console.log('showHideHeaderState')
		this.setState({
			showHideHeader: !this.state.showHideHeader
		})
	}
	
	public render() {
		const {
			isLoading,
			isPersonalDetailsValid,
			isProfessionalDetailsValid,
			disclaimerAccept,
			categories
		} = this.state
		const {invitationState, authenticateState} = this.props
		
		return (
			<div>
				<Helmet>
					<title>Register as an Expert | Hubbers - Hub of Makers</title>
				</Helmet>
				
				{/* Start New UI */}
				<div className="expert-wrapper">
					<Tabs
						selectedIndex={this.state.tabIndex}
						onSelect={(tabIndex: number) => this.setState({tabIndex})}
						className="expert-container"
					>
						{/* Left Sidebar */}
						<div className="expert-container__left">
							<div className="expert-container__left__header">Header</div>
							<div className="expert-container__left__body">
								<TabList>
									<Tab>
										<div className="expert-section__tabmenu">
											<div className="expert-section__tabmenu__left">
												<img
													src="/images/personal_info_icon_active.jpg"
													alt=""
												/>
												<span>Personal Information</span>
											</div>
											<div className="expert-section__tabmenu__right">
												<span className="countnumber">6</span>
											</div>
										</div>
									</Tab>
									<Tab>
										<div className="expert-section__tabmenu">
											<div className="expert-section__tabmenu__left">
												<img src="/images/professional_info_icon.jpg" alt=""/>
												<span>Professional Information</span>
											</div>
											<div className="expert-section__tabmenu__right">
												<span className="countnumber">4</span>
											</div>
										</div>
									</Tab>
									<Tab>
										<div className="expert-section__tabmenu">
											<div className="expert-section__tabmenu__left">
												<img src="/images/review_icon.png" alt=""/>
												<span>Review</span>
											</div>
											<div className="expert-section__tabmenu__right">
												<span className="countnumber">4</span>
											</div>
										</div>
									</Tab>
								</TabList>
							</div>
							<div className="expert-container__left__footer">
								<p>Signup To Unlock</p>
								<h1>+500 HBB</h1>
								<button>SIGN UP</button>
							</div>
						</div>
						{/* Right Main Content */}
						<div className="expert-container__right">
							{/* Rige Main Content Header */}
							<div
								className={
									'expert-container__right__header' +
									(this.state.showHideHeader ? ' open' : '')
								}
							>
								<div className="expert-container__right__header__left">
									<button
										className="sidemenu_toggle_btn"
										onClick={this.showHideHeader}
									>
										<span/>
										<span/>
										<span/>
									</button>
									<span>
										You are applying as an <b>Expert</b>
									</span>
									<ul className="expert-container__right__header__left__links">
										<li>
											<Link to={'#'}>Product Launcher</Link>
										</li>
										<li>
											<Link to={'#'}>Marketplace</Link>
										</li>
										<li>
											<Link to={'#'}>Product Contest</Link>
										</li>
										<li>
											<Link to={'#'}>Events</Link>
										</li>
									</ul>
								</div>
								<div className="expert-container__right__header__right">
									<button className="sign_in">SIGN IN</button>
									<button className="sign_up">SIGN UP</button>
								</div>
							</div>
							{/* Rige Main Content Body */}
							<div className="expert-container__right__body">
								<TabPanel>
									<div className="personal_info">
										<h2 className="personal_info__title">Personal Info</h2>
										<p className="personal_info__text">
											Tell us about your experience, certificate, and skills.
										</p>
										<p className="personal_info__text">
											This will help Hubbers creators to understand your
											expertise better.
										</p>
									</div>
									<div className="questions_box_wrap personal_info_questions">
										<h4>Question 1/6</h4>
										<h1>What is your name</h1>
										<div className="questions_box two_cols">
											<Input
												name="name"
												placeholder="First Name"
												value={this.state.name}
												type={InputType.TEXT}
												onChange={(name: string) => {
													this.validateForm({name})
												}}
											/>
											<Input
												name="lastName"
												placeholder="Last Name"
												value={this.state.lastName}
												type={InputType.TEXT}
												onChange={(lastName: string) => {
													this.validateForm({lastName})
												}}
											/>
										</div>
										<div className="next_button_box">
											<button className="next_button">
												<span>NEXT</span>
												<img src="/images/next-arrow.png" alt=""/>
											</button>
										</div>
									</div>
								</TabPanel>
								<TabPanel>Professional Info</TabPanel>
								<TabPanel>Personal Info</TabPanel>
							</div>
							
							{/* <div className="expert-container__right__footer">
								<p>Login with ease by connecting your linkedin account</p>
								<button className="linkedin_button">
									<span className="icon icon-linkedin" />
									<span>Connect with Linkedin</span>
								</button>
							</div> */}
							
							{/* Rige Main Content Footer */}
							{(!authenticateState.user || !authenticateState.user.linkedinId) && (
								<div className="expert-container__right__footer">
									{!this.state.isLinkedinLoading && (
										<div>
											<p>Login with ease by connecting your linkedin account</p>
											<LinkedinLogin
												text="Connect with Linkedin"
												onLogin={(props: any) => {
													this.connectLinkedin(props)
												}}
											/>
										</div>
									)}
									{this.state.isLinkedinLoading && (
										<Spinner name="three-dots" fadeIn="none"/>
									)}
								</div>
							)}
						</div>
					</Tabs>
				</div>
				{/* End New UI */}
				
				<div className="expert-page-heading">
					<div className="container">
						<h1 className="expert-page-heading__title">
							Register as an Expert
						</h1>
					</div>
				</div>
				
				<div className="expert-wrap">
					<div className="expert-container">
						<div className="expert-section">
							{isLoading && (
								<div className="page-loading">
									<div>
										<em>Registering as an expert ...</em>
										<Spinner name="three-dots" fadeIn="none"/>
									</div>
								</div>
							)}
							{invitationState.status === ActionTypeStates.INPROGRESS && (
								<div className="page-loading">
									<div>
										<em>Verifying invitation ...</em>
										<Spinner name="three-dots" fadeIn="none"/>
									</div>
								</div>
							)}
							{invitationState.status === ActionTypeStates.FAILED && (
								<div className="page-loading">
									<div>
										<em>Invalid invitation</em>
									</div>
								</div>
							)}
							{invitationState.status === ActionTypeStates.SUCCESS &&
							!isLoading && (
								<div>
									{this.state.isError && (
										<div className="expert-section__error">
											Registration failed, please try again later.
										</div>
									)}
									<div className="expert-section__tabs">
										<Tabs
											selectedIndex={this.state.tabIndex}
											onSelect={(tabIndex: number) =>
												this.setState({tabIndex})
											}
										>
											<TabList>
												<Tab>
													<div className="expert-section__tabmenu">
														<span className="countnumber">1</span>Personal
														Info
													</div>
												</Tab>
												<Tab>
													<div className="expert-section__tabmenu">
														<span className="countnumber">2</span>Professional
														Info
													</div>
												</Tab>
												<Tab>
													<div className="expert-section__tabmenu">
														<span className="countnumber">3</span>Complete
													</div>
												</Tab>
											</TabList>
											<TabPanel>
												<div className="expert-section__personalinfo_detial__heading">
													<p className="expert-section__personalinfo_detial__title">
														Personal Info
													</p>
													<p className="expert-section__personalinfo_detial__caption">
														Tell us about your experience, certificates, and
														skills. This will help Hubbers creators to
														understand your expertise better.
													</p>
												</div>
												<div className="expert-section__personalinfo_detial__body">
													{(!authenticateState.user ||
														!authenticateState.user.linkedin) && (
														<div className="signin-section__fields__social">
															{!this.state.isLinkedinLoading && (
																<div>
																	<p>
																		Login with ease by connecting your
																		linkedin account
																	</p>
																	<LinkedinLogin
																		text="Connect with Linkedin"
																		onLogin={(props: any) => {
																			this.connectLinkedin(props)
																		}}
																	/>
																</div>
															)}
															{this.state.isLinkedinLoading && (
																<Spinner name="three-dots" fadeIn="none"/>
															)}
														</div>
													)}
													<div className="expert-section__personalinfo_detial__row_language_add">
														<div className="expert-section__personalinfo_detial__input-label">
															<label>Name</label>
														</div>
														<div className="expert-section__personalinfo_detial__inputfeilds two-col">
															<Input
																name="name"
																placeholder="First Name"
																value={this.state.name}
																type={InputType.TEXT}
																onChange={(name: string) => {
																	this.validateForm({name})
																}}
															/>
															<Input
																name="lastName"
																placeholder="Last Name"
																value={this.state.lastName}
																type={InputType.TEXT}
																onChange={(lastName: string) => {
																	this.validateForm({lastName})
																}}
															/>
														</div>
													</div>
													<div className="expert-section__personalinfo_detial__body">
														{(!authenticateState.user ||
															!authenticateState.user.linkedinId) && (
															<div className="signin-section__fields__social">
																{!this.state.isLinkedinLoading && (
																	<div>
																		<p>
																			Login with ease by connecting your
																			linkedin account
																		</p>
																		<LinkedinLogin
																			text="Connect with Linkedin"
																			onLogin={(props: any) => {
																				this.connectLinkedin(props)
																			}}
																		/>
																	</div>
																)}
																{this.state.isLinkedinLoading && (
																	<Spinner name="three-dots" fadeIn="none" />
																)}
															</div>
														)}
														<div className="expert-section__personalinfo_detial__row_language_add">
															<div className="expert-section__personalinfo_detial__input-label">
																<label>Name</label>
															</div>
															<div className="expert-section__personalinfo_detial__inputfeilds two-col">
																<Input
																	name="name"
																	placeholder="First Name"
																	value={this.state.name}
																	type={InputType.TEXT}
																	onChange={(name: string) => {
																		this.validateForm({ name })
																	}}
																/>
																<Input
																	name="lastName"
																	placeholder="Last Name"
																	value={this.state.lastName}
																	type={InputType.TEXT}
																	onChange={(lastName: string) => {
																		this.validateForm({ lastName })
																	}}
																/>
															</div>
														</div>
														<div className="expert-section__personalinfo_detial__inputfeilds">
															<Input
																name="email"
																placeholder=""
																value={this.state.email}
																type={InputType.EMAIL}
																disabled={authenticateState.user !== null}
																onChange={(email: string) =>
																	this.validateForm({email})
																}
															/>
														</div>
													</div>
													<div className="expert-section__personalinfo_detial__row_language_add">
														<div className="expert-section__personalinfo_detial__input-label">
															<label>Nationality</label>
														</div>
														<div className="expert-section__personalinfo_detial__inputfeilds">
															<Input
																name="nationality"
																placeholder="Select your nationality"
																value={this.state.nationality}
																type={InputType.SELECT}
																options={nationalityCountries}
																simpleValue={true}
																onChange={(nationality: string) =>
																	this.validateForm({nationality})
																}
															/>
														</div>
													</div>
													{!authenticateState.user && (
														<div className="expert-section__personalinfo_detial__row_language_add">
															<div className="expert-section__personalinfo_detial__input-label">
																<label>Password</label>
															</div>
															<div className="expert-section__personalinfo_detial__inputfeilds">
																<div className="expert-section__personalinfo_detial__inputfeilds__row">
																	<PasswordInput
																		name="password"
																		placeholder=""
																		value={this.state.password}
																		type={PasswordInputType.VALIDATE}
																		onChange={(password: string) =>
																			this.validateForm({password})
																		}
																	/>
																	
																	<PasswordInput
																		name="password-repeat"
																		placeholder=""
																		value={this.state.passwordRepeat}
																		type={PasswordInputType.MATCH}
																		isValid={
																			this.state.password ===
																			this.state.passwordRepeat
																		}
																		onChange={(passwordRepeat: string) =>
																			this.validateForm({passwordRepeat})
																		}
																	/>
																</div>
															</div>
														</div>
													)}
													<div className="expert-section__personalinfo_detial__row">
														<div className="expert-section__personalinfo_detial__imguploadbox">
															<div className="expert-section__personalinfo_detial__imguploadbox_inner">
																<UserThumbnailUpload
																	autoUpload={true}
																	thumbnailImageUrl={this.state.thumbnail}
																	onUpload={(thumbnail: string) =>
																		this.validateForm({thumbnail})
																	}
																/>
															</div>
														</div>
														<div className="expert-section__personalinfo_detial__describefeild">
															<Input
																name="describe"
																placeholder="Describe yourself"
																value={this.state.bio}
																type={InputType.TEXTAREA}
																onChange={(bio: string) =>
																	this.validateForm({bio})
																}
															/>
														</div>
													</div>
													<div className="expert-section__personalinfo_detial__row">
														<div className="expert-section__personalinfo_detial__continuebtn">
															<button
																className="btn btn-medium btn-cta"
																onClick={() => {
																	this.setState({tabIndex: 1})
																}}
																disabled={!isPersonalDetailsValid}
															>
																CONTINUE
															</button>
														</div>
													</div>
												</div>
											</TabPanel>
											<TabPanel>
												<div className="expert-section__professionalinfo_detial__heading">
													<p className="expert-section__professionalinfo_detial__title">
														Professional Info
													</p>
													<p className="expert-section__professionalinfo_detial__caption">
														This is your time to shine. Let potential buyers
														know what you do best and how you gained your
														skills, certifications and experience.
													</p>
												</div>
												<div
													className="expert-section__professionalinfo_detial__body
														expert-section__personalinfo_detial__body"
												>
													<div className="expert-section__professionalinfo_detial__row_second">
														<div className="expert-section__professionalinfo_detial__labelbox">
															<label>Your Expertise</label>
														</div>
														<div className="expert-section__personalinfo_detial__inputfeildsbox">
															<div className="expert-section__personalinfo_detial__inputfeildsbox_inner">
																<div className="expert-section__personalinfo_detial__inputfeildsbox_inner_first">
																	<Input
																		name="categories"
																		value={this.state.categories}
																		type={InputType.ASYNC_SELECT}
																		placeholder="Select your expertise"
																		options={doGetExpertiseCategory}
																		multi={true}
																		simpleValue={true}
																		onChange={(c: any) => {
																			this.validateForm({categories: c})
																		}}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="expert-section__personalinfo_detial__row_language_add">
														<div className="expert-section__personalinfo_detial__input-label">
															<label>Languages</label>
														</div>
														<div className="expert-section__personalinfo_detial__inputfeilds">
															{this.state.languages &&
															this.state.languages.map(
																(l: LanguageRecord, i: number) => (
																	<div
																		className="expert-section__personalinfo_detial__inputfeilds__row"
																		key={i}
																	>
																		<div className="expert-section__personalinfo_detial__inputfeilds__languageinput">
																			<Input
																				name="language"
																				placeholder="Language"
																				value={l.language}
																				type={InputType.TEXT}
																				onChange={(language: string) => {
																					this.updateLanguage(i, {
																						language
																					})
																				}}
																			/>
																		</div>
																		<div className="expert-section__personalinfo_detial__inputfeilds__selectbox">
																			<Input
																				name="languageExperience"
																				placeholder="Experience"
																				value={l.level}
																				type={InputType.SELECT}
																				options={languageExperienceLevel}
																				simpleValue={true}
																				onChange={(level: string) => {
																					this.updateLanguage(i, {level})
																				}}
																			/>
																		</div>
																		<div className="expert-section__personalinfo_detial__inputfeilds__addbtn">
																			{i ===
																			this.state.languages.length - 1 && (
																				<button
																					disabled={!l.language || !l.level}
																					onClick={() => {
																						this.addLanguage()
																					}}
																					className="btn btn-outline"
																				>
																					Add
																				</button>
																			)}
																			{i <
																			this.state.languages.length - 1 && (
																				<button
																					onClick={() => {
																						this.removeLanguage(i)
																					}}
																					className="btn btn-outline btn-danger"
																				>
																					Remove
																				</button>
																			)}
																		</div>
																	</div>
																)
															)}
														</div>
													</div>
													<div className="expert-section__professionalinfo_detial__row_third">
														<div className="expert-section__professionalinfo_detial__labelbox">
															<label>Education</label>
														</div>
														{this.state.education &&
														this.state.education.map(
															(e: EducationRecord, i: number) => (
																<div
																	className="expert-section__personalinfo_detial__inputfeildsbox"
																	key={i}
																>
																	<div className="expert-section__personalinfo_detial__inputfeildsbox_inner1">
																		<div className="expert-section__personalinfo_detial__inputfeildsbox_inner_first">
																			<Input
																				name="educationCountry"
																				placeholder="Country"
																				value={e.country}
																				multi={false}
																				type={InputType.SELECT}
																				options={nationalityCountries}
																				simpleValue={true}
																				onChange={(country: string) => {
																					this.updateEducation(i, {
																						country
																					})
																				}}
																			/>
																		</div>
																		<div className="expert-section__personalinfo_detial__inputfeildsbox_inner_second">
																			<Input
																				name="educationName"
																				placeholder="College / University Name"
																				value={e.name}
																				type={InputType.TEXT}
																				onChange={(name: string) => {
																					this.updateEducation(i, {name})
																				}}
																			/>
																		</div>
																	</div>
																	
																	<div className="expert-section__personalinfo_detial__inputfeildsbox_inner2">
																		<div className="expert-section__personalinfo_detial__inputfeildsbox_inner_first">
																			<Input
																				name="educationTitle"
																				placeholder="Title"
																				value={e.title}
																				multi={false}
																				type={InputType.SELECT}
																				options={eductionDegreeTypeOptions}
																				simpleValue={true}
																				onChange={(title: string) => {
																					this.updateEducation(i, {title})
																				}}
																			/>
																		</div>
																		<div className="expert-section__personalinfo_detial__inputfeildsbox_inner_second">
																			<Input
																				name="educationDegree"
																				placeholder="Degree"
																				value={e.degree}
																				type={InputType.TEXT}
																				onChange={(degree: string) => {
																					this.updateEducation(i, {
																						degree
																					})
																				}}
																			/>
																		</div>
																		<div className="expert-section__personalinfo_detial__inputfeildsbox_inner_third">
																			<Input
																				name="educationYear"
																				placeholder="Year"
																				value={e.year}
																				multi={false}
																				type={InputType.ASYNC_SELECT}
																				options={() =>
																					educationDegreeYearsOptions()
																				}
																				simpleValue={true}
																				onChange={(year: string) => {
																					this.updateEducation(i, {year})
																				}}
																			/>
																		</div>
																	</div>
																</div>
															)
														)}
													</div>
													<div className="expert-section__professionalinfo_detial__row_fourth">
														<div className="expert-section__professionalinfo_detial__labelbox">
															<label>Availability</label>
														</div>
														<div className="expert-section__personalinfo_detial__inputfeildsbox">
															<div className="expert-section__personalinfo_detial__inputfeildsbox_inner">
																<div className="expert-section__personalinfo_detial__inputfeildsbox_inner_first">
																	<Input
																		name="availabilityScope"
																		placeholder="Scope"
																		value={this.state.availabilityScope}
																		multi={false}
																		type={InputType.SELECT}
																		options={availabilityScopeOptions}
																		simpleValue={true}
																		onChange={(availabilityScope: string) => {
																			this.validateForm({availabilityScope})
																		}}
																	/>
																</div>
																<div className="expert-section__personalinfo_detial__inputfeildsbox_inner_second">
																	<Input
																		name="availabilityTime"
																		placeholder="Hours"
																		value={this.state.availabilityTime}
																		multi={false}
																		type={InputType.SELECT}
																		options={availabilityTimeOptions}
																		simpleValue={true}
																		onChange={(availabilityTime: string) => {
																			this.validateForm({availabilityTime})
																		}}
																	/>
																</div>
																<div className="expert-section__personalinfo_detial__inputfeildsbox_inner_third">
																	<Input
																		name="availabilityPrice"
																		placeholder="Price"
																		value={this.state.availabilityPrice}
																		multi={false}
																		type={InputType.SELECT}
																		options={availabilityPriceOptions}
																		simpleValue={true}
																		onChange={(availabilityPrice: string) => {
																			this.validateForm({availabilityPrice})
																		}}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="expert-section__professionalinfo_detial__continuebtn_row">
														<div className="expert-section__professionalinfo_detial__continuebtn">
															<button
																className="btn btn-medium btn-outline"
																onClick={() => {
																	this.setState({tabIndex: 0})
																}}
															>
																<Icon name="chevron-left"/>
																Back
															</button>
															<button
																className="btn btn-medium btn-cta"
																onClick={() => {
																	this.setState({tabIndex: 2})
																}}
																disabled={!isProfessionalDetailsValid}
															>
																CONTINUE
															</button>
														</div>
													</div>
												</div>
											</TabPanel>
											<TabPanel>
												{/*<div className="expert-section__complete_detial__heading">*/}
												{/*<p className="expert-section__complete_detial__title">Complete</p>*/}
												{/*<p className="expert-section__complete_detial__caption">*/}
												{/*Tell us about your experience, certificates,*/}
												{/*and skills. This will help Hubbers creators to understand your expertise better.*/}
												{/*</p>*/}
												{/*</div>*/}
												<div className="expert-section__complete_detial__body">
													<div className="expert-section__complete_detail__disclaimer">
														<br/>
														<h3>Congratulations!</h3>
														<p>Your registration is complete!</p>
														<p>
															Now you are listed at our Marketplace, and you
															can start selling.
															<br/>A warm welcome to the Hubbers community!
														</p>
														<br/>
														<Checkbox
															text="I agree to register as an expert"
															checked={disclaimerAccept}
															onChange={() => {
																this.setState({
																	disclaimerAccept: !disclaimerAccept
																})
															}}
														/>
														<br/>
														<div className="expert-section__complete_detail__action">
															<button
																className="btn btn-medium btn-outline btn-back"
																onClick={() => {
																	this.setState({tabIndex: 1})
																}}
															>
																<Icon name="chevron-left"/>
																Back
															</button>
															<button
																className="btn btn-medium btn-cta"
																onClick={() => {
																	this.submitForm()
																}}
																disabled={
																	!isProfessionalDetailsValid ||
																	!isPersonalDetailsValid ||
																	!disclaimerAccept
																}
															>
																Register
															</button>
														</div>
													</div>
												</div>
											</TabPanel>
										</Tabs>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	/**
	 * Helper function to add a new language record
	 *
	 */
	private addLanguage() {
		this.validateForm({
			languages: [...this.state.languages, {language: '', level: ''}]
		})
	}
	
	/**
	 * Helper function to remove a language
	 *
	 * @param {number} index index of the item to remove
	 */
	private removeLanguage(index: number) {
		this.state.languages.splice(index, 1)
		this.validateForm({languages: this.state.languages})
	}
	
	/**
	 * Helper function to update the contents of an existing language record
	 *
	 * @param {number} index index of the item to update
	 * @param updatedLanguageObject updated partial language record
	 */
	private updateLanguage(index: number, updatedLanguageObject: any) {
		const languages = this.state.languages
		languages[index] = {...languages[index], ...updatedLanguageObject}
		
		this.validateForm({languages})
	}
	
	/**
	 * Helper function to add a new language record
	 *
	 */
	private addEducation() {
		this.validateForm({
			education: [
				...this.state.education,
				{
					country: '',
					name: '',
					title: '',
					degree: '',
					year: 0
				}
			]
		})
	}
	
	/**
	 * Helper function to remove a education
	 *
	 * @param {number} index index of the item to remove
	 */
	private removeEducation(index: number) {
		this.state.education.splice(index, 1)
		this.validateForm({education: this.state.education})
	}
	
	/**
	 * Helper function to update the contents of an existing education record
	 *
	 * @param {number} index index of the item to update
	 * @param updatedEducationObject updated partial education record
	 */
	private updateEducation(index: number, updatedEducationObject: any) {
		const education = this.state.education
		education[index] = {...education[index], ...updatedEducationObject}
		
		this.validateForm({education})
	}
	
	/**
	 * Helper function to update the existing state while performing the necessary validation
	 *
	 * @param modifiedState
	 */
	private validateForm(modifiedState?: any) {
		const newState: InviteExpertState = {...this.state, ...modifiedState}
		const {email, password, passwordRepeat} = newState
		
		newState.emailValidation = doEmailValidation(email)
		newState.passwordValidation = doPasswordValidation(password, passwordRepeat)
		
		const isPasswordValid =
			this.props.authenticateState.user ||
			(newState.passwordValidation >= PasswordValidation.WEAK &&
				passwordRepeat.length > 0)
		
		newState.isPersonalDetailsValid =
			newState.emailValidation === EmailValidation.VALID &&
			isPasswordValid &&
			newState.name !== '' &&
			// && newState.lastName !== ''
			newState.nationality !== '' &&
			newState.bio !== ''
		
		newState.isProfessionalDetailsValid =
			newState.categories.length > 0 &&
			(newState.languages.length > 0 &&
				(newState.languages[0].language !== '' &&
					newState.languages[0].level !== '')) &&
			// && (newState.education.length > 0 && ())
			newState.availabilityScope !== '' &&
			newState.availabilityTime !== '' &&
			newState.availabilityPrice !== ''
		
		this.setState(newState)
	}
	
	/**
	 * Helper function to submit the valid invitation
	 *
	 */
	private submitForm() {
		if (
			this.state.isPersonalDetailsValid &&
			this.state.isProfessionalDetailsValid
		) {
			this.setState({isLoading: true, isError: false})
			
			const {
				name,
				lastName,
				email,
				thumbnail,
				nationality,
				bio,
				password,
				categories,
				languages,
				education,
				availabilityScope,
				availabilityTime,
				availabilityPrice
			} = this.state
			
			this.props
				.onboardUser(
					'expert',
					{
						name,
						lastName,
						email,
						thumbnail,
						nationality,
						bio,
						password,
						categories,
						languages,
						education,
						availabilityScope,
						availabilityTime,
						availabilityPrice
					},
					this.props.match.params.invitationCode,
					'/expert-desk'
				)
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

export default connect(
	mapStateToProps,
	{
		onboardUser,
		authenticateLinkedin,
		fetchInvitationData
	}
)(InviteExpert)
