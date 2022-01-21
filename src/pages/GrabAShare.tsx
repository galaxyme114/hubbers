import * as moment from 'moment'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import * as ReactTooltip from 'react-tooltip'

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import HeroBanner from '../components/HeroBanner'
import Icon from '../components/Icon'

import { fetchInvestorsData, fetchUserTransactions } from '../actions/grabAShare'
import { InvestorRecord, KPIValueRecord } from '../constants/models'
import { RootState } from '../reducers'
import { State as AuthenticateState } from '../reducers/authenticate'
import { State as GrabAShareDataState } from '../reducers/grabAShare'
import { getCurrencySymbol, getNumberWithCommas } from '../utils/currency'

import { Bar as BarChart } from 'react-chartjs-2'
import { RouterProps } from 'react-router'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { Currency } from '../constants/enums'
import { getTransactionTypeStatusLabel } from '../constants/selectOptions'
import { formatDate } from '../utils/dates'

interface GrabAShareProps extends RouterProps {
	state: GrabAShareDataState
	authenticateState: AuthenticateState
	fetchInvestorsData: any
	fetchUserTransactions: any
}

interface GrabAShareState {
	kpiTabIndex: number
}

class GrabAShare extends React.Component<GrabAShareProps, GrabAShareState> {
	private chartOptions: any = {
		legend: {
			position: 'bottom'
		}
	}
	
	public constructor(props: GrabAShareProps) {
		super(props)
		
		this.state = {
			kpiTabIndex: 0
		}
	}
	
	public componentDidMount() {
		this.props.fetchInvestorsData()
		this.props.fetchUserTransactions()
	}
	
	public componentWillReceiveProps(nextProps: GrabAShareProps) {
		// if (nextProps.authenticateState.user && !nextProps.authenticateState.user.isHubbersInvestor) {
		if (nextProps.authenticateState.user &&
			nextProps.authenticateState.user.capabilities.indexOf('site-investor') === -1) {
			this.props.history.push('/request-investor-access')
		}
	}
	
