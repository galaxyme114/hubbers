import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import {
	createProjectBusinessNeeds,
	deleteProjectBusinessNeeds,
	fetchProjectDetail,
	fetchProjectDetailOngoingBusinessNeeds,
	fetchProjectDetailOngoingExpertise,
	fetchProjectDetailUserData,
	updateProjectDetail
} from '../actions/projects'
import BusinessNeedsCreateModal from '../components/BusinessNeedsCreateModal'
import BusinessNeedsDetail from '../components/BusinessNeedsDetail'
import Icon from '../components/Icon'
import ProjectDetailsStep from '../components/ProjectDetailsStep'
import { ActionTypeStates } from '../constants/action-types'
import { ProjectStageValues } from '../constants/enums'
import { BusinessNeedsRecord, ProjectRecord } from '../constants/models'
import ProductLauncher from '../containers/ProductLauncher'
import { RootState } from '../reducers/index'
import { State as ProjectDetailDataState } from '../reducers/projectDetail'
import Spinner from '../components/Spinner'

interface ProjectDetailMatchParams {
	shortId: string
	slug: string
}

interface ProjectDetailProps extends Partial<RouteComponentProps<ProjectDetailMatchParams>> {
	state: ProjectDetailDataState,
	fetchProjectDetail: any
	updateProjectDetail: any
	fetchProjectDetailUserData: any
	fetchUserData: any
	fetchProjectDetailOngoingExpertise: any
	fetchProjectDetailOngoingBusinessNeeds: any
	createProjectBusinessNeeds: any
	deleteProjectBusinessNeeds: any
}

interface ProjectDetailState {
	tabIndex: number
}

class ProjectDetail extends React.Component<ProjectDetailProps, ProjectDetailState> {
	constructor(props: ProjectDetailProps) {
		super(props)
		
		this.state = {
			tabIndex: 0
		}
	}
	
	public componentDidMount() {
		const projectShortId = this.props.match.params.shortId
		
		this.props.fetchProjectDetail(projectShortId)
			.then((response: any) => response.payload)
			.then((project: ProjectRecord) => {
				this.props.fetchProjectDetailOngoingExpertise(project._id)
				this.props.fetchProjectDetailOngoingBusinessNeeds(project._id)
				this.props.fetchProjectDetailUserData(project.pldt_session)
			})
	}
	
