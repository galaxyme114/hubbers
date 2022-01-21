import * as moment from 'moment'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import Slider from 'react-slick'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { ConstantsCarousel, UserActivityCarousel } from '../constants/carouselSettings'
import { RootState } from '../reducers/index'

import {
	createEntry,
	doLikeContest,
	doViewContest,
	fetchContestDetail,
	fetchContestMemberEntries,
	fetchLeaderboard,
	participateContestant,
	participateJudge,
	updateEntry
} from '../actions/homepage'
import ContestantParticipateModal from '../components/ContestantParticipateModal'
import FloatingShare from '../components/FloatingShare'
import JudgeParticipateModal from '../components/JudgeParticipateModal'
import LeaderBoard from '../components/LeaderBoard'
import UserProfileModal from '../components/UserProfileModal'
import { ContestMemberType } from '../constants/enums'
import { ContestCriteriaRecord, ContestEntryRecord, ContestLeaderBoardRecord, ContestRecord } from '../constants/models'
import { countries, innovationCategories, productCategories } from '../constants/selectOptions'
import ContestantEntryModal from '../containers/ContestantEntryModal'
import DraftEntryModal from '../containers/DraftEntryModal'
import EntryModal from '../containers/EntryModal'
import { State as AuthenticateState } from '../reducers/authenticate'
import { State as ContestDetailDataState } from '../reducers/contestDetail'
import { State as LeaderBoardState } from '../reducers/leaderBoard'
import { dateHasEnded, formattedDuration, momentDaysToGo } from '../utils/dates'
import SmoothScroll from '../utils/smoothScroll'
import { selectItem } from '../utils/stringUtils'

interface ContestDetailMatchParams {
	shortId: string
	slug?: string
}

interface ContestDetailProps extends RouteComponentProps<ContestDetailMatchParams> {
	state: ContestDetailDataState
	leaderboardState: LeaderBoardState
	authenticateState: AuthenticateState
	fetchContestDetail: any
	fetchLeaderboard: any
	participateContestant: any
	participateJudge: any
	fetchContestMemberEntries: any
	createEntry: any
	updateEntry: any
}

interface ContestDetailState {
	tabIndex: number,
	activeCollapse: number
	selectedEntry: ContestEntryRecord
	selectedUserId: number
}

class ContestDetail extends React.Component<ContestDetailProps, ContestDetailState> {
	public constructor(props: ContestDetailProps) {
		super(props)
		
		this.state = {
			tabIndex: 0,
			activeCollapse: 0,
			selectedEntry: null,
			selectedUserId: null
		}
	}
	
	public componentDidMount() {
		// Fetch the contest detail and set the flag to true
		this.props.fetchContestDetail(this.props.match.params.shortId)
			.then((res: any) => res.payload)
			.then((contest: ContestRecord) => doViewContest(contest._id, {view: true}))
	}
	
	public componentWillReceiveProps(nextProps: ContestDetailProps) {
		const contestSlug = nextProps.match.params.slug
		
		// Update the location on the url if the correct slug is not present
		if (nextProps.state.contest && nextProps.state.contest.slug !== contestSlug) {
			this.props.history.replace('/contests/' + nextProps.state.contest.shortId + '/' + nextProps.state.contest.slug)
		}
		
		if (nextProps.state.contest !== this.props.state.contest) {
			// Load entries
			nextProps.fetchContestMemberEntries(nextProps.state.contest._id,
				nextProps.state.memberType ? nextProps.state.memberType : ContestMemberType.NONE)
			
			const hasEnded = nextProps.state.contest ? dateHasEnded(nextProps.state.contest.endTime) : false
			if (hasEnded) {
				nextProps.fetchLeaderboard(nextProps.state.contest.shortId)
			}
		}
	}
	
	public doLike(id: string) {
		const data = {
			like: 'true'
		}
		doLikeContest(id, data)
			.then((res: any) => {
				this.props.fetchContestDetail(this.props.match.params.shortId)
			})
	}
	
	public openAgreement(type: string) {
		if (!this.props.authenticateState.user) {
			this.props.history.push(`/signin?redirect=/contests/${this.props.state.contest.shortId}`)
		} else {
			document.body.classList.add(`show-${type}-participate-modal`)
		}
	}
	
