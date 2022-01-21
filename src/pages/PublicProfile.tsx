import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { ActionTypeStates } from '../constants/action-types'

import { fetchPublicProfile, saveProfile } from '../actions/profile'
import { RootState } from '../reducers'
import { State as PublicProfileDataState } from '../reducers/publicProfile'

import Slider from 'react-slick'
import Spinner from '../components/Spinner'
import UserFollow from '../containers/UserFollow'
import { slugify } from '../utils/stringUtils'
import Icon from '../components/Icon'
import { Link } from 'react-router-dom'
import { PublicProfileRecord } from '../constants/models'

import {
	communityContributionCarousel,
} from '../constants/carouselSettings'
import { State as AuthenticateUserState } from '../reducers/authenticate'
import { authenticateUser } from '../actions/authenticate'
import { InputType } from '../constants/enums'
import Input from '../components/Input'
import UserThumbnailUpload from '../components/UserThumbnailUpload'
import { languages } from '../constants/selectOptions'
import { doGetSkills } from '../actions/categories'
import PublicProfileMetadata from '../components/PublicProfileMetadata'



interface PublicProfileMatchParams {
	id: string
	slug: string
}

interface PublicProfileProps extends RouteComponentProps<PublicProfileMatchParams> {
	state: PublicProfileDataState
	fetchPublicProfile: any
	authenticateState: AuthenticateUserState
	authenticateUser: any
	saveProfile: any

}

interface PublicProfileProps {
	saveProfile: any

}

interface PublicProfileState {
	isEditing: boolean
	profile: PublicProfileRecord
	isProfilePristine: boolean

}

class PublicProfile extends React.Component<PublicProfileProps, PublicProfileState> {
	private activitySlider: Slider
	public constructor(props: PublicProfileProps) {
		super(props)
		this.state = {
			isEditing: false,
			profile: null,
			isProfilePristine: true,

		}
	}
	
	public componentDidMount() {
		// console.log(this.props.match.params.slug)
		// const idUrl = `${this.props.match.params.id}/${slugify(this.props.match.params.slug)}`
		this.props.fetchPublicProfile(this.props.match.params.id, this.props.match.params.slug)
		this.props.authenticateUser()
	}
	
	public componentWillReceiveProps(nextProps: PublicProfileProps) {
		const userSlug = nextProps.match.params.slug

		if (nextProps.state.publicProfile && slugify(nextProps.state.publicProfile.name) !== userSlug) {
			this.props.history.replace('/profile/' + nextProps.state.publicProfile._id + '/' +
				slugify(nextProps.state.publicProfile.name))
		}
		if (nextProps.state.publicProfile) {
			this.setState({
				profile: nextProps.state.publicProfile,
			});
		}
	}
	
	public activityPre() {
		this.activitySlider.slickPrev()
	}
	
	public activityNext() {
		this.activitySlider.slickNext()
	}

