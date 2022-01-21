import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import Slider from 'react-slick'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Rating from '../components/Rating'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import {
	createExpertiseOrder,
	fetchExpertiseDetail,
	fetchExpertiseOrder,
	updateExpertiseOrder
} from '../actions/expertise'
import ExpertiseBrief from '../components/ExpertiseBrief'
import ExpertiseOffers from '../components/ExpertiseOffers'
import ExpertisePackage from '../components/ExpertisePackage'
import ExpertProfile from '../components/ExpertProfile'
import Icon from '../components/Icon'
import { ActionTypeStates } from '../constants/action-types'
import { galleryCarousel } from '../constants/carouselSettings'
import { BriefDataRecord, ExpertiseRecord, PackageRecord } from '../constants/models'
import { State as AuthenticateState } from '../reducers/authenticate'
import { State as ExpertiseDetailDataState } from '../reducers/expertiseDetail'
import { RootState } from '../reducers/index'

const Spinner = require('react-spinkit')

interface ExpertiseDetailMatchParams {
	shortId: string
	slug: string
	projectId: string
}

interface ExpertiseDetailProps extends Partial<RouteComponentProps<ExpertiseDetailMatchParams>> {
	state: ExpertiseDetailDataState
	authenticateState: AuthenticateState
	fetchExpertiseDetail: any
	fetchExpertiseOrder: any
	createExpertiseOrder: any
	updateExpertiseOrder: any
}

interface ExpertiseDetailState {
	contentTabIndex: number
	statusTabIndex: number
	activeExpertisePackageId: string
	connectedProjectId: string
}

class ExpertiseDetail extends React.Component<ExpertiseDetailProps, ExpertiseDetailState> {
	constructor(props: ExpertiseDetailProps) {
		super(props)
		
		this.state = {
			contentTabIndex: 0,
			statusTabIndex: 0,
			activeExpertisePackageId: (props.state.expertise && props.state.expertise.packages.length > 0) ?
				props.state.expertise.packages[0]._id : '',
			connectedProjectId: props.match.params.projectId
		}
	}
	
	public componentDidMount() {
		const expertiseShortId = this.props.match.params.shortId
		
		this.props.fetchExpertiseDetail(expertiseShortId)
			.then((response: any) => response.payload)
			.then((e: ExpertiseRecord) => this.props.fetchExpertiseOrder(e._id))
	}
	
	public componentWillReceiveProps(nextProps: ExpertiseDetailProps) {
		const expertiseSlug = nextProps.match.params.slug
		
		// Update the location on the url if the correct slug is not present
		if (nextProps.state.expertise && nextProps.state.expertise.slug !== expertiseSlug) {
			this.props.history.replace('/expertise/' +
				nextProps.state.expertise.shortId + '/' + nextProps.state.expertise.slug)
		}
		
		// Update the highlighted expertise package id if the following rules meet
		// 1. A first time expertise has a package present
		// 2. An orders selected package is present
		if ((this.state.activeExpertisePackageId === '' && (nextProps.state.expertise &&
			nextProps.state.expertise.packages.length > 0))) {
			this.setState({activeExpertisePackageId: nextProps.state.expertise.packages[0]._id})
		}
		if (nextProps.state.expertiseOrder && !this.props.state.expertiseOrder) {
			this.setState({activeExpertisePackageId: nextProps.state.expertiseOrder.selectedPackage})
		}
	}
	
