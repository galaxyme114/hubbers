import * as React from 'react'
import * as moment from 'moment'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEvents } from '../actions/events'
import { ActionTypeStates } from '../constants/action-types'
import { State as EventsListState } from '../reducers/eventsList'
import { RootState } from '../reducers/index'

import HeroBanner from '../components/HeroBanner'
import Spinner from '../components/Spinner'

interface EventsListProps {
	state: EventsListState,
	fetchEvents: any,
}

class EventPage extends React.Component<EventsListProps, {}> {
	
	public componentDidMount() {
		this.props.fetchEvents()
	}
	
	public render() {
		const {state} = this.props
		
		return (
			<div>
				<Helmet>
					<title>Events | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-1.jpg"
					title="<small>GLOBAL EVENTS</small>"
					caption=""
					description=""
					cta={null}
					overlay={true}/>
				<div className="eventpage-section">
					<div className="container">
						<div className="event__list">
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
								(state.eventsList.length > 0) && state.eventsList.map((op: any) =>
									<div className="event__list__items" key={op.name}>
										<Link to={'/events/' + op.shortId + '/' + op.slug}>
											<div className="event_items_firstsection">
												<div className="event_items_first_inner">
													<div className="event_items_first_inner_datetime">
														{op.date && op.date.length > 0 &&
														<p className="event_items_date"><span className="event__date_text">
														{moment(op.date).format('DD')}
														</span><br/>
															<span className="event__date_month">{moment(op.date).format('MMM')}</span></p>
														}
														<div className="event_items_time">
															<p>{`${op.time.substring(0, 5)}`}<br/>{`${op.time.substring(8, 13)}`}</p>
															{op.time && op.time.length > 0 && <span>-</span>}
														</div>
													</div>
													{/*<div className="event_items_first_inner_register">*/}
													{/*REGISTER*/}
													{/*</div>*/}
												</div>
												<div className="event_items_secondsection">
													<div className="event_items_heading">
														<div className="event_items_city__title">{op.country}</div>
														<div className="event_items_city__Location">
															<span><img src="/icons/map-localization.svg"/></span>
															{op.address}
														</div>
													</div>
													<div className="event_items_event_body">
														<div className="event_items_event__title">{op.name}</div>
														<div className="event_items_event__desc">
															{op.description}
														</div>
													</div>
													<div className="event_items_footer_text">
														<div className="event_items_footer__item">
															<div className="event_items_footer__item__speaker-label">
																<span><img src="/icons/chat-bubbles.svg"/></span>
																Speaker{op.speakers.length > 1 ? 's' : ''}:&nbsp;
															</div>
															<div className="event_items_footer__item__speaker-list">
																<b className="event_speaker_text">{op.speakers.map((s: any) => s.name).join(', ')}</b>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="event_items_thirdsection" style={{backgroundImage: `url(${op.countryImage})`}}>
											</div>
										</Link>
									</div>
								)
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.eventsList
})

export default connect(mapStateToProps, {
	fetchEvents
})(EventPage)