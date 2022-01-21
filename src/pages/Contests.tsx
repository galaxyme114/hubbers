import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import ContestTile from '../components/ContestTile'
import HeroBanner from '../components/HeroBanner'

import { fetchContests } from '../actions/homepage'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { ContestRecord } from '../constants/models'
import { State as HomeContestListState } from '../reducers/homeContestsList'
import { RootState } from '../reducers/index'

interface ContestsProps {
	state: HomeContestListState
	fetchContests: any
}

interface ContestsState {
}

class Contests extends React.Component<ContestsProps, ContestsState> {
	public componentDidMount() {
		this.props.fetchContests()
	}
	
	public render() {
		const {state} = this.props
		
		return (
			<div>
				<Helmet>
					<title>Contests | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-2.jpg"
					title="CONTESTS"
					caption=""
					description="Challenge your creativity and earn cash prize and royalties"
					cta={null}
					overlay={true}/>
				
				<div className="contest-list">
					<div className="container">
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
							state.status !== ActionTypeStates.INPROGRESS && (
								<div>
									<div className="contest-list__title">
										{state.contestsList.length} Ongoing Contests
									</div>
									<div className="contest-list__items">
										{
											state.contestsList.map((c: ContestRecord) => (
												<ContestTile key={c.shortId} {...c} />
											))
										}
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.homeContestsList
})

export default connect(mapStateToProps, {
	fetchContests
})(Contests)