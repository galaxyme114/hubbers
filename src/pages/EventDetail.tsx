import * as moment from 'moment'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import Slider from 'react-slick'

import HeroBanner from '../components/HeroBanner'

import { fetchEventDetail, updateEventAttendance } from '../actions/events'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { eventDetailCarousel, speakerCarousel } from '../constants/carouselSettings'
import { EventsSpeakerRecord } from '../constants/models'
import Share from '../containers/Share'
import { State as AuthenticateState } from '../reducers/authenticate'
import { State as EventDetailDataState } from '../reducers/eventDetail'
import { RootState } from '../reducers/index'
import { Link } from 'react-router-dom'

interface EventDetailMatchParams {
	shortId: string
	slug: string
}

interface EventDetailProps extends RouteComponentProps<EventDetailMatchParams> {
	state: EventDetailDataState
	authenticateState: AuthenticateState
	fetchEventDetail: any
	updateEventAttendance: any
}

class EventDetail extends React.Component<EventDetailProps, {}> {
	public componentDidMount() {
		const eventShortId = this.props.match.params.shortId
		this.props.fetchEventDetail(eventShortId).then((response: any) => response.payload)
	}
	
	public componentWillReceiveProps(nextProps: EventDetailProps) {
		const eventSlug = nextProps.match.params.slug
		
		// Update the location on the url if the correct slug is not present
		if (nextProps.state.event && nextProps.state.event.slug !== eventSlug) {
			this.props.history.replace('/events/' + nextProps.state.event.shortId + '/' + nextProps.state.event.slug)
		}
	}
	