	public render() {
		const { isEditing, profile } = this.state
		const {state} = this.props
		// const profile = state.profile
		const {authenticateState} = this.props
		console.log("profile",profile)
		return (
			<div className="page-user-profile">
				<Helmet>
					{/* <title>{ (profile && profile.fullName) ? profile.fullName : 'Profile' } | Hubbers - Hub of Makers</title> */}
				</Helmet>
				{
					(state.status === ActionTypeStates.INPROGRESS) && (
						<div className="page-loading">
							<div>
								<em>Loading ...</em>
								<Spinner name="three-dots" fadeIn="none"/>
							</div>
						</div>
					)
				}
				{
					(state.status === ActionTypeStates.SUCCESS && profile) &&   (
						<div className="profile">
							{/* Metadata */}
							<PublicProfileMetadata
								profile={profile}
								authenticate= {authenticateState.user}
								isProfilePristine={this.state.isProfilePristine}
								onEditProfile={(key: string, value: any, save?: boolean) => {
									this.editProfile(key, value, save)
								}}
								onSave={() => {
									this.saveProfile()
								}}/>
							{/* activities */}
							<div className="public-profile-activity">
								<div className="container">
									<div className="public-profile-activity__row">
										<div className="public-profile-activity__row__left">
											<div className="public-profile-activity__row__left__activity_section">
												<div className="activity_section_title">Activities</div>
												<div className="all-activities_items">
													<div className="all-activities_item">
														<div className="caption">{profile.contestCount}</div>
														<div className="title">Contests</div>
													</div>
													<div className="all-activities_item">
														<div className="caption">{profile.projectCounts}</div>
														<div className="title">Projects</div>
													</div>
													<div className="all-activities_item">
														<div className="caption">{profile.eventVisitedCount}</div>
														<div className="title">Events visited</div>
													</div>
												</div>

												<div className="profile_section_title">Profile</div>
												<div className="language_items">
													<div className="language_section_title">Language</div>
													<div className="language_items_items">
														<div className="language_items_item"> 
															{/* {
																isEditing === true ? 
																	<Input
																	name="language"
																	value={profile.languages}
																	type={InputType.SELECT}
																	placeholder=""
																	options={languages}
																	onChange={(value: any) => {
																	this.editProfile('language', value)}}/>
																	
																:											
																	<div>
																		<span>English</span> 
																		<span className="seprator">|</span> 
																		<span>German</span> 
																		<span className="seprator">|</span>
																		<span>Russian</span> 
																		<span className="seprator">|</span>	
																	</div>
															} */}
															<div>
																{
																	(profile.languages && profile.languages.length > 0) ? 
																	<span>
																		{
																			profile.languages && profile.languages.map((op, i) => {
																				<span key={i}>
																					<span>{op.language}</span> 
																					<span className="seprator">|</span> 
																				</span>
																			})
																		}
																	</span> :
																	<span>
																		<span></span> 
																		<span className="seprator">-</span> 
																	</span>
																}
																
															</div>
														</div>
													</div>
												</div>

												<div className="skills_items">
													<div className="skills_section_title">Skills</div>
													<div className="skills_items_items">
														<div className="skills_items_item"> 
															{/* {
																isEditing === true ? 
																	<Input
																	name="skills"
																	value={profile.skills}
																	type={InputType.ASYNC_SELECT}
																	placeholder=""
																	options={doGetSkills}
																	multi={true}
																	onChange={(value: any) => {
																	this.editProfile('skills', value)}}/>
																	
																:											
																	<div>
																		<span>Web Design</span> 
																		<span className="seprator">|</span> 
																		<span>Website development</span> 
																		<span className="seprator">|</span>
																		<span>SEO</span> 
																		<span className="seprator">|</span>
																	</div>
															} */}
															<div>
																{
																	(profile.skills && profile.skills.length > 0) ? 
																	<span>
																		{
																			profile.skills && profile.skills.map((op, i) => {
																				<span key={i}>
																					<span>{op.name}</span> 
																					<span className="seprator">|</span> 
																				</span>
																			})
																		}
																	</span> :
																	<span>
																		<span></span> 
																		<span className="seprator">-</span> 
																	</span>
																}
																
															</div>
														</div>
													</div>
												</div>
												<div className="work-history_items">
													<div className="work-history_section_title">Work history</div>
													<div className="work-history_items_items">
														<div className="work-history_items_item"> 
															<div className="item_breafcase_icon">
																<img src="/images/icon/breafcase_icon.png" />
															</div>
															<div className="work-history__content">
																<div className="position">Founding Partner, Director</div>
																<div className="company">Fervide Business Solutions Inc.</div>
																<div className="type">Dates Employed</div>
																<div className="present">1997 <span>-</span> Present</div>
																<div className="address"><span><img src="/images/icon/pin-icon-red.png" /></span>Vancouver, Canada Area</div>
															</div>
														</div>
														<div className="work-history_items_item"> 
															<div className="item_breafcase_icon">
																<img src="/images/icon/breafcase_icon.png" />
															</div>
															<div className="work-history__content">
																<div className="position">Founding Partner, Director</div>
																<div className="company">Fervide Business Solutions Inc.</div>
																<div className="type">Dates Employed</div>
																<div className="present">1997 <span>-</span> Present</div>
																<div className="address"><span><img src="/images/icon/pin-icon-red.png" /></span>Vancouver, Canada Area</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											
										</div>
										<div className="public-profile-activity__row__right">
											<div className="public-profile-social-media">
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project as a investor</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project as a investor</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project as a investor</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project</div>
													<div className="time">2 days ago</div>
												</div>
												<div className="public-profile-social-media__item">
													<div className="name">Created a connected furniture</div>
													<div className="title">Project</div>
													<div className="time">2 days ago</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* community */}
							<div className="public-profile-community">
								<div className="container">
									<div className="public-profile-community__row">
										<div className="public-profile-community__row__left">
										    <div className="public-profile-community__row__left__community_section">
												<div className="activity-list__title">
													<div>Community Contribution</div>
													<div className="arrow-btns">
														<button className="btn" onClick={() => this.activityPre()}><Icon name="chevron-left"/></button>
														<button className="btn" onClick={() => this.activityNext()}><Icon name="chevron-right"/></button>
													</div>
												</div>
												<div className="activity-list__items">
													<Slider ref={element => this.activitySlider = element} {...communityContributionCarousel}>
														<div className="activity-list__item">
															<div className="activity-list__item__inner">
																<div className="activity-badges"><span>Coordinator</span></div>
																<div className="activity_img" style={{backgroundImage: `url('/images/event_img.png')`}}>
																	<div className="activity_badge_img"
																		style={{backgroundImage: `url('/images/icon/tag_icon.png')`}}>“
																	</div>
																</div>
																<div className="activity_list_content">
																	<div className="activity_list_title">rwewewe</div>
																	<div className="activity_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing
																		elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
																		parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
																		pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
																		nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo
																	</div>
																	<div className="activity_list_Comments">
																		<div className="event_list_date">
																			<img src="/images/icon/comment_icon_green.png"/>
																			<p>123 Comments</p>
																		</div>
																		<div className="event_list_date">
																			<button className="btn">Add comment</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="activity-list__item">
															<div className="activity-list__item__inner">
																<div className="activity-badges"><span>Coordinator</span></div>
																<div className="activity_img" style={{backgroundImage: `url('/images/event_img.png')`}}>
																	<div className="activity_badge_img"
																		style={{backgroundImage: `url('/images/icon/tag_icon.png')`}}>“
																	</div>
																</div>
																<div className="activity_list_content">
																	<div className="activity_list_title">rwewewe</div>
																	<div className="activity_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing
																		elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
																		parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
																		pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
																		nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo
																	</div>
																	<div className="activity_list_Comments">
																		<div className="event_list_date">
																			<img src="/images/icon/comment_icon_green.png"/>
																			<p>123 Comments</p>
																		</div>
																		<div className="event_list_date">
																			<button className="btn">Add comment</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="activity-list__item">
															<div className="activity-list__item__inner">
																<div className="activity-badges"><span>Coordinator</span></div>
																<div className="activity_img" style={{backgroundImage: `url('/images/event_img.png')`}}>
																	<div className="activity_badge_img"
																		style={{backgroundImage: `url('/images/icon/tag_icon.png')`}}>“
																	</div>
																</div>
																<div className="activity_list_content">
																	<div className="activity_list_title">rwewewe</div>
																	<div className="activity_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing
																		elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
																		parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
																		pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
																		nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo
																	</div>
																	<div className="activity_list_Comments">
																		<div className="event_list_date">
																			<img src="/images/icon/comment_icon_green.png"/>
																			<p>123 Comments</p>
																		</div>
																		<div className="event_list_date">
																			<button className="btn">Add comment</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="activity-list__item">
															<div className="activity-list__item__inner">
																<div className="activity-badges"><span>Coordinator</span></div>
																<div className="activity_img" style={{backgroundImage: `url('/images/event_img.png')`}}>
																	<div className="activity_badge_img"
																		style={{backgroundImage: `url('/images/icon/tag_icon.png')`}}>“
																	</div>
																</div>
																<div className="activity_list_content">
																	<div className="activity_list_title">rwewewe</div>
																	<div className="activity_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing
																		elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
																		parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
																		pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
																		nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo
																	</div>
																	<div className="activity_list_Comments">
																		<div className="event_list_date">
																			<img src="/images/icon/comment_icon_green.png"/>
																			<p>123 Comments</p>
																		</div>
																		<div className="event_list_date">
																			<button className="btn">Add comment</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="activity-list__item">
															<div className="activity-list__item__inner">
																<div className="activity-badges"><span>Coordinator</span></div>
																<div className="activity_img" style={{backgroundImage: `url('/images/event_img.png')`}}>
																	<div className="activity_badge_img"
																		style={{backgroundImage: `url('/images/icon/tag_icon.png')`}}>“
																	</div>
																</div>
																<div className="activity_list_content">
																	<div className="activity_list_title">rwewewe</div>
																	<div className="activity_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing
																		elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
																		parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
																		pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
																		nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo
																	</div>
																	<div className="activity_list_Comments">
																		<div className="event_list_date">
																			<img src="/images/icon/comment_icon_green.png"/>
																			<p>123 Comments</p>
																		</div>
																		<div className="event_list_date">
																			<button className="btn">Add comment</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</Slider>
												</div>
											</div>
										</div>
										<div className="public-profile-community__row__right">
											<div className="public-profile-event-attended-title">
												<div>Events Attended</div>
											</div>
											<div className="public-profile-event-attended">
												{
													profile.attendedEvent && profile.attendedEvent.map((op, i) => {
														<div className="public-profile-event-attended__item" key={i}>
															<div className="event_list_content">
																<div className="event_list_title">{op.name}</div>
																<div className="event_list_date-location">
																	<div className="event_list_date">
																		<img src="/images/icon/calender_icon.png"/>
																		<span>{op.date}</span>
																	</div>
																	<div className="event_list_date">
																		<img src="/images/icon/pin_icon.png"/>
																		<span>{op.country}</span>
																	</div>
																</div>
															</div>
														</div>
													})
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				} 
			</div>
		)
	}
	private editProfile(key: string, value: any, save?: boolean) {

		const profile: any = {...this.state.profile}
		profile[key] = value
		
		this.setState({profile, isProfilePristine: false}, () =>{
		})
		if (save) {
			setTimeout(() => {
				this.saveProfile()
			}, 500)
		}
	}
	private saveProfile() {
		this.setState({
			isEditing: false
		})
		this.props.saveProfile(this.state.profile)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.publicProfile,
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	fetchPublicProfile, authenticateUser, saveProfile
})(PublicProfile)