	public render() {
		const {state, authenticateState} = this.props
		
		return (
			<div className="grab-a-share__page">
				<Helmet>
					<title>Grab A Share | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/grab-a-share-banner.jpg"
					title="SHARE & VALUE STATISTICS"
					caption=""
					description="Find out our dynamics of growing <br> hubbers business"
					cta={null}/>
				{
					(authenticateState.user && state.kpi) && (
						<div className="my-shares">
							<div className="container">
								<div className="my-shares__title">HBS Token Value</div>
								<br/>
								
								<div className="my-shares__details__wrap">
									<div className="my-shares__details">
										<div className="my-shares__details__item">
											<div className="my-shares__details__item__label">HBS Value</div>
											<div className="my-shares__details__item__value">USD {
												getNumberWithCommas(state.kpi['current-share-value'], 2)}</div>
										</div>
										<div className="my-shares__details__item">
											<div className="my-shares__details__item__label">No. of HBS I own</div>
											<div className="my-shares__details__item__value">
												{getNumberWithCommas(authenticateState.user.assets.transactionTypes.hbs.totalAmount)}
											</div>
										</div>
										<div className="my-shares__details__item">
											<div className="my-shares__details__item__label">Current value of my HBS tokens</div>
											<div className="my-shares__details__item__value">
												USD {getNumberWithCommas(
													authenticateState.user.assets.transactionTypes.hbs.totalAmount * state.kpi['current-share-value'], 2)}
											</div>
										</div>
										<div className="my-shares__details__item">
											<div className="my-shares__details__item__label">Total number of HBS tokens</div>
											<div className="my-shares__details__item__value">{getNumberWithCommas(state.totalShares)}</div>
										</div>
									</div>
									
									<div className="my-shares__chart">
										{
											(state.kpi && state.kpi['share-value']) &&
											<BarChart data={this.getChartData(state.kpi['share-value'].data)} options={this.chartOptions}/>
										}
									</div>
								</div>
							</div>
						</div>
					)
				}
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
					(state.status === ActionTypeStates.SUCCESS) && (
						<div>
							<div className="hubbers-kpi">
								<Tabs
									selectedIndex={this.state.kpiTabIndex}
									onSelect={kpiTabIndex => this.setState({kpiTabIndex})}>
									<TabList>
										<Tab>My Assets</Tab>
										<Tab>Notice Board</Tab>
										<Tab>Hubbers KPI</Tab>
										{/*<Tab>Documents <span className="badge">0</span></Tab>*/}
									</TabList>
									<TabPanel>
										<div className="container">
											{
												state.userTransactionsStatus === ActionTypeStates.INPROGRESS &&
												<Spinner name="three-dots" fadeIn="none"/>
											}
											{
												(state.userTransactionsStatus !== ActionTypeStates.INPROGRESS) && (
													<div className="hubbers-assets">
														<div className="hubbers-assets__metrics">
															<div className="hubbers-assets__metric hubbers-assets__total">
																<div className="hubbers-assets__metric__label">Total Balance</div>
																<div className="hubbers-assets__metric__value">
																	{getCurrencySymbol(Currency.USD)} {getNumberWithCommas(state.userTransactions.totalAssets)}
																</div>
															</div>
															
															<div className="hubbers-assets__metric hubbers-assets__increase">
																<div className="hubbers-assets__metric__label">Value Increase</div>
																<div className="hubbers-assets__metric__value">
																	{state.userTransactions.valueIncrease < 0 ? '-' : '+'}&nbsp;
																	{state.userTransactions.valueIncrease.toFixed(2)}%
																</div>
															</div>
															
															<div className="hubbers-assets__metric hubbers-assets__purchase">
																<div className="hubbers-assets__metric__label">Get More</div>
																<div className="hubbers-assets__metric__value">
																	<a href="https://token.hubbers.io/" className="btn btn-outline" target="_blank">
																		Visit Token Pre-Sale
																	</a>
																</div>
															</div>
														</div>
														
														{
															state.userTransactions.transactionTypes !== {} && (
																<div className="hubbers-assets__transactions">
																	<Tabs>
																		<TabList>
																			{
																				Object.keys(state.userTransactions.transactionTypes).map((tKey: string, i: number) => (
																					<Tab key={i}>
																						<div className="hubbers-assets__transactions__tab">
																							<div className="hubbers-assets__transactions__tab-header">
																								<div className="hubbers-assets__transactions__tab-header__label">
																									{tKey}
																								</div>
																								<div className="hubbers-assets__transactions__tab-header__value">
																									{getNumberWithCommas(state.userTransactions.transactionTypes[tKey].totalAmount)}
																								</div>
																							</div>
																							<div className="hubbers-assets__transactions__tab-description">
																								{
																									tKey === 'hbs' && <span>Hubbers Security Token</span>
																								}
																								{
																									tKey === 'hbb' && <span>Hubbers Utility Token</span>
																								}
																								{
																									tKey === 'usd' && <span>United States Dollar</span>
																								}
																							</div>
																							{
																								tKey !== 'usd' && (
																									<div className="hubbers-assets__transactions__tab-actions">
																										<a href="https://token.hubbers.io/" target="_blank">
																											<button>Buy</button>
																										</a>
																										<span data-tip="Available after mid December">
																											<button disabled={true}>Sell</button>
																										</span>
																									</div>
																								)
																							}
																							{
																								tKey === 'usd' && (
																									<div className="hubbers-assets__transactions__tab-actions">
																										<span data-tip="Available after mid December">
																											<button disabled={true}>Top-Up</button>
																										</span>
																										<span data-tip="Available after mid December">
																											<button disabled={true}>Withdraw</button>
																										</span>
																									</div>
																								)
																							}
																							<ReactTooltip effect="solid"/>
																						</div>
																					</Tab>
																				))
																			}
																		</TabList>
																		
																		{
																			Object.keys(state.userTransactions.transactionTypes).map((tKey: string, i: number) => (
																				<TabPanel key={i}>
																					<div>
																						<table className="table table-striped">
																							<thead>
																							<tr>
																								<th>Tx ID</th>
																								<th>Date</th>
																								<th>Type</th>
																								<th>Amount</th>
																							</tr>
																							</thead>
																							<tbody>
																							{
																								state.userTransactions.transactionTypes[tKey].transactions.map((t, ii) => (
																									<tr key={ii}>
																										<td>{t.txId}</td>
																										<td>{formatDate(t.createdAt)}</td>
																										<td>{getTransactionTypeStatusLabel(t.type)}</td>
																										<td>{getNumberWithCommas(t.amount)} {getCurrencySymbol(t.currency)}</td>
																									</tr>
																								))
																							}
																							</tbody>
																						</table>
																						{
																							state.userTransactions.transactionTypes[tKey].transactions.length === 0 && (
																								<div className="empty-notice">
																									<br/><br/><br/>
																									No transactions available
																								</div>
																							)
																						}
																					</div>
																				</TabPanel>
																			))
																		}
																	</Tabs>
																</div>
															)
														}
													</div>
												)
											}
										</div>
									</TabPanel>
									<TabPanel>
										<div className="container">
											<div className="hubbers-kpi__notices">
												{
													// state.notices.map((n: InvestorNoticeRecord) => (
													// 	<div key={n.id} className="hubbers-kpi__notice">
													// 		<div className="hubbers-kpi__notice__date">{moment(n.created_at).fromNow()}</div>
													// 		<div className="hubbers-kpi__notice__title">{n.heading}</div>
													// 		<div
													// 			className="hubbers-kpi__notice__content"
													// 			dangerouslySetInnerHTML={{__html: n.message}}/>
													// 	</div>
													// ))
												}
												<div className="hubbers-kpi__notice">
													<strong>Dear Hubbers investors, token holders and observers,</strong><br/>
													<br/>
													Again, we had a great innovative week of creation.<br/>
													<br/>
													<br/>
													<strong>Done last week:</strong>
													
													<ul>
														<li>We finalized 2 partnerships: one in China / one in Vietnam</li>
														<li>We got 3 new projects that we will disclose soon to you once vetted</li>
														<li>We implemented feedbacks on product competition side in order to start giving a better
															experience to both awards judge and contestants
														</li>
														<li>We have revamped our on boarding process in order to cope with Linkedin new guidelines
															as few members got some login issues
														</li>
														<li>We finished designing wireframe for module Business Canvas, market analysis, BOM</li>
														<li>We have reached out 6 new potentials partners/sponsors</li>
													</ul>
													<br/>
													<strong>What is on this week?</strong>
													
													<ul>
														<li>Onboarding judges and contestants for new contests. Please register as an Awards judge
															to understand how it works
														</li>
														<li>Onboarding experts in expert market place to test core functionalities in “Validation
															Business Canvas / Helping creators realizing their business canvass” and B2B customers
															outreach
														</li>
														<li>Finalizing the hiring of our sponsorship manager</li>
													</ul>
													<br/>
													<strong>Upcoming Events:</strong>
													
													<ul>
														<li>Today Beijing: Big thumb up to Bella and Guillaume. Waiting the pictures soon</li>
														<li>March: Singapore/ Taipei/Guangzhou/Seoul/ + European tour</li>
														<li>Vietnam to be added to the list of country soon</li>
													</ul>
													<br/>
													<strong>HBS Token Value: </strong><br/>
													<br/>
													HBS token to be sold at USD 1from the March 1st,<br/>
													[now at USD 0.9]<br/>
													<br/>
													<br/>
													<strong>New guidelines for Observers group</strong><br/>
													<br/>
													We have worked on guidelines for our investors/token holders/observers group to give a better
													experience to everyone.<br/>
													<br/>
													As mentioned before, being an Observer in hubbers.io allows us to share with enthusiastic
													individuals our passion for innovation, startups and product development.<br/>
													<br/>
													We provide you with regular insights about what we do and make all be in the core of
													Hubbers.<br/>
													<br/>
													<br/>
													<strong>From March 15th, 2019, observers group will be updated as follows:</strong><br/>
													<br/>
													All observers will be invited for a 2-month period. Within the 2-month period, observers can
													either choose to become token holders or become regular Hubbers members.<br/>
													<br/>
													We have designed an individual membership package in order to cope with everybody
													expectations.<br/>
													<br/>
													Individual membership package has the following benefits:
													<ul>
														<li>Unlimited invitations to our worldwide events</li>
														<li>Invitation to all our investors/token holders regular events</li>
														<li>Priority of seeing projects and investing in new products [pro rata to their membership
															fees]
														</li>
														<li>Investors/token holder Newsletters/Updates</li>
													</ul>
													Membership package starts at 1000usd. The membership is converted into HBS token [Hubbers
													security token].<br/>
													<br/>
													Details can be found here:
													<a
														href="https://docs.google.com/spreadsheets/d/1yT4XHQinxVWYVVG2
														v9MrzSwc9tGkD0ii_JJyeGx34dY/edit#gid=2020537445"
														target="_blank">
														https://docs.google.com/spreadsheets/d/1yT4XHQinxVWYVVG2v9MrzSwc9tGkD0ii_
														JJyeGx34dY/edit#gid=2020537445</a><br/>
													<br/>
													<br/>
													<strong>Investors/Token holders/observers meetings</strong><br/>
													<br/>
													Last but not least, we will have an INVESTORS/TOKEN HOLDERS/OBSERVERS gathering on March 6th
													at WeWork Nanjing West Road.<br/>
													<br/>
													7:00pm- 7:25pm : Hubbers key figures: past, present and future.<br/>
													<br/>
													7:25pm - 7:45: Q&amp;A<br/>
													<br/>
													8:00: dinner at for the ones who are free. Mingling, networking and chatting between us.<br/>
													<br/>
													<br/>
													Feel free to invite a friend who shares our spirit and might be interested in joining us.
												</div>
											</div>
										</div>
									</TabPanel>
									<TabPanel>
										<div className="container">
											<Tabs>
												<TabList>
													<Tab>Users KPI</Tab>
													<Tab>Projects KPI</Tab>
													<Tab>Contests KPI</Tab>
												</TabList>
												<TabPanel>
													<div className="container">
														<div className="hubbers-kpi__charts">
															<div className="hubbers-kpi__chart">
																<h3 className="hubbers-kpi__chart__title">Creators</h3>
																{
																	(state.kpi && state.kpi['kpi-users-creators']) &&
																	<BarChart
																		data={this.getChartData(state.kpi['kpi-users-creators'].data)}
																		options={this.chartOptions}/>
																}
															</div>
															<div className="hubbers-kpi__chart">
																<h3 className="hubbers-kpi__chart__title">Experts</h3>
																{
																	(state.kpi && state.kpi['kpi-users-experts']) &&
																	<BarChart
																		data={this.getChartData(state.kpi['kpi-users-experts'].data)}
																		options={this.chartOptions}/>
																}
															</div>
															<div className="hubbers-kpi__chart">
																<h3 className="hubbers-kpi__chart__title">Super Experts</h3>
																{
																	(state.kpi && state.kpi['kpi-users-super-experts']) &&
																	<BarChart
																		data={this.getChartData(state.kpi['kpi-users-super-experts'].data)}
																		options={this.chartOptions}/>
																}
															</div>
															<div className="hubbers-kpi__chart">
																<h3 className="hubbers-kpi__chart__title">Investors</h3>
																{
																	(state.kpi && state.kpi['kpi-users-investor']) &&
																	<BarChart
																		data={this.getChartData(state.kpi['kpi-users-investor'].data)}
																		options={this.chartOptions}/>
																}
															</div>
														</div>
													</div>
												</TabPanel>
												<TabPanel>
													<div className="container">
														<div className="hubbers-kpi__charts">
															<div className="hubbers-kpi__chart">
																<h3 className="hubbers-kpi__chart__title">Ongoing</h3>
																{
																	(state.kpi && state.kpi['kpi-projects-ongoing']) &&
																	<BarChart
																		data={this.getChartData(state.kpi['kpi-projects-ongoing'].data)}
																		options={this.chartOptions}/>
																}
															</div>
															<div className="hubbers-kpi__chart">
																<h3 className="hubbers-kpi__chart__title">Completed</h3>
																{
																	(state.kpi && state.kpi['kpi-completed-projects']) &&
																	<BarChart
																		data={this.getChartData(state.kpi['kpi-completed-projects'].data)}
																		options={this.chartOptions}/>
																}
															</div>
														</div>
													</div>
												</TabPanel>
												<TabPanel>
													<div className="container">
														<div className="hubbers-kpi__charts">
															<div className="hubbers-kpi__chart">
																<h3 className="hubbers-kpi__chart__title">Ongoing</h3>
																{
																	(state.kpi && state.kpi['kpi-ongoing-contests']) &&
																	<BarChart
																		data={this.getChartData(state.kpi['kpi-ongoing-contests'].data)}
																		options={this.chartOptions}/>
																}
															</div>
															<div className="hubbers-kpi__chart">
																<h3 className="hubbers-kpi__chart__title">Completed</h3>
																{
																	(state.kpi && state.kpi['kpi-completed-contests']) &&
																	<BarChart
																		data={this.getChartData(state.kpi['kpi-completed-contests'].data)}
																		options={this.chartOptions}/>
																}
															</div>
														</div>
													</div>
												</TabPanel>
											</Tabs>
										</div>
									</TabPanel>
								</Tabs>
							</div>
							
							<div className="investors-list">
								<div className="container">
									<div className="investors-list__title">Hubbers <em>Investors</em> &amp; <em>Token Holders</em></div>
									
									<div className="investors-list__items">
										{
											state.investors.length > 0 && state.investors.map((i: InvestorRecord) => (
												<div key={i.user._id} className="investors-list__item">
													<div className="investors-list__item__image">
														<div style={{backgroundImage: `url(${i.user.thumbnailImageUrl})`}}/>
													</div>
													<div className="investors-list__item__meta">
														<div className="investors-list__item__name">{i.user.fullName}</div>
														<div className="investors-list__item__caption">{i.user.nationality}</div>
													</div>
													<div className="investors-list__item__footer">
														<div className="investors-list__item__shares">
															<label>HBS</label>
															<span>{i.numShares ? getNumberWithCommas(i.numShares) : 0}</span>
														</div>
														{
															i.user.linkedinProfileUrl && (
																<a
																	className="investors-list__item__linkedin"
																	href={i.user.linkedinProfileUrl} target="_blank" rel="nofollow">
																	<Icon name="linkedin"/>
																</a>
															)
														}
													</div>
												</div>
											))
										}
									</div>
								</div>
							</div>
							
							<div className="observers-list">
								<div className="container">
									<div className="observers-list__title">Hubbers <em>Observers</em></div>
									
									<div className="observers-list__items">
										{
											state.observers.length > 0 && state.observers.map((i: InvestorRecord) => (
												<div key={i.user._id} className="observers-list__item">
													<div className="observers-list__item__image">
														<div style={{backgroundImage: `url(${i.user.thumbnailImageUrl})`}}/>
													</div>
													<div className="observers-list__item__name">{i.user.fullName}</div>
													<div className="observers-list__item__caption">{i.user.nationality}</div>
												</div>
											))
										}
									</div>
								</div>
							</div>
						</div>
					)
				}
			</div>
		)
	}
	
	private getChartData(dataSet: ReadonlyArray<KPIValueRecord>) {
		const labels: string[] = []
		const plannedData: number[] = []
		const actualData: number[] = []
		
		dataSet.map((d: KPIValueRecord) => {
			labels.push(moment(d.month).format('MMM YY'))
			plannedData.push(d.planned)
			actualData.push(d.actual)
		})
		
		const plannedDataSetProperties = {
			label: 'Planned',
			backgroundColor: '#2E95B4',
			borderWidth: 0
		}
		
		const actualDataSetProperties = {
			label: 'Actual',
			backgroundColor: '#75AC2A',
			borderWidth: 0
		}
		
		return {
			labels,
			datasets: [
				{...plannedDataSetProperties, data: plannedData},
				{...actualDataSetProperties, data: actualData}
			]
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.grabAShare,
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	fetchInvestorsData,
	fetchUserTransactions
})(GrabAShare)