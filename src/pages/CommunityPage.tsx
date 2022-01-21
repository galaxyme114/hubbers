import * as React from 'react'
import * as moment from 'moment'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import {
	activityThreadsCarousel,
	articlesCarousel,
	eventNewCarousel,
	ourNewPartnerCarousel,
	socialsCarousel
} from '../constants/carouselSettings'
import { fetchEvents } from '../actions/events'
import { Link } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import Slider from 'react-slick'
import { State as EventsListState } from '../reducers/eventsList'
import { RootState } from '../reducers'
import Icon from '../components/Icon'
import ChooseCommunityModal from '../components/ChooseCommunityModal'
import { fetchCommunity } from '../actions/community'
import { State as CommunityDataState } from '../reducers/community'
import { ActionTypeStates } from '../constants/action-types'
import Spinner from '../components/Spinner'
import { fetchProfile } from '../actions/profile'
import { State as ProfileDataState } from '../reducers/profile'
import PublicProfileComponent from '../components/PublicProfileComponent'
import { State as AuthenticateUserState } from '../reducers/authenticate'
import { authenticateUser } from '../actions/authenticate'

// import HeroBanner from '../components/HeroBanner'
let memberList = [{
	'thumbnailImageUrl': 'https://hubbers-api.s3-ap-northeast-1.amazonaws.com/RrK4ZU1rP.jpg',
	'fullName': 'Sedat Ozer',
	'address': '',
	'createdAt': 'November 14,2019',
	'_id': '5dcd49cc21285b00114d28d1'
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/H1jGGJHIS.jpg',
	'fullName': 'Marco Roversi',
	'address': '',
	'createdAt': 'November 3,2019',
	'_id': "5dbed784383e6800117d575f"
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/ByImpiMur.jpeg',
	'fullName': 'Shawn Xie',
	'address': 'China',
	'createdAt': 'November 3,2019',
	'_id': "5dbed784383e6800117d5772"
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HkaMyRxLV.jpg',
	'fullName': 'Manfred Hall',
	'address': 'China',
	'createdAt': 'November 3,2019',
	'_id': "5dbed783383e6800117d56ca"
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HyO9NEMOr.jpg',
	'fullName': 'N S Sunil Kumar',
	'address': 'India',
	'createdAt': 'November 3,2019',
	'_id': "5dbed782383e6800117d5694"
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/SkfQzb1Mr.jpg',
	'fullName': 'Mariano Viti',
	'address': '',
	'createdAt': 'November 3,2019',
	'_id': "5dbed782383e6800117d5681"
}]
interface CommunitypageProps extends RouteComponentProps<any> {
	stateEvents: EventsListState
	fetchEvents: any
	stateCommunity: CommunityDataState
	fetchCommunity: any
	stateProfile: ProfileDataState
	fetchProfile: any
	authenticateState: AuthenticateUserState
	authenticateUser: any
}

interface CommunitypageState {
	work: string
	showPopover: boolean
	openedPopoverId: string
}

class CommunityPage extends React.Component<CommunitypageProps, CommunitypageState> {
	private eventsSlider: Slider
	private ourPartnerSlider: Slider
	private activitySlider: Slider
	private articlesSlider: Slider
	private socialSlider: Slider
	
	public constructor(props: CommunitypageProps) {
		super(props)
		this.state = {
			work: '',
			showPopover: false,
			openedPopoverId: ''
		}
	}
	// public componentWillMount() {
	// 	this.props.fetchEvents()
	// 	this.props.fetchCommunity()
	// }
	public componentDidMount() {
		this.props.fetchEvents()
		this.props.fetchCommunity()
	}
	public toggleHover(data: any, popoverId: string) {
		this.setState({
			showPopover: true,
			openedPopoverId: popoverId
		})
		this.props.fetchProfile(data._id)
		// document.body.classList.add(`show-public-profile-modal`)
	}
	public handleMouseLeave() {
		this.setState({
			showPopover: false
		})
	}
	public eventsPre() {
		this.eventsSlider.slickPrev()
	}
	
	public eventsNext() {
		this.eventsSlider.slickNext()
	}
	