	public render() {
		const {state} = this.props
		
		return (
			<div className="desk">
				<Helmet>
					<title>{(state.project && state.project.name) ? state.project.name : 'Projects'} | Hubbers - Hub of
						Makers</title>
				</Helmet>
				<div className="desk-inner">
					<div className="desk-section__wrap">
						<div className="desk-section desk-section--model-detail">
							{
								state.project && state.status === ActionTypeStates.SUCCESS && (
									<div>
										<div className="model-detail__top">
											<h2 className="model-detail__name">
												{state.project.name}
												{
													(state.project.isDraft) && <span className="badge">Draft</span>
												}
											</h2>
											<span className="model-detail__date">{moment(state.project.created_at).fromNow()}</span>
											<div className="model-detail__tile__wrap">
												<div className="model-detail__tile model-detail__tile--left">
													<div
														className="image"
														style={{backgroundImage: 'url(' + state.project.featuredImageUrl + ')'}}/>
												</div>
												<div className="model-detail__tile model-detail__tile--right">
													<div className="model-detail__stats">
														<div><Icon name="eye"/> {state.project.views}</div>
														<div><Icon name="heart-empty"/> {state.project.likesCount}</div>
														<div><Icon name="share"/> {state.project.shares}</div>
													</div>
													{/* Assessment Score */}
													{/*<div className="model-detail__status">*/}
													{/*<h4 className="model-detail__status__title">Assessment Score</h4>*/}
													{/*<span className="model-detail__status__value">87% - Top tier!</span>*/}
													{/*</div>*/}
													
													{/* Project Status */}
													<div className="model-detail__status">
														<h4 className="model-detail__status__title">Project Status</h4>
														<span className="model-detail__status__value">
															Step {Math.floor(state.project.state + 1)} - {ProjectStageValues[state.project.state]}
														</span>
													</div>
												</div>
											</div>
										</div>
										
										<div className="model-detail__tabs">
											<Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
												<TabList>
													<Tab>Details</Tab>
													<Tab>Assessment</Tab>
													<Tab>Business Needs</Tab>
													{/*<Tab>Tasks</Tab>*/}
													{/*<Tab>Settings</Tab>*/}
												</TabList>
												{/* Project Details */}
												<TabPanel>
													<ProjectDetailsStep
														project={state.project}
														onUpdate={(updatedProjectRecord: ProjectRecord) => {
															this.props.updateProjectDetail(updatedProjectRecord)
														}}/>
												</TabPanel>
												{/* Product Launcher */}
												<TabPanel>
													{state.project.pldt_session && <ProductLauncher sessionKey={state.project.pldt_session}/>}
													{
														!state.project.pldt_session && (
															<div className="desk-section desk-section--new-project">
																<div className="desk-section__content">
																	<h3>Start your project assessment</h3>
																	<p>Take an assessment using our product launcher quiz to
																		determine your project's level of readiness</p>
																	<Link to={'/product-launcher'}>
																		<div className="cta">
																			<button className="btn btn-rounded">Take an assessment</button>
																		</div>
																	</Link>
																</div>
															</div>
														)
													}
												</TabPanel>
												{/* Business Needs */}
												<TabPanel className="business-needs-tab">
													<div>
														{
															state.ongoingBusinessNeeds.length > 0 && (
																<div className="business-needs-detail">
																	<div className="need-details-header_row">
																		<div className="need-details-header_profile"/>
																		<div className="need-details-header_name">
																			<label>ACTIVE BUSINESS NEED</label>
																		</div>
																		<div className="need-details-header_bids">
																			<label>BIDS</label>
																		</div>
																		<div className="need-details-header_amount">
																			<label>AVG AMOUNT</label>
																		</div>
																		<div className="need-details-header_time">
																			<label>AVG. DELIVERY TIME</label>
																		</div>
																		<div className="need-details-header_accord"/>
																	</div>
																	{
																		state.ongoingBusinessNeeds.map((ogb: BusinessNeedsRecord, i: number) =>
																			<BusinessNeedsDetail
																				key={i}
																				{...ogb}
																				onDelete={() => {
																					this.props.deleteProjectBusinessNeeds(ogb)
																				}}/>)
																	}
																</div>
															)
														}
														<div className="desk-section desk-section--new-project">
															<div className="desk-section__content">
																<h3>Post a business need</h3>
																<p>Post your business needs and receive customized
																	quotations from experts around the world.</p>
																<div className="cta">
																	<button
																		className="btn btn-rounded"
																		onClick={() => {
																			document.body.classList.add('show-business-needs-create-modal')
																		}}>Post a Business Need
																	</button>
																</div>
															</div>
														</div>
													</div>
												</TabPanel>
												{/* Tasks */}
												{/*<TabPanel>*/}
												{/*<div>*/}
												{/*<h2 className="desk-section__title">*/}
												{/*Ongoing Tasks*/}
												{/*{ (state.ongoingExpertise && state.ongoingExpertise.length) ?*/}
												{/*`${state.ongoingExpertise.length}` : '' }*/}
												{/*</h2>*/}
												{/*{*/}
												{/*(state.ongoingExpertise && state.ongoingExpertise.length === 0) && (*/}
												{/*<div>No ongoing expertise</div>*/}
												{/*)*/}
												{/*}*/}
												{/*{*/}
												{/*(state.ongoingExpertise && state.ongoingExpertise.length > 0) && (*/}
												{/*<ExpertiseList*/}
												{/*expertiseIds={state.ongoingExpertise}*/}
												{/*onClick={(e: ExpertiseRecord) => {*/}
												{/*this.props.history.push('/expertise/' + e.shortId + '/' +*/}
												{/*slugify(e.name) + '/' + state.project._id, '_blank')*/}
												{/*}}/>*/}
												{/*)*/}
												{/*}*/}
												{/*</div>*/}
												{/*{*/}
												{/*(state.userData && state.userData.shortlistedExpertise &&*/}
												{/*state.userData.shortlistedExpertise.length > 0) && (*/}
												{/*<div>*/}
												{/*<h2 className="desk-section__title">*/}
												{/*Shortlisted Tasks ({state.userData.shortlistedExpertise.length})*/}
												{/*</h2>*/}
												{/*<ExpertiseList*/}
												{/*expertiseIds={state.userData.shortlistedExpertise}*/}
												{/*onClick={(e: ExpertiseRecord) => {*/}
												{/*this.props.history.push('/expertise/' + e.shortId + '/' +*/}
												{/*slugify(e.name) + '/' + state.project._id, '_blank')*/}
												{/*}}/>*/}
												{/*</div>*/}
												{/*)*/}
												{/*}*/}
												{/*</TabPanel>*/}
												{/* Settings */}
												{/*<TabPanel>*/}
												{/*Settings*/}
												{/*</TabPanel>*/}
											</Tabs>
										</div>
									</div>
								)
							}
							{
								state.status === ActionTypeStates.INPROGRESS && (
									<div style={{padding: '2rem'}}><Spinner name="three-dots" fadeIn="none"/></div>
								)
							}
						</div>
						
						{/* New Business Needs Modal */}
						<BusinessNeedsCreateModal
							project={this.props.state.project}
							onSubmit={(newBusinessNeeds: BusinessNeedsRecord) => {
								this.props.createProjectBusinessNeeds(newBusinessNeeds)
							}}/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.projectDetail
})

export default connect(mapStateToProps, {
	fetchProjectDetail,
	updateProjectDetail,
	fetchProjectDetailUserData,
	fetchProjectDetailOngoingExpertise,
	fetchProjectDetailOngoingBusinessNeeds,
	createProjectBusinessNeeds,
	deleteProjectBusinessNeeds
})(ProjectDetail)