	public render() {
		const {state, authenticateState, leaderboardState} = this.props
		const {activeCollapse} = this.state
		const daysToGoFormatted = state.contest ? formattedDuration(state.contest.endTime, state.contest.duration) : ''
		const hasEnded = state.contest ? dateHasEnded(state.contest.endTime) : false
		
		return (
			<div className="page-contest-detail" id="contest-detail">
				<Helmet>
					<title>{(state.contest && state.contest.name) ? state.contest.name : 'Contest'} | Hubbers - Hub of
						Makers</title>
					{state.contest &&
					<meta
						property="og:url"
						content={`https://hubbers.io/contests/${state.contest.shortId}/${state.contest.slug}`}/>}
					{state.contest && <meta property="og:title" content={state.contest.name}/>}
					{state.contest && <meta property="og:description" content={state.contest.excerpt}/>}
					{state.contest && <meta property="og:image" content={state.contest.featuredImageUrl}/>}
				</Helmet>
				{
					state.status === ActionTypeStates.INPROGRESS && (
						<div className="page-loading">
							<div>
								<em>Loading ...</em>
								<Spinner name="three-dots" fadeIn="none"/>
							</div>
						</div>
					)
				}
				{
					state.status === ActionTypeStates.SUCCESS && (
						<div className="contest-detail-container">
							<div className="container">
								<div className="contest-detail__header">
									<h2>{state.contest.name}</h2>
									<p className="time_ago">{daysToGoFormatted}</p>
									<div className="header_timeline">
										<ul className="header_time_list">
											<li>
												<span><img src="/images/icon/start-time.png"/></span>
												<span className="left_span">Start Time:</span>
												<span className="right_span">
													{moment(state.contest.startTime).format('MMMM, Do hh:mm a')}
												</span>
											</li>
											<li>
												<span><img src="/images/icon/end-time.png"/></span>
												<span className="left_span">Finish Time:</span>
												<span className="right_span">
													{moment(state.contest.endTime).format('MMMM, Do hh:mm a')}
												</span>
											</li>
										</ul>
									</div>
								</div>
								<div className="contest-detail__tabspart">
									<Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
										<TabList>
											<Tab>
												<div className="contest-detail__tabmenu">
													General
												</div>
											</Tab>
											<Tab>
												<div className="contest-detail__tabmenu">
													Criteria
												</div>
											</Tab>
											<Tab>
												<div className="contest-detail__tabmenu">
													Contestants <span className="badge">{state.contest.numContestants}</span>
												</div>
											</Tab>
											<Tab>
												<div className="contest-detail__tabmenu">
													Award Judges <span className="badge">{state.contest.numJudges}</span>
												</div>
											</Tab>
											<Tab>
												<div className="contest-detail__tabmenu">
													Contest Rules
												</div>
											</Tab>
										</TabList>
										<TabPanel>
											<div className="tab_general">
												<div className="tab_general__header">
													<div className="tab_general_left">
														<ul className="general-sub-menu-left">
															<li>
																<div className="icon-content">
																	<span><img src="/images/icon/product.png"/></span>
																</div>
																<div className="text-content">
																	<h4>Product</h4>
																	<p>{selectItem(productCategories, state.contest.productCategory) || 'N/A'}</p>
																</div>
															</li>
															<li>
																<div className="icon-content">
																	<span><img src="/images/icon/innovation.png"/></span>
																</div>
																<div className="text-content">
																	<h4>Innovation</h4>
																	<p>{selectItem(innovationCategories, state.contest.innovationCategory) || 'N/A'}</p>
																</div>
															</li>
															<li>
																<div className="icon-content">
																	<span><img src="/images/icon/geography.png"/></span>
																</div>
																<div className="text-content">
																	<h4>Geography</h4>
																	<p>{selectItem(countries, state.contest.geography)}</p>
																</div>
															</li>
														</ul>
													</div>
													<div className="tab_general_right">
														<ul className="general-sub-menu-right">
															<li>
																<div className="text-content">
																	<h4>Contestants</h4>
																	<p>{state.contest.numContestants}</p>
																</div>
															</li>
															<li>
																<div className="text-content">
																	<h4>Judges</h4>
																	<p>{state.contest.numJudges}</p>
																</div>
															</li>
														</ul>
													</div>
												</div>
												<div className="tab_general__content">
													<div className="general__content__left">
														<div
															className="left_image"
															style={{backgroundImage: `url(${state.contest.featuredImageUrl})`}}/>
														<div className="general_bottom_row">
															<ul className="iconslist">
																<li>
																	<div className="iconbox"><Icon name="eye"/> {state.contest.viewCount}</div>
																</li>
																<li>
																	{
																		(authenticateState.user) &&
																		state.contest.likes.indexOf(authenticateState.user._id) === -1 &&
																		<div
																			className="iconbox"
																			onClick={() => {
																				this.doLike(state.contest._id)
																			}}>
																			<Icon name="heart-empty"/> {state.contest.likesCount}
																		</div>
																	}
																	{
																		(authenticateState.user) &&
																		state.contest.likes.indexOf(authenticateState.user._id) !== -1 &&
																		<div className="iconbox"><Icon name="heart"/> {state.contest.likesCount}</div>
																	}
																	{
																		(!authenticateState.user) &&
																		<div className="iconbox"><Icon name="heart-empty"/> {state.contest.likesCount}</div>
																	}
																</li>
																<li>
																	<FloatingShare
																		shareURL={'https://hubbers.io/contests/' + state.contest.shortId + '/' +
																		state.contest.slug + '?_escaped_fragment_='}>
																		<div className="contest-tile__stats--shares">
																			<Icon name="share"/> {state.contest.sharesCount}
																		</div>
																	</FloatingShare>
																</li>
															</ul>
														</div>
													</div>
													<div className="general__content__right">
														<div className="prize-content">
															<div className="prize-content__heading">
																<h2>{hasEnded ? 'Winners' : 'Prizes'}</h2>
															</div>
															{
																hasEnded && (
																	<div className="prize_row">
																		{
																			leaderboardState.leaderboardList.slice(0, 3).map(
																				(contestant: ContestLeaderBoardRecord, i: number) => (
																					<div key={i} className="prize_column">
																						<div className="prize_column__user-thumbnail">
																							<div>
																								<img src={contestant.thumbnailImageUrl}/>
																								{
																									contestant.currentRank > 0 && (
																										<img className="ranking"
																										     src={`/images/prize${contestant.currentRank}.png`}/>
																									)
																								}
																							</div>
																						</div>
																						<p className="prize_price">{contestant.fullName}</p>
																						{/*<p className="prize_place">{i + 1} Position</p>*/}
																					</div>
																				))
																		}
																	</div>
																)
															}
															{
																!hasEnded && (
																	<div className="prize_row">
																		{
																			state.contest.prizes.map((prize: any, i: number) => (
																				<div key={i} className="prize_column">
																					<img src={`/images/prize${prize.standing}.png`}/>
																					<p className="prize_place">{prize.name}</p>
																					<p className="prize_price">{prize.prize} {prize.currency}</p>
																					<p className="prize_caption">{prize.description}</p>
																				</div>
																			))
																		}
																	</div>
																)
															}
														</div>
														{
															(!hasEnded && authenticateState.user && state.contest.memberApplication
																&& state.contest.memberApplication.isPending) && (
																<div className="prize_bottom_btnbox_process">
																	<div className="contestant-accepted-cong">
																		<span className="contestant-accepted-cong-icon">
																			<img src="/images/icon/Judge-being-Processed-icon.png"/>
																		</span>
																		<span className="contestant-accepted-cong-text">
																			Your Application for&nbsp;
																			{state.contest.memberApplication.type === 'contestant' ? 'Contestant' : 'Judge'}
																			&nbsp;being processed.
																		</span>
																	</div>
																	<div className="contestant-accepted-txt">It will take maximum 24 hours</div>
																</div>
															)
														}
														{
															(!hasEnded && authenticateState.user && state.contest.memberApplication
																&& !state.contest.memberApplication.isPending) && (
																<div className="prize_bottom_btnbox_accepted">
																	<div className="contestant-accepted-cong">
																			<span className="contestant-accepted-cong-icon">
																				{
																					state.contest.memberApplication.type === 'contestant' && (
																						<img src="/images/icon/contestant-accepted-icon.png"/>
																					)
																				}
																				{
																					state.contest.memberApplication.type === 'judge' && (
																						<img src="/images/icon/judge-accepted-icon.png"/>
																					)
																				}
																			</span>
																		<span className="contestant-accepted-cong-text">
																				{state.contest.memberApplication.type}
																			</span>
																	</div>
																	<div className="contestant-accepted-txt">
																		You're {state.contest.memberApplication.type === 'contestant' ? 'a Contestant' :
																		' an Awards Judge'} on this contest
																	</div>
																</div>
															)
														}
														{
															(!hasEnded && (!authenticateState.user || state.contest.memberApplication === null)) && (
																<div className="prize_bottom_btnbox">
																	<div className="prize_bottom_btnbox_left">
																		<button
																			className="btn"
																			onClick={() => {
																				this.openAgreement('contestant')
																			}}>
																			Become a Contestant
																		</button>
																	</div>
																	<div className="prize_bottom_btnbox_right">
																		<button
																			className="btn"
																			onClick={() => {
																				this.openAgreement('judge')
																			}}>
																			Become a Judge
																		</button>
																	</div>
																</div>
															)
														}
														{
															hasEnded && (
																<div className="prize_bottom_btnbox">
																	<button
																		className="btn"
																		onClick={() => {
																			this.switchTab(2)
																		}}>
																		Leaderboard
																	</button>
																</div>
															)
														}
														<ContestantParticipateModal
															onSubmit={() => {
																this.props.participateContestant(state.contest._id)
															}}/>
														<JudgeParticipateModal
															onSubmit={() => {
																this.props.participateJudge(state.contest._id)
															}}/>
													</div>
												</div>
											</div>
										</TabPanel>
										<TabPanel>
											<div className="infotab">
												<div className="infotab_heading">
													<p className="infotab_heading_caption">
														To win the contest, the products must adhere to the following 7 criteria.
														<br/><br/>
														The Awards judges will evaluate entries based on how the product
														performs according to the requirements of the specific contest.</p>
												</div>
												
												{
													state.contest.criteria && state.contest.criteria.map((cc: ContestCriteriaRecord, i: number) => (
														<div className={'infotab_collapse_panel ' + (activeCollapse === i ? 'active' : '')} key={i}>
															<div className="infotab_collapse_heading" onClick={() => {
																this.toggleCollapse(i)
															}}>
																<div>
																	<span
																		className={(activeCollapse === i ? 'plus-minus-toggle_collapsed' : 'plus-minus-toggle')}/>
																	<span className="title">{cc.title}</span>
																</div>
															</div>
															<div className="panel_collapse" dangerouslySetInnerHTML={{__html: cc.body}}/>
														</div>
													))
												}
												<div className="infotab_recommend">
													<p className="infotab_recommend_title">* Some Friendly recommendations:</p>
													<p className="infotab_recommend_caption">
														hubbers.io isn't the one choosing the winner. (see Contest Policy), the winning contestant
														is chosen by the Hubbers community. However, let us give you some advice to help increase
														your chances to win this contest. We recommend all Contestants and Award Judges to read the
														article of "Tips for Contestants". </p>
													<div className="infotab_recommend_caption_inner">
														<p>- The challenge of this contest is to create a beautiful piece of furniture with an
															interesting and functional, connected design. Take note all parts of this sentence! We are
															looking for it all in one piece, not just part of the solution.</p>
														<p>- Connected Function(s) can be something that exists already or you are free to create
															something completely new. Our community welcomes new ideas with open arms, however, we ask
															you not to propose technologies that are beyond capabilities (time travel does not
															exist...) </p>
														<p>- Entries with classic or existing connected functions can be interesting, but they
															should offer some kind of innovation at least in the area of design, or those products
															will have trouble winning this challenge.</p>
													</div>
												</div>
												{/* <div className="infotab_info" dangerouslySetInnerHTML={{__html: state.contest.description}}/> */}
											</div>
										</TabPanel>
										<TabPanel>
											<LeaderBoard contestId={this.props.match.params.shortId}/>
										</TabPanel>
										<TabPanel>
											<div className="tab_creators">
												<div className="tab_creators_slider_items">
													<Slider {...ConstantsCarousel}>
														{
															state.contest.judges && state.contest.judges.map(c =>
																<div
																	key={c._id}
																	className="tab_creators_slider_item"
																	onClick={() => { this.showUserProfile(c.user) }}>
																	<div className="general-details">
																		<div className="image_section">
																			<img src={c.user.thumbnailImageUrl}/>
																		</div>
																		<div className="member_name">
																			<p className="name">{c.user.fullName}</p>
																			<p className="country">{c.user.position}</p>
																		</div>
																	</div>
																</div>
															)
														}
													</Slider>
												</div>
											</div>
										</TabPanel>
										<TabPanel>
											<div className="ruletab">
												<div className="ruletab_rule" dangerouslySetInnerHTML={{__html: state.contest.rules}}/>
											</div>
										</TabPanel>
									</Tabs>
								</div>
								<div>
									{
										(authenticateState.user && state.entriesStatus === ActionTypeStates.INPROGRESS) && (
											<div className="page-loading">
												<div>
													<em>Loading ...</em>
													<Spinner name="three-dots" fadeIn="none"/>
												</div>
											</div>
										)
									}
									{
										(!hasEnded && authenticateState.user && state.entriesStatus !== ActionTypeStates.INPROGRESS
											&& state.memberType === ContestMemberType.JUDGE) && (
											<div className="contest-user-portal">
												<h4 className="contest-user-portal__heading">Judge Dashboard</h4>
												<div className="contest-user-portal__content__row">
													<div className="contest-user-portal__content__col col-1">
														<div className="contest-user-portal__description">
															This area is created to help you view all the contests and contestants at one place.
															Track the activity of the contestants, see new entries, and give your marks.
														</div>
														<div className="contest-user-portal__metric">
															<div className="contest-user-portal__metric__item">
																<span>
																	{state.myEntries.filter(myE => !myE.myRating).length}
																</span> Unmarked Entries
															</div>
															<div className="contest-user-portal__metric__item">
																<span>{state.myEntries.length}</span> Total Entries
															</div>
														</div>
													</div>
													<div className="contest-user-portal__content__col col-2">
														<div className="contest-user-portal__actions">
															<button
																className="btn btn-rounded btn-outline"
																onClick={() => {
																	this.switchTab(2)
																}}>Leaderboard
															</button>
															{/*<button className="btn btn-rounded">Message Board (2)</button>*/}
														</div>
													</div>
												</div>
												{
													state.myEntries.length > 0 && (
														<div className="user_activity_section">
															<div className="user_activity_inner_section top-border">
																<div className="user_activity_items">
																	<Slider {...UserActivityCarousel}>
																		{
																			state.myEntries.map((entry: ContestEntryRecord) => (
																				<div
																					key={entry._id}
																					className={'user_activity_item ' + (!entry.myRating ? ' active' : '')}
																					onClick={() => {
																						this.selectEntry(entry)
																					}}>
																					<div className="item_img">
																						<img src={entry.contestant.thumbnailImageUrl}/>
																						<span className="item_img__avg-mark">
																							{entry.rating.average ? entry.rating.average.toFixed(2) : 'N/A'}
																						</span>
																					</div>
																					<p className="item_name">{entry.contestant.fullName}</p>
																					<p className="item_avg_mark">{momentDaysToGo(entry.updatedAt)}</p>
																				</div>
																			))
																		}
																	</Slider>
																</div>
															</div>
														</div>
													)
												}
											</div>
										)
									}
									{
										(!hasEnded && authenticateState.user && state.entriesStatus !== ActionTypeStates.INPROGRESS &&
											state.memberType === ContestMemberType.CONTESTANT) && (
											<div className="contest-user-portal">
												<h4 className="contest-user-portal__heading">Contestant Dashboard</h4>
												<div className="contest-user-portal__content__row">
													<div className="contest-user-portal__content__col col-1">
														<div className="contest-user-portal__description">
															Track your entries, the marks you received from the judges, and the total performance
															of your product creation. Remember, you can enter a Contest with one product only,
															but you can update your entry up to 5 times.
														</div>
														<div className="contest-user-portal__metric">
															<div className="contest-user-portal__metric__item">
																<span>{state.myEntries.filter((e: any) => !e.isDraft).length}</span> Revisions
															</div>
															{/*<div className="contest-user-portal__metric__item">*/}
															{/*<span>*/}
															{/*{*/}
															{/*state.myEntries.length > 0 ? state.myEntries[state.myEntries.length - 1]*/}
															{/*.ratings.filter((r: any) => !r.isSeen).length : 0}*/}
															{/*</span> New Marks*/}
															{/*</div>*/}
															<div className="contest-user-portal__metric__item">
																<span>{state.myEntries.length > 0 ?
																	state.myEntries[state.myEntries.length - 1].marksGiven : 0}</span> Ratings Given
															</div>
														</div>
													</div>
													<div className="contest-user-portal__content__col col-2">
														<div className="contest-user-portal__actions">
															<button
																className="btn btn-rounded btn-outline"
																onClick={() => {
																	this.switchTab(2)
																}}>Leaderboard
															</button>
															{/*<button className="btn btn-rounded">Message Board (2)</button>*/}
														</div>
													</div>
												</div>
												<div className="contestant-entries-list">
													{
														state.myEntries.map((entry: ContestEntryRecord, i: number) => (
															<div
																key={entry._id}
																className="contestant-entries-list__item"
																onClick={() => {
																	this.selectEntry(entry)
																}}>
																<div className="contestant-entries-list__item__col-1">
																	<div className="contestant-entries-list__item__image">
																		<div style={{backgroundImage:
																				`url(${entry.featuredImageUrl ? entry.featuredImageUrl : '/images/upload_dummy.png'})`}}/>
																	</div>
																	<div className="contestant-entries-list__item__title">
																		<span>Revision {state.myEntries.length - i} {entry.isDraft &&
																		<span className="badge">Draft</span>}</span>
																		{entry.title && <p>{entry.title}</p>}
																		{
																			!entry.title &&
																			<p className="placeholder">Lorem ipsum dolor sit amet, consectetur adipisicing
																				elit.
																				Culpa debitis distinctio dolorem doloribus et explicabo ipsum nam nihil.</p>
																		}
																	</div>
																</div>
																<div className="contestant-entries-list__item__col-2">
																	<div className="contestant-entries-list__item__stat">
																		<span className="contestant-entries-list__item__stat__label">Ratings Given</span>
																		{entry.marksGiven} / {state.contest.numJudges}
																	</div>
																	<div className="contestant-entries-list__item__stat">
																		<span className="contestant-entries-list__item__stat__label">Average</span>
																		{entry.rating.average ? entry.rating.average.toFixed(2) : '-'}
																	</div>
																</div>
															</div>
														))
													}
													<div className="contestant-entries-list__add">
														{
															state.myEntries.length === 0 &&
															<span>You have no entries yet, get started by adding one now!</span>
														}
														<button
															className="btn btn-rounded btn-outline"
															disabled={state.myEntries.length > 0 && state.myEntries[0].isDraft}
															onClick={() => {
																this.addEntry()
															}}>
															Add {state.myEntries.length > 0 ? 'revision' : 'entry'}
														</button>
													</div>
												</div>
											</div>
										)
									}
								</div>
								{(this.state.selectedEntry && this.state.selectedEntry.isDraft) &&
								<DraftEntryModal
									entry={this.state.selectedEntry}
									onClose={() => {
										this.setState({selectedEntry: null})
										this.props.fetchContestMemberEntries(this.props.state.contest._id,
											this.props.state.memberType ? this.props.state.memberType : ContestMemberType.NONE, true)
									}}/>}
								{((this.state.selectedEntry && !this.state.selectedEntry.isDraft)
									&& state.contest.memberApplication.type === 'judge') &&
								<EntryModal
									entry={this.state.selectedEntry}
									onUpdate={() => {
										this.props.fetchContestMemberEntries(this.props.state.contest._id,
											this.props.state.memberType ? this.props.state.memberType : ContestMemberType.NONE, true)
									}}
									onClose={() => {
										this.setState({selectedEntry: null})
									}}/>}
								{((this.state.selectedEntry && !this.state.selectedEntry.isDraft)
									&& state.contest.memberApplication.type === 'contestant') &&
								<ContestantEntryModal
									entry={this.state.selectedEntry}
									onClose={() => {
										this.setState({selectedEntry: null})
									}}/>}
								{this.state.selectedUserId && <UserProfileModal userId={this.state.selectedUserId}/>}
							</div>
						</div>
					)
				}
			</div>
		)
	}
	
	private switchTab(tabIndex: number) {
		new SmoothScroll(500).scrollTo('contest-detail', 5)
		this.setState({tabIndex})
	}
	
	private addEntry() {
		const {state} = this.props
		
		if (state.contest) {
			this.props.createEntry(state.contest._id, state.memberType)
				.then((response: any) => {
					this.setState({selectedEntry: response.payload[0]})
					document.body.classList.add('show-entrie-modal')
				})
		}
	}
	
	private selectEntry(entry: ContestEntryRecord) {
		const {state} = this.props
		
		if (state.contest) {
			this.setState({selectedEntry: entry})
			
			if (entry.isDraft) {
				document.body.classList.add('show-entrie-modal')
			} else {
				document.body.classList.add('show-user_activity_detail-modal')
			}
		}
	}
	
	private showUserProfile(selectedUserId: string) {
		// this.setState({selectedUserId})
		// document.body.classList.add('show-user-profile-modal')
	}
	
	private toggleCollapse(filterId: number) {
		if (filterId === this.state.activeCollapse) {
			this.setState({activeCollapse: 0})
		} else {
			this.setState({activeCollapse: filterId})
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.contestDetail,
	leaderboardState: state.leaderBoard,
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	fetchContestDetail,
	fetchLeaderboard,
	participateContestant,
	participateJudge,
	fetchContestMemberEntries,
	createEntry,
	updateEntry
})(ContestDetail)