	public activityPre() {
		this.activitySlider.slickPrev()
	}
	
	public activityNext() {
		this.activitySlider.slickNext()
	}
	
	public articlesPre() {
		this.articlesSlider.slickPrev()
	}
	
	public articlesNext() {
		this.articlesSlider.slickNext()
	}
	
	public socialPre() {
		this.socialSlider.slickPrev()
	}
	
	public socialNext() {
		this.socialSlider.slickNext()
	}
	
	public openChooseCommunity() {
		document.body.classList.add(`show-choose-community-modal`)
	}
	
	public render() {
		const {stateEvents, stateCommunity, stateProfile} = this.props
		// console.log(stateCommunity);
		const eventListData = []
		if (stateCommunity.community) {
			if (stateCommunity.community.events) {
				if (stateCommunity.community.events.length >= 6) {
					for (let i = 0; i < 6; i++) {
						eventListData.push(
							stateCommunity.community.events[i]
						)
					}
				} else {
					for (let i = 0; i < stateCommunity.community.events.length; i++) {
						eventListData.push(
							stateCommunity.community.events[i]
						)
					}
				}
			}
			
		}
		
		
		return (
			<div className="homepage-new">
				<Helmet>
					<title>Hubbers - Hub of Makers</title>
				</Helmet>
				
				<div className="top-section_community clearfix">
					<div className="container">
						<div className="top-section_community__inner">
							<div className="top-section_community__inner__left">
								<h2>Welcome to hubbers community Be part of 1033 communities worldwide</h2>
								<div className="consultent__section-row">
									<div className="consultent__section">
										<div className="left_img_section">
											<img src="/images/community__first_image.png"/>
											{ 
												(stateCommunity.community) && (stateCommunity.community.numConsultants) ?
												<div className="left_img_section_count">{stateCommunity.community.numConsultants}</div>
												:
												<div className="left_img_section_count">0</div>
											}
										</div>
										
										<p> CONSULTANTS IN INNOVATIONS </p>
									</div>
									
									<div className="consultent__section">
										<div className="left_img_section">
											<img src="/images/community__second_image.png"/>
											<div className="left_img_section_count">1500</div>
										</div>
										<p>INDUSTRIAL DESIGNERS</p>
									</div>
									
									<div className="consultent__section">
										<div className="left_img_section">
											<img src="/images/community__third_image.png"/>
											{ 
												(stateCommunity.community) && (stateCommunity.community.partners[0]) ?
												<div className="left_img_section_count">{stateCommunity.community.partners[0]}</div>
												:
												<div className="left_img_section_count">0</div>
											}
										</div>
										<p>EXPERTS IN PRODUCT DEVELOPEMENT</p>
									</div>
								</div>
								<div className="choose-community">
									<button className="btn" onClick={() => {
										this.openChooseCommunity()
									}}>Select your community
									</button>
								</div>
								<ChooseCommunityModal
									onSubmit={() => {
									}}/>
							</div>
							<div className="top-section_community__inner__image">
								{/* <img src="/images/icon/community_banner.png" /> */}
							</div>
						</div>
					</div>
				</div>
				
				<div className="thumbup-section">
					<div className="thumbup-section-header">
						<div className="container">
							<div className="thumbup-section-header-back">
								<div className="thumbup-section-header_content">
									<div className="title">Community Members</div>
									<div className="caption"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="thumbup-section__inner">
							<div className="thumbup-section__inner_items">
								{
									memberList.map((op: any, i: number) => (
										<div className="thumbup-section__inner_item" key={i} >
											<div className="thumbnail-box" onMouseEnter={() => this.toggleHover(op, op._id)}>
												<img src={op.thumbnailImageUrl} alt="" />
											</div>
											<div className="title">{op.fullName}</div>
											<div className="caption">{op.address}</div>
											<div className="date">{op.createdAt}</div>
											{
												(this.state.showPopover) && (this.state.openedPopoverId === op._id) &&
												<div className="profile-popover" onMouseLeave={() => this.handleMouseLeave()}>
													<PublicProfileComponent profileDetail={stateProfile.profile} stateProfile={stateProfile.status}  />
												</div>
											}
										</div>
									))
								}
							</div>
						</div>
					</div>
				</div>
				{
					(stateCommunity.status === ActionTypeStates.INPROGRESS) && (
						<div className="page-loading">
							<div>
								<em>Loading ...</em>
								<Spinner name="three-dots" fadeIn="none"/>
							</div>
						</div>
					)
				}
				{
					(stateCommunity.status !== ActionTypeStates.INPROGRESS) && (
					<div>
						{
							(eventListData.length > 0) &&
							<div className="event-list">
								<div className="container">
										<div className="event-list__title">
											<div>All Events</div>
											<div className="arrow-btns">
												<button className="btn" onClick={() => this.eventsPre()}><Icon name="chevron-left"/></button>
												<button className="btn" onClick={() => this.eventsNext()}><Icon name="chevron-right"/></button>
											</div>
										</div>
									<div className="event-list__items">
										<Slider ref={element => this.eventsSlider = element} {...eventNewCarousel}>
											{
												(eventListData.length > 0) && eventListData.map((op: any) =>
												
													<div className="event-list__item" key={op.name}>
														<Link to={'/events/' + op.shortId + '/' + op.slug}>
															<div className="event_img" style={{ backgroundImage: `url(${op.countryImage})`}}></div>
															<div className="event_list_content">
																<div className="event_list_title">{op.name}</div>
																<div className="event_list_date-location">
																	<div className="event_list_date">
																		<img src="/images/calender_icon.png" />
																		<span>{moment(op.date).format('LL')}</span>
																	</div>
																	<div className="event_list_date">
																		<img src="/icons/map-localization.svg" />
																		<span>{op.country}</span>
																	</div>
																</div>
															</div>
														</Link>
													</div>
												)
											}
											{/* <div className="event-list__item">
												<div className="event_img"
													style={{backgroundImage: `url(/images/event_img.png)`}}></div>
												<div className="event_list_content">
													<div className="event_list_title">Name of the event</div>
													<div className="event_list_date-location">
														<div className="event_list_date">
															<img src="/images/icon/calender_icon.png"/>
															<span>March 13, 2019</span>
														</div>
														<div className="event_list_date">
															<img src="/images/icon/pin_icon.png"/>
															<span>Shanghai Chaina</span>
														</div>
													</div>
												</div>
											</div> */}
											
										</Slider>
									</div>
								</div>
							</div>
						}
					</div>
					)
				}
				{
					(stateCommunity.status !== ActionTypeStates.INPROGRESS) && (
					<div>
						{
							(stateCommunity.community.posts.length > 0) &&
							<div className="activity-threads">
								<div className="container">
									<div className="activity-list__title">
										<div>Activity threads</div>
										<div className="arrow-btns">
											<button className="btn" onClick={() => this.activityPre()}><Icon name="chevron-left"/></button>
											<button className="btn" onClick={() => this.activityNext()}><Icon name="chevron-right"/></button>
										</div>
									</div>
									<div className="activity-list__items">
										<Slider ref={element => this.activitySlider = element} {...activityThreadsCarousel}>
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
						}
					</div>
					)
				}
				{
					(stateCommunity.status !== ActionTypeStates.INPROGRESS) && (
					<div>
						{
							(stateCommunity.community.posts.length > 0) &&
							<div className="articles-list">
								<div className="container">
									<div className="articles-list__title">
										<div>Articles and News</div>
										<div className="arrow-btns">
											<button className="btn" onClick={() => this.articlesPre()}><Icon name="chevron-left"/></button>
											<button className="btn" onClick={() => this.articlesNext()}><Icon name="chevron-right"/></button>
										</div>
									</div>
									<div className="articles-list__items">
										<Slider ref={element => this.articlesSlider = element} {...articlesCarousel}>
											<div className="articles-list__item">
												<div className="articles_img"
													style={{backgroundImage: `url(/images/event_img.png)`}}></div>
												<div className="articles_list_content">
													<div className="articles_list_title">September, 24</div>
													<div className="articles_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
														Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
														parturient montes, nascetur ridiculus mus.
													</div>
												
												</div>
											</div>
											<div className="articles-list__item">
												<div className="articles_img"
													style={{backgroundImage: `url(/images/event_img.png)`}}></div>
												<div className="articles_list_content">
													<div className="articles_list_title">September, 24</div>
													<div className="articles_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
														Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
														parturient montes, nascetur ridiculus mus.
													</div>
												
												</div>
											</div>
											<div className="articles-list__item">
												<div className="articles_img"
													style={{backgroundImage: `url(/images/event_img.png)`}}></div>
												<div className="articles_list_content">
													<div className="articles_list_title">October, 24</div>
													<div className="articles_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
														Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
														parturient montes, nascetur ridiculus mus.
													</div>
												
												</div>
											</div>
											<div className="articles-list__item">
												<div className="articles_img"
													style={{backgroundImage: `url(/images/event_img.png)`}}></div>
												<div className="articles_list_content">
													<div className="articles_list_title">November, 24</div>
													<div className="articles_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
														Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
														parturient montes, nascetur ridiculus mus.
													</div>
												
												</div>
											</div>
											<div className="articles-list__item">
												<div className="articles_img"
													style={{backgroundImage: `url(/images/event_img.png)`}}></div>
												<div className="articles_list_content">
													<div className="articles_list_title">October, 24</div>
													<div className="articles_list_description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
														Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
														parturient montes, nascetur ridiculus mus.
													</div>
												
												</div>
											</div>
										</Slider>
									</div>
									<div className="articles-create_new_post">
										<a href="blog.hubbers.io/ghost/">
											<button className="btn">Create new post</button>
										</a>
									</div>
								</div>
							</div>
						}
					</div>
					)
				}
				{
					(stateCommunity.status !== ActionTypeStates.INPROGRESS) && (
					<div>
						{
							(stateCommunity.community.posts.length > 0) &&
							<div className="social-list">
								<div className="container">
									<div className="social-list__title">
										<div>
											<div className="title">Hubbers in social media</div>
											<div className="caption">Use #Hubbers to share your stories</div>
										</div>
										<div className="arrow-btns">
											<button className="btn" onClick={() => this.socialPre()}><Icon name="chevron-left"/></button>
											<button className="btn" onClick={() => this.socialNext()}><Icon name="chevron-right"/></button>
										</div>
									</div>
									<div className="social-list__items">
										<Slider ref={element => this.socialSlider = element} {...socialsCarousel}>
											<div className="social-list__item">
												<div className="social-list__item__inner">
													<div className="social_top_section">
														<div className="social_user_img" style={{backgroundImage: `url('/images/event_img.png')`}}>
														</div>
														<div className="social_user_info">
															<div className="title">Business Name</div>
															<div className="time">November, 12 at 12:04 pm <span><img
																src="/images/icon/time_icon.png"/></span></div>
														</div>
														<div className="social_post_discription">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
															sed nonumy eirmodur
														</div>
													</div>
													<div className="social_post_img" style={{backgroundImage: `url('/images/event_img.png')`}}></div>
													<div className="social-icons">
														<div className="like-section">
															<span style={{backgroundImage: `url('/assets/images/icon/like_icon.png')`}}></span> Like
														</div>
														<div className="comment-section">
															<span
																style={{backgroundImage: `url('/assets/images/icon/comment-icon-grey.png')`}}></span> Comment
														</div>
														<div className="share-section">
															<span style={{backgroundImage: `url('/assets/images/icon/share_icon.png')`}}></span> Share
														</div>
													</div>
												</div>
											</div>
											<div className="social-list__item">
												<div className="social-list__item__inner">
													<div className="social_top_section">
														<div className="social_user_img" style={{backgroundImage: `url('/images/event_img.png')`}}>
														</div>
														<div className="social_user_info">
															<div className="title">Business Name</div>
															<div className="time">November, 12 at 12:04 pm <span><img
																src="/images/icon/time_icon.png"/></span></div>
														</div>
														<div className="social_post_discription">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
															sed nonumy eirmodur
														</div>
													</div>
													<div className="social_post_img" style={{backgroundImage: `url('/images/event_img.png')`}}></div>
													<div className="social-icons">
														<div className="like-section">
															<span style={{backgroundImage: `url('/assets/images/icon/like_icon.png')`}}></span> Like
														</div>
														<div className="comment-section">
															<span
																style={{backgroundImage: `url('/assets/images/icon/comment-icon-grey.png')`}}></span> Comment
														</div>
														<div className="share-section">
															<span style={{backgroundImage: `url('/assets/images/icon/share_icon.png')`}}></span> Share
														</div>
													</div>
												</div>
											</div>
											<div className="social-list__item">
												<div className="social-list__item__inner">
													<div className="social_top_section">
														<div className="social_user_img" style={{backgroundImage: `url('/images/event_img.png')`}}>
														</div>
														<div className="social_user_info">
															<div className="title">Business Name</div>
															<div className="time">November, 12 at 12:04 pm <span><img
																src="/images/icon/time_icon.png"/></span></div>
														</div>
														<div className="social_post_discription">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
															sed nonumy eirmodur
														</div>
													</div>
													<div className="social_post_img" style={{backgroundImage: `url('/images/event_img.png')`}}></div>
													<div className="social-icons">
														<div className="like-section">
															<span style={{backgroundImage: `url('/assets/images/icon/like_icon.png')`}}></span> Like
														</div>
														<div className="comment-section">
															<span
																style={{backgroundImage: `url('/assets/images/icon/comment-icon-grey.png')`}}></span> Comment
														</div>
														<div className="share-section">
															<span style={{backgroundImage: `url('/assets/images/icon/share_icon.png')`}}></span> Share
														</div>
													</div>
												</div>
											</div>
											<div className="social-list__item">
												<div className="social-list__item__inner">
													<div className="social_top_section">
														<div className="social_user_img" style={{backgroundImage: `url('/images/event_img.png')`}}>
														</div>
														<div className="social_user_info">
															<div className="title">Business Name</div>
															<div className="time">November, 12 at 12:04 pm <span><img
																src="/images/icon/time_icon.png"/></span></div>
														</div>
														<div className="social_post_discription">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
															sed nonumy eirmodur
														</div>
													</div>
													<div className="social_post_img" style={{backgroundImage: `url('/images/event_img.png')`}}></div>
													<div className="social-icons">
														<div className="like-section">
															<span style={{backgroundImage: `url('/assets/images/icon/like_icon.png')`}}></span> Like
														</div>
														<div className="comment-section">
															<span
																style={{backgroundImage: `url('/assets/images/icon/comment-icon-grey.png')`}}></span> Comment
														</div>
														<div className="share-section">
															<span style={{backgroundImage: `url('/assets/images/icon/share_icon.png')`}}></span> Share
														</div>
													</div>
												</div>
											</div>
										</Slider>
									</div>
								</div>
							</div>
						}
					</div>
					)
				}
				<div className="partner-list">
					<div className="container">
						<div className="partner-list__title">Our Partners</div>
						<div className="partner-list__items">
							<Slider ref={element => this.ourPartnerSlider = element} {...ourNewPartnerCarousel}>
								
								<div className="partner-list__item">
									<img className="partner_img" src="/images/our-partners/partner4.png"/>
									<div className="partner_img_caption">Komaspec</div>
								</div>
								<div className="partner-list__item">
									<img className="partner_img" src="/images/our-partners/wework-labs-logo.png"/>
									<div className="partner_img_caption">Wework labs</div>
								</div>
								<div className="partner-list__item">
									<img className="partner_img" src="/images/our-partners/partner1.png"/>
									<div className="partner_img_caption">Workspace</div>
								</div>
								<div className="partner-list__item">
									<img className="partner_img" src="/images/our-partners/partner2.png"/>
									<div className="partner_img_caption">Confluences</div>
								</div>
								<div className="partner-list__item">
									<img className="partner_img" src="/images/our-partners/xavor-logo.png"/>
									<div className="partner_img_caption">Xavor</div>
								</div>
							</Slider>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	stateEvents: state.eventsList,
	stateCommunity: state.community,
	stateProfile: state.profile,
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	fetchEvents,
	fetchCommunity,
	fetchProfile,
	authenticateUser
})(CommunityPage)