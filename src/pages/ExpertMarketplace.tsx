import { Range } from 'rc-slider'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import Expertise from '../components/Expertise'
import HeroBanner from '../components/HeroBanner'

import { RootState } from '../reducers'
import { State as ExpertMarketplaceDataState } from '../reducers/expertMarketplace'

import { Link } from 'react-router-dom'
import { fetchExpertise } from '../actions/suggestedExpertise'
import Icon from '../components/Icon'
import { ActionTypeStates } from '../constants/action-types'
import { ExpertiseRecord } from '../constants/models'
import SmoothScroll from '../utils/smoothScroll'
import { slugify } from '../utils/stringUtils'

const Spinner = require('react-spinkit')
const expertiseItems = require('../data/expertiseItems.json').items
const countries = require('../data/countries.json').commonCountries

interface ExpertMarketplaceMatchParams {
	slug: string
	location: string
	budget: string
}

interface ExpertMarketplaceProps extends Partial<RouteComponentProps<ExpertMarketplaceMatchParams>> {
	state: ExpertMarketplaceDataState
	fetchExpertise: any
}

interface ExpertMarketplaceState {
	activeFilter: number
	filterCategory: any
	filterLocation: any
	filterBudget: {
		min: number
		max: number
	}
}

class ExpertMarketplace extends React.Component<ExpertMarketplaceProps, ExpertMarketplaceState> {
	constructor(props: ExpertMarketplaceProps) {
		super(props)
		
		this.state = {
			activeFilter: -1,
			filterCategory: null,
			filterLocation: null,
			filterBudget: null
		}
	}
	
	public componentDidMount() {
		const filterExpertiseCategory = expertiseItems.find((fec: any) => fec.slug === this.props.match.params.slug)
		
		if (filterExpertiseCategory) {
			this.props.fetchExpertise(filterExpertiseCategory.id, ['all'])
		} else {
			this.props.fetchExpertise(null, ['all'])
		}
	}
	
	public componentWillReceiveProps(nextProps: ExpertMarketplaceProps) {
		if (this.props.match.params.slug !== nextProps.match.params.slug) {
			const filterExpertiseCategory = expertiseItems.find((fec: any) => fec.slug === nextProps.match.params.slug)
			
			if (filterExpertiseCategory) {
				this.setState({filterCategory: filterExpertiseCategory, activeFilter: -1})
				nextProps.fetchExpertise(filterExpertiseCategory.id, ['all'])
			}
		} else {
			const filterExpertiseCategory = expertiseItems.find((fec: any) => fec.slug === nextProps.match.params.slug)
			
			if (filterExpertiseCategory) {
				this.setState({filterCategory: filterExpertiseCategory})
			}
		}
	}
	
