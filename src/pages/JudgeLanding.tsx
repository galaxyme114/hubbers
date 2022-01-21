import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import ContestTile from '../components/ContestTile'
import HeroBanner from '../components/HeroBanner'

import { State as HomeContestListState } from '../reducers/homeContestsList'
import { RootState } from '../reducers/index'

import { fetchContests } from '../actions/homepage'
import { ContestRecord } from '../constants/models'

interface JudgeLandingProps {
	stateContests: HomeContestListState
	fetchContests: any
}

class JudgeLanding extends React.Component<JudgeLandingProps, {}> {
	public componentDidMount() {
		this.props.fetchContests()
	}
	
	public render() {
		const {stateContests} = this.props
		
		return (
			<div className="page-judge-landing">
				<Helmet>
					<title>Become a Judge | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-1.jpg"
					title="BECOME A JUDGE"
					caption=""
					description="Use your expertise, judge competitions, & help to build the creator community"
					cta={null}
					overlay={true}/>
				
				{/* Perks */}
				<div className="points-list">
					<div className="container">
						<div className="points-list__title">The perks of becoming a Hubbe.rs Judges</div>
						<div className="points-list__items">
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-1.png"/>
								<div className="points-list__item__title">Networking</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-2.png"/>
								<div className="points-list__item__title">Visibility</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-3.png"/>
								<div className="points-list__item__title">First to market opportunity</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-4.png"/>
								<div className="points-list__item__title">Earning $$</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* Signup */}
				<div className="creative-hub">
					<div className="container">
						<div className="creative-hub__title">Sign up if you are an expert in your field</div>
						
						<div className="creative-hub__items">
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-a-creator.png)'
									}}/>
								<div className="creative-hub__item__caption">I&amp;D</div>
							</div>
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-an-expert.png)'
									}}/>
								<div className="creative-hub__item__caption">Tech Reporter</div>
							</div>
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-an-investor.png)'
									}}/>
								<div className="creative-hub__item__caption">Distributors / Investors</div>
							</div>
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-a-freelancer.png)'
									}}/>
								<div className="creative-hub__item__caption">Design Expert</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* Duties */}
				<div className="bullet-points-list">
					<div className="container">
						<div className="bullet-points-list__title">
							Duties and opportunities of a Hubbe.rs Judge
						</div>
						<ol className="bullet-points-list__items">
							<li className="bullet-points-list__item">
								Mark each contestant on 4 criteria <br/>[design, functions, manufacturability, &amp; market]
							</li>
							<li className="bullet-points-list__item">
								Get the opportunity to be the first to see, the ﬁrst to understand new ideas and new designs.
							</li>
							<li className="bullet-points-list__item">
								Support the best talents and products ideas to reach the market
							</li>
							<li className="bullet-points-list__item">
								Any entry can enter product development if pre-qualifies.
							</li>
							<li className="bullet-points-list__item">
								Gain visibility and recognition from industry experts, distributors investors, tech reporters
							</li>
						</ol>
					</div>
				</div>
				
				{/* Contests */}
				<div className="contest-list">
					<div className="container">
						<div className="contest-list__title">
							What are you waiting for? <br/> START WITH ONE OF THESE PRODUCT COMPETITIONS
						</div>
						<div className="contest-list__items">
							{
								stateContests.contestsList.map((c: ContestRecord, index: number) => (
									<ContestTile key={index} {...c} />
								))
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	stateContests: state.homeContestsList
})

export default connect(mapStateToProps, {
	fetchContests
})(JudgeLanding)