	public render() {
		const {state, authenticateState} = this.props
		const pathname = 'http://hubbers.io' + window.location.pathname
		
		return (
			<div>
				<Helmet>
					<title>{state.event ? state.event.name + ' | ' : ''}Hubbers - Hub of Makers</title>
					<title>{(state.event && state.event.name) ? state.event.name : 'Event'} | Hubbers - Hub of Makers</title>
					{state.event &&
					<meta property="og:url" content={`https://hubbers.io/events/${state.event.shortId}/${state.event.slug}`}/>}
					{state.event && <meta property="og:title" content={state.event.name}/>}
					{state.event && <meta property="og:description" content={state.event.description}/>}
					{state.event && <meta property="og:image" content={state.event.featuredImageUrl}/>}
				</Helmet>
				<HeroBanner
					bannerImage={state.event ? state.event.featuredImageUrl :
						'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-1.jpg'}
					title={state.event ? state.event.name : ''}
					caption=""
					description={state.event ? state.event.time + ' ' + moment(state.event.date).format('MMM, DD YYYY') : ''}
					cta={null}
					overlay={true}/>
				<div>
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
						(state.event && state.status === ActionTypeStates.SUCCESS) && (
							<div>
								<div className="talented-creators-list">
									<div className="container">
										<div className="talented-creators-list__title">{state.event.description}</div>
										<div className="talented-creators-list__items">
											<div className="talented-creators-list__item_first">
												<div className="talented-creators-list__item__icon">
													<img src="/images/business_event_icon.png"/>
												</div>
												<div className="talented-creators-list__items_right">
													<div className="talented-creators-list__item__title">Hubbers Community</div>
													<div className="talented-creators-list__description">
														<p>#ProductDevelopment</p>
														<p>#ProductCompetition</p>
														<p>#Creators</p>
													</div>
													<div className="talented-creators-list__items_rightline"/>
												</div>
											</div>
											
											<div className="talented-creators-list__item_second">
												<div className="talented-creators-list__item__icon">
													<img src="/images/clock_icon.png"/>
												</div>
												<div className="talented-creators-list__items_right">
													<div className="talented-creators-list__item__title">
														{moment(state.event.date).format('MMMM, DD YYYY')}
													</div>
													<div className="talented-creators-list__description">{state.event.time}</div>
													<div className="talented-creators-list__items_rightline"/>
												</div>
											</div>
											<div className="talented-creators-list__item_third">
												<div className="talented-creators-list__item__icon">
													<img src="/images/location_icon.png"/>
												</div>
												<div className="talented-creators-list__items_right">
													<div className="talented-creators-list__item__title">{state.event.country}</div>
													<div className="talented-creators-list__description">{state.event.address}</div>
												</div>
											</div>
										</div>
										<div className="talented-creators-button">
											{
												this.props.match.params.shortId === '7lE9_eLifDJ' && (
													<div className="talented-creators-button-box">
														<a href="http://tvvxg9matst8esgv.mikecrm.com/wZgbQVA">
															<button className="btn btn-large btn-cta">Attend</button>
														</a>
													</div>
												)
											}
											{
												this.props.match.params.shortId !== '7lE9_eLifDJ' && (
													<div className="talented-creators-button-box">
														<button
															className={'btn btn-large btn-cta ' + (!this.isAttending() ? 'btn-outline' : '')}
															disabled={!authenticateState.user}
															onClick={() => {
																this.toggleAttendance()
															}}>
															{this.isAttending() ? 'ATTENDING' : 'ATTEND'}</button>
														{
															!authenticateState.user && (
																<div className="talented-creators-button-box__notice">
																	<Link to={`/signin?redirect=/events/${state.event.shortId}/${state.event.slug}`}>
																		<em>Sign in to attend</em>
																	</Link>
																</div>
															)
														}
													</div>
												)
											}
										</div>
									</div>
								</div>
								{
									state.event.speakers.length > 0 && (
										<div className="guest-speaker">
											<div className="container">
												<div className="guest-speaker__title">{'Our Guest Speaker' +
												(state.event.speakers.length > 0 ? 's' : '')}</div>
												<Slider {...speakerCarousel}>
													{
														state.event.speakers.map((s: EventsSpeakerRecord, i: number) => (
															<div className="guest-speaker-item" key={i}>
																<div className="guest-speaker__img">
																	<div style={{backgroundImage: `url(${s.thumbnailImageUrl})`}}/>
																</div>
																<div className="guest-speaker__name">{s.name}</div>
																{s.position && <div className="guest-speaker__desig">{s.position}</div>}
																<div className="guest-speaker__desc">{s.bio}</div>
															</div>
														))
													}
												</Slider>
											</div>
										</div>
									)
								}
								<div className="talk-about">
									<div className="container">
										<div className="talk-about__title">
											We will talk about
										</div>
										<div className="talk-about__desc">
											{state.event.agenda}
										</div>
										{
											(state.event.schedule.length > 0) && (
												<div>
													<div className="talk-about__ourprogram">Schedule</div>
													{
														state.event.schedule.map((op: any, i) =>
															<div className="talk-about__ourprogram-timedesc" key={i}>
																<div className="talk-about__ourprogram-time">
																	{op.time}
																</div>
																<div className="talk-about__ourprogram-desc">
																	{op.description}
																</div>
															</div>
														)
													}
												</div>
											)
										}
									</div>
								</div>
								<div className="participant-event hide">
									<div className="container">
										<div className="participant-event__title">10 participants of the event</div>
										<div className="participant-event__items">
											<div className="participant-event-categories">
												<Slider {...eventDetailCarousel}>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
													<div className="participant-event-progress">
														<div
															className="participant-event-progress__imgbox"
															style={{
																backgroundImage:
																	'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/tiles/become-a-creator.png)',
																backgroundPosition: 'center',
																backgroundSize: '100% 100%'
															}}/>
														<h3 className="participant-event-progress__title">V. Prikis</h3>
														<span className="participant-event-progress__count">
												Creator
											</span>
													</div>
												</Slider>
											</div>
										
										</div>
									</div>
								</div>
								<div className="location-box">
									<div className="container">
										<div className="location-box__title">
											Location
										</div>
									</div>
								</div>
								<div className="localtion-map">
									<iframe frameBorder="0" className="ifreambox" src={state.event.map}/>
								</div>
								<div className="location_address"><p>{state.event.address}, {state.event.country}</p></div>
								<div className="share-events">
									<div className="container">
										<div className="share-events_innerbox">
											<div className="share-events_inner">
												{/*<div className="add-calender-box">*/}
												{/*<div className="add-calender-elem">*/}
												{/*Add to Calendar*/}
												{/*<div className="add-calender-icon">*/}
												{/*<img src="/images/calender_icon.png" />*/}
												{/*</div>*/}
												{/*</div>*/}
												{/*<div className="add_date_right_border"/>*/}
												{/*</div>*/}
												<div className="share-events-box">
													<div className="share-events-elem">
														Share event on
													</div>
													<div className="share-events-icons">
														<Share shareURL={pathname}/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					}
				</div>
			</div>
		)
	}
	
	private isAttending(): boolean {
		const {state, authenticateState} = this.props
		let isAttendingStatus = false
		
		if (state.event && authenticateState.user) {
			isAttendingStatus = state.event.attending.indexOf(authenticateState.user._id) !== -1
		}
		
		return isAttendingStatus
	}
	
	private toggleAttendance() {
		const {state, authenticateState} = this.props
		
		if (state.event && authenticateState.user) {
			this.props.updateEventAttendance(state.event._id, !(state.event.attending.indexOf(authenticateState.user._id) !== -1))
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.eventDetail,
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	fetchEventDetail,
	updateEventAttendance
})(EventDetail)