	public render() {
		const {state} = this.props
		const {activeFilter, filterCategory, filterLocation, filterBudget} = this.state
		
		let heroTitle = 'EXPLORE THE MARKETPLACE'
		let heroDescription = 'From idea to market, we\'ve got you covered!<br>' +
			'Find the creative professionals you need to your project.'
		
		if (this.state.filterCategory) {
			heroTitle = `FIND ${this.state.filterCategory.name} EXPERTS`
			heroDescription = this.state.filterCategory.description
		}
		
		return (
			<div>
				<Helmet>
					<title>Expert Packages | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/pldt/expert-packages-hero-bg%281%29.png"
					title={heroTitle.toUpperCase()}
					caption={''}
					description={heroDescription}
					onClick={() => new SmoothScroll(500).scrollTo('expert-packages', 0)}
					cta="Start Exploring"/>
				<div id="expert-packages" className="expert-packages">
					<div className="expert-packages__inner">
						<div className="container">
							{/*<div className="expert-packages__toptab">*/}
							{/*<div className="expert-packages__market">*/}
							{/*MARKETPLACE*/}
							{/*</div>*/}
							{/*<Link to={'/business-needs'}>*/}
							{/*<div className="expert-packages__business">*/}
							{/*BUSINESS NEEDS*/}
							{/*</div>*/}
							{/*</Link>*/}
							{/*</div>*/}
							<div className="expert-packages__filter">
								<div
									className={'expert-packages__filter-item ' + (activeFilter === 0 ? 'active' : '')}
									onClick={() => {
										this.toggleFilter(0)
									}}>
									<span className="expert-packages__filter-item__caption">What is the category of your product?</span>
									<span className="expert-packages__filter-item__selection">
										{filterCategory ? filterCategory.name : 'Select Category'}
										<span><img src="/icons/arrow-point-collapse.svg"/></span>
									</span>
									<div className="expert-packages__filter-item__expanded-menu">
										<div className="expert-packages__filter-item__list">
											<div className="expert-packages__filter-item__list__items">
												{
													expertiseItems.map((e: any) => (
														<div
															key={e.slug}
															className={'expert-packages__filter-item__list__item ' +
															((filterCategory && e.slug === filterCategory.slug) ? 'active' : '')}
															onClick={() => {
																this.updateMarketplaceFilter({filterCategory: e})
															}}>
															<div className="expert-packages__filter-item__list__item__icon"><img src={e.icon}/></div>
															<div className="expert-packages__filter-item__list__item__title">{e.name}</div>
														</div>
													))
												}
											</div>
										</div>
									</div>
								</div>
								<div
									className={'expert-packages__filter-item ' + (activeFilter === 1 ? 'active' : '')}
									onClick={() => {
										this.toggleFilter(1)
									}}>
									<span className="expert-packages__filter-item__caption">Search for localized experts</span>
									<span className="expert-packages__filter-item__selection">
										{filterLocation ? filterLocation.label : 'Add Location'}
										<span><img src="/icons/arrow-point-collapse.svg"/></span>
									</span>
									<div className="expert-packages__filter-item__expanded-menu">
										<div className="expert-packages__filter-item__list">
											<div className="expert-packages__filter-item__list__items">
												{
													countries.map((c: any, i: number) => (
														<div
															key={i}
															className={'expert-packages__filter-item__list__item ' +
															((filterLocation && c.value === filterLocation.value) ? 'active' : '')}
															onClick={() => {
																this.updateMarketplaceFilter({filterLocation: c})
															}}>
															<div
																className="expert-packages__filter-item__list__item__icon">
																{
																	c.value === 'global' && (
																		<Icon name="globe"/>
																	)
																}
																{
																	c.value !== 'global' && (
																		<img src={`https://www.countryflags.io/${c.value}/flat/64.png`}/>
																	)
																}
															</div>
															<div className="expert-packages__filter-item__list__item__title">{c.label}</div>
														</div>
													))
												}
											</div>
										</div>
									</div>
								</div>
								<div
									className={'expert-packages__filter-item ' + (activeFilter === 2 ? 'active' : '')}
									onClick={() => {
										this.toggleFilter(2)
									}}>
									<span className="expert-packages__filter-item__caption">Do you have a budget?</span>
									<span className="expert-packages__filter-item__selection">
										{filterBudget ? `$${filterBudget.min} - $${filterBudget.max}` : 'Add Budget'}
										<span><img src="/icons/arrow-point-collapse.svg"/></span>
									</span>
									<div className="expert-packages__filter-item__expanded-menu">
										<div className="expert-packages__filter-item__budget">
											<div className="expert-packages__filter-item__budget__title">Select your Budget ?</div>
											<div className="expert-packages__filter-item__budget__range">
												<span className="expert-packages__filter-item__budget__range__label">$0</span>
												<Range
													allowCross={false}
													min={0}
													max={8000}
													defaultValue={[
														filterBudget ? filterBudget.min : 500, filterBudget ? filterBudget.max : 5000]}
													onChange={(budget: any) => {
														this.updateMarketplaceFilter(
															{filterBudget: {min: budget[0], max: budget[1]}})
													}}/>
												<span className="expert-packages__filter-item__budget__range__label">$8000</span>
											</div>
										</div>
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
									<div className="expert-packages__expertise">
										<div className="expert-packages__expertise__count">
											{state.expertiseList.length} Expertise Found
										</div>
										<div className="expert-packages__expertise-list">
											{
												state.expertiseList.map((e: ExpertiseRecord) => (
													<div key={e._id}>
														<Expertise
															{...e}
															isMicro={true}
															onClick={() => {
																this.props.history.push('/expertise/' + e.shortId + '/' + slugify(e.name), '_blank')
															}}/>
													</div>
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
	
	private toggleFilter(filterId: number) {
		if (filterId === this.state.activeFilter) {
			this.setState({activeFilter: -1})
		} else {
			this.setState({activeFilter: filterId})
		}
	}
	
	private updateMarketplaceFilter(updatedFilterState: any) {
		const filterKeys = ['filterCategory', 'filterLocation', 'filterBudget']
		
		filterKeys.map((fk: string) => {
			const updatedState = {} as any
			const updatedRoute = []
			
			if (updatedFilterState.hasOwnProperty(fk)) {
				updatedState[fk] = updatedFilterState[fk]
			}
			
			this.setState(updatedState)
			
			if (updatedState.filterCategory) {
				updatedRoute.push(updatedState.filterCategory ? updatedState.filterCategory.slug : 'all')
				
				this.props.history.replace(`/expert-marketplace/${updatedRoute.join('/')}`)
			}
			
			// if (updatedState.filterLocation || updatedState.filterBudget) {
			// 	updatedRoute.push(updatedState.filterLocation ? updatedState.filterLocation.value : 'global')
			// }
			//
			// if (updatedState.filterBudget) {
			// 	updatedRoute.push(`${updatedState.filterBudget.min}-${updatedState.filterBudget.max}`)
			// }
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.expertMarketplace
})

export default connect(mapStateToProps, {
	fetchExpertise
})(ExpertMarketplace)