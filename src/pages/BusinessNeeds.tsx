import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import HeroBanner from '../components/HeroBanner'

import { State as ExpertMarketplaceDataState } from '../reducers/expertMarketplace'
import { RootState } from '../reducers/index'

import { Link } from 'react-router-dom'
import { fetchBusinessNeeds } from '../actions/businessNeeds'
import BusinessNeedsTile, { BusinessNeedsViewType } from '../components/BusinessNeedsTile'
import { ActionTypeStates } from '../constants/action-types'
import { BusinessNeedsRecord } from '../constants/models'

const Spinner = require('react-spinkit')
const expertiseItems = require('../data/expertiseItems.json').items

interface BusinessNeedMatchParams {
	slug: string
}

interface BusinessNeedProps extends Partial<RouteComponentProps<BusinessNeedMatchParams>> {
	state: ExpertMarketplaceDataState
	fetchBusinessNeeds: any
	isMicro?: boolean
}

interface BusinessNeedState {
	activeFilter: number
	filterCategory: any
	filterLocation: string
	filterBudget: string
}

class BusinessNeed extends React.Component<BusinessNeedProps, BusinessNeedState> {
	constructor(props: BusinessNeedProps) {
		super(props)
		
		this.state = {
			activeFilter: -1,
			filterCategory: null,
			filterLocation: null,
			filterBudget: null
		}
	}
	
	public componentDidMount() {
		const filterBusinessNeedsCategory = expertiseItems.find((fec: any) => fec.slug === this.props.match.params.slug)
		if (filterBusinessNeedsCategory) {
			// this.props.fetchBusinessNeeds(filterBusinessNeedsCategory.id, ['all'])
		} else {
			// this.props.fetchBusinessNeeds(null, ['all'])
		}
	}
	
	public componentWillReceiveProps(nextProps: BusinessNeedProps) {
		if (this.props.match.params.slug !== nextProps.match.params.slug) {
			const filterBusinessNeedsCategory = expertiseItems.find((fec: any) => fec.slug === nextProps.match.params.slug)
			
			if (filterBusinessNeedsCategory) {
				this.setState({filterCategory: filterBusinessNeedsCategory, activeFilter: -1})
				nextProps.fetchBusinessNeeds(filterBusinessNeedsCategory.id, ['all'])
			}
		}
	}
	
	public render() {
		const {state} = this.props
		const {activeFilter, filterCategory} = this.state
		
		let heroTitle = 'BUSINESS NEEDS'
		let heroDescription = 'Explore the business needs. Find a job here.'
		
		if (this.state.filterCategory) {
			heroTitle = `FIND ${this.state.filterCategory.name} EXPERTS`
			heroDescription = this.state.filterCategory.description
		}
		
		return (
			<div>
				<Helmet>
					<title>Business Needs | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/pldt/expert-packages-hero-bg%281%29.png"
					title={heroTitle}
					caption={''}
					description={heroDescription}
					onClick={''}
					cta=""/>
				<div className="business-needs">
					<div className="business-needs__inner">
						<div className="container">
							<div className="business-needs__toptab">
								<Link to={'/expert-marketplace'}>
									<div className="business-needs__market">
										MARKETPLACE
									</div>
								</Link>
								<div className="business-needs__business">
									BUSINESS NEEDS
								</div>
							</div>
							<div className="business-needs__filter">
								<div
									className={'business-needs__filter-item ' + (activeFilter === 0 ? 'active' : '')}
									onClick={() => {
										this.setState({activeFilter: 0})
									}}>
									<span className="business-needs__filter-item__caption">What is the category of your product?</span>
									<span className="business-needs__filter-item__selection">
										{filterCategory ? filterCategory.name : 'Select Category'}
										<span><img src="/icons/arrow-point-collapse.svg"/></span>
									</span>
									<div className="business-needs__filter-item__expanded-menu">
										<div className="business-needs__filter-item__list">
											<div className="business-needs__filter-item__list__items">
												{
													expertiseItems.map((e: any) => (
														<div
															key={e.slug}
															className={'business-needs__filter-item__list__item ' +
															((filterCategory && e.slug === filterCategory.slug) ? 'active' : '')}>
															<Link to={'/business-needs/' + e.slug}>
																<div className="business-needs__filter-item__list__item__icon"><img src={e.icon}/></div>
																<div className="business-needs__filter-item__list__item__title">{e.name}</div>
															</Link>
														</div>
													))
												}
											</div>
										</div>
									</div>
								</div>
								<div
									className={'business-needs__filter-item ' + (activeFilter === 1 ? 'active' : '')}
									onClick={() => {
										this.setState({activeFilter: 1})
									}}>
									<span className="business-needs__filter-item__caption">Search for localized experts</span>
									<span className="business-needs__filter-item__selection">
										Add Location <span><img src="/icons/arrow-point-collapse.svg"/></span>
									</span>
									<div className="business-needs__filter-item__expanded-menu">
									
									</div>
								</div>
								<div
									className={'business-needs__filter-item ' + (activeFilter === 2 ? 'active' : '')}
									onClick={() => {
										this.setState({activeFilter: 2})
									}}>
									<span className="business-needs__filter-item__caption">Do you have a budget?</span>
									<span className="business-needs__filter-item__selection">
										Add Budget <span><img src="/icons/arrow-point-collapse.svg"/></span>
									</span>
									<div className="business-needs__filter-item__expanded-menu">
									
									</div>
								</div>
							</div>
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
								state.status === ActionTypeStates.SUCCESS && (
									<div className="business-needs__expertise">
										<div className="business-needs__expertise__count">
											{state.businessNeedsList.length} Business Needs Found
										</div>
										<div className="business-needs__expertise-list">
											{
												state.businessNeedsList.map((bn: BusinessNeedsRecord, i: number) => (
													<BusinessNeedsTile key={i} viewType={BusinessNeedsViewType.PUBLIC} {...bn}/>
												))
											}
										</div>
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
	state: state.expertMarketplace
})

export default connect(mapStateToProps, {
	fetchBusinessNeeds
})(BusinessNeed)