	public render() {
		const {state, authenticateState} = this.props
		
		return (
			<div className="desk">
				<Helmet>
					<title>{(state.expertise && state.expertise.name) ? state.expertise.name : 'Expertise'}&nbsp;
						| Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="desk-inner">
					<div className="desk-section__wrap">
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
							state.expertise && state.status === ActionTypeStates.SUCCESS && (
								<div>
									{
										(state.expertiseOrder && state.orderStatus === ActionTypeStates.SUCCESS) && (
											<div>
												<h2 className="desk-section__title">My Order</h2>
												<div className="desk-section desk-section--model-detail">
													<div className="model-detail__tabs">
														<Tabs
															selectedIndex={this.state.statusTabIndex}
															onSelect={statusTabIndex => this.setState({statusTabIndex})}>
															<TabList>
																<Tab>Brief</Tab>
																<Tab>
																	Offers
																	{
																		state.expertiseOrder.offers &&
																		<span className="badge">{state.expertiseOrder.offers.length}</span>
																	}
																</Tab>
																<Tab>Messages</Tab>
															</TabList>
															<TabPanel>
																<ExpertiseBrief
																	briefTemplate={state.expertise.briefTemplate}
																	briefData={state.expertiseOrder.briefData}
																	onSubmit={(briefData: BriefDataRecord) => {
																		this.props.updateExpertiseOrder(state.expertiseOrder._id, briefData)
																	}}/>
															</TabPanel>
															<TabPanel>
																<ExpertiseOffers
																	briefOffers={state.expertiseOrder.offers}
																	onPurchase={() => {
																		console.log('Go to purchase')
																	}}
																	onCompleteBrief={() => {
																		this.setState({statusTabIndex: 0})
																	}}/>
															</TabPanel>
															<TabPanel>
																{/*<Conversation conversationId="conversationId"/>*/}
															</TabPanel>
														</Tabs>
													</div>
												</div>
											</div>
										)
									}
									<div className="desk-section desk-section--model-detail desk-section--expertise-detail">
										<div>
											<div className="model-detail__top">
												<h2 className="model-detail__name">
													{state.expertise.name}
													{
														(authenticateState.user && state.expertise.expert.userId)
															&& state.expertise.expert.userId === authenticateState.user._id &&
															<Link to={`/expertise/${state.expertise.shortId}/edit`}>
																<span className="badge"><Icon name="edit"/> Edit</span>
															</Link>
													}
												</h2>
												<div className="expertise-detail__rating">
													<Rating value={state.expertise.rating}/>
													<span className="rating">{state.expertise.rating || 0}</span>&nbsp;
													<span className="reviews">(0)</span>
												</div>
												
												<div className="model-detail__tile__wrap">
													<div className="model-detail__tile model-detail__tile--left">
														<div className="expertise-detail__gallery">
															<Slider {...galleryCarousel}>
																{
																	state.expertise.gallery.map((g: string, i: number) => <img key={i} src={g}/>)
																}
															</Slider>
														</div>
													</div>
													<div className="model-detail__tile model-detail__tile--right">
														<div className="expertise-detail__packages">
															{
																state.expertise.packages.map((ep: PackageRecord) => (
																	<ExpertisePackage
																		key={ep.name} {...ep} isLight={true}
																		isOpen={this.state.activeExpertisePackageId === ep._id}
																		isPurchased={state.expertiseOrder != null &&
																		state.expertiseOrder.selectedPackage === ep._id}
																		isHidden={state.expertiseOrder !== null}
																		onOpen={() => {
																			this.setState({activeExpertisePackageId: ep._id})
																		}}
																		onOrder={() => {
																			this.purchaseOrder(ep._id)
																		}}/>
																))
															}
														</div>
													</div>
												</div>
											</div>
											
											<div className="model-detail__tabs">
												<Tabs
													selectedIndex={this.state.contentTabIndex}
													onSelect={contentTabIndex => this.setState({contentTabIndex})}>
													<TabList>
														<Tab>About</Tab><Tab>Reviews</Tab><Tab>FAQ</Tab>
													</TabList>
													<TabPanel>
														<div className="expertise-detail__about">
															<div
																className="expertise-detail__about__content"
																dangerouslySetInnerHTML={{__html: state.expertise.about}}/>
															<ExpertProfile {...state.expertise.expert} isMicro={true}/>
														</div>
													</TabPanel>
													<TabPanel>
														There are no reviews yet
													</TabPanel>
													<TabPanel>
													</TabPanel>
												</Tabs>
											</div>
										</div>
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		)
	}
	
	private purchaseOrder(selectedPackageId: string) {
		const {state} = this.props
		
		if (state.expertise) {
			this.props.createExpertiseOrder(state.expertise._id, selectedPackageId, this.state.connectedProjectId)
				.then(() => this.props.fetchExpertiseOrder(state.expertise._id))
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate,
	state: state.expertiseDetail
})

export default connect(mapStateToProps, {
	fetchExpertiseDetail,
	fetchExpertiseOrder,
	createExpertiseOrder,
	updateExpertiseOrder
})(ExpertiseDetail)