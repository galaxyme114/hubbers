import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import ContestTile from '../components/ContestTile'
import HeroBanner from '../components/HeroBanner'

import { State as HomeContestListState } from '../reducers/homeContestsList'
import { RootState } from '../reducers/index'

import { fetchContests } from '../actions/homepage'
import { ContestRecord } from '../constants/models'

interface ContestantLandingProps extends RouteComponentProps<any> {
	stateContests: HomeContestListState
	fetchContests: any
}

class ContestantLanding extends React.Component<ContestantLandingProps, {}> {
	public componentDidMount() {
		this.props.fetchContests()
	}
	
	public render() {
		const {stateContests} = this.props
		
		return (
			<div className="page-contestant-landing">
				<Helmet>
					<title>Become a Contestant | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-1.jpg"
					title="COMPETITION"
					caption=""
					description="Join Hubbe.rs ongoing contests! Create and Win Prizes"
					cta={null}
					overlay={true}/>
				
				{/* Perks */}
				<div className="points-list">
					<div className="container">
						<div className="points-list__title">The perks of joining a Hubbers contest</div>
						<div className="points-list__subtitle">Create and Win Prizes</div>
						<div className="points-list__items">
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-1.png"/>
								<div className="points-list__item__title">Cash Prize</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-2.png"/>
								<div className="points-list__item__title">Royalties</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-3.png"/>
								<div className="points-list__item__title">Visibility</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-4.png"/>
								<div className="points-list__item__title">Product to market</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* How it works */}
				<div className="bullet-points-list">
					<div className="container">
						<div className="bullet-points-list__title">
							How does a competition work?
						</div>
						<ol className="bullet-points-list__items">
							<li className="bullet-points-list__item">
								All submitted entries can enter product development stage
							</li>
							<li className="bullet-points-list__item">
								Any entry can enter product development if pre-qualifies
							</li>
							<li className="bullet-points-list__item">
								Products are judged on 4 criteria <br/>[design, functionality, manufacturability, &amp; market
								potential].
							</li>
							<li className="bullet-points-list__item">
								All ideas are valued and rewarded with exposure on the platform
							</li>
							<li className="bullet-points-list__item">
								Best 3 entries receive a cash prize
							</li>
						</ol>
					</div>
				</div>
				
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-2.jpg"
					title="<small>BECOME A CONTESTANT</small>"
					caption=""
					description="Challenge your creativity, earn cash prize & royalties"
					onClick={() => {
						this.props.history.push('/signup/contestant')
					}}
					cta="Sign up Now"
					overlay={true}/>
				
				{/* Contests */}
				<div className="contest-list">
					<div className="container">
						<div className="contest-list__title">Put your idea in motion</div>
						<div className="contest-list__subtitle">and start with one of these product competitions:</div>
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
})(ContestantLanding)