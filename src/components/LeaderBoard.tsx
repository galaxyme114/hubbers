import * as React from 'react'
import { connect } from 'react-redux'
import { fetchLeaderboard } from '../actions/homepage'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { ContestLeaderBoardRecord } from '../constants/models'
import { RootState } from '../reducers/index'
import { State as LeaderBoardState } from '../reducers/leaderBoard'

export interface LeaderBoardProps {
	state: LeaderBoardState
	fetchLeaderboard: any
	contestId: string
}

export interface LeaderBoardState {
}

class LeaderBoard extends React.Component<LeaderBoardProps, LeaderBoardState> {
	
	public componentDidMount() {
		this.props.fetchLeaderboard(this.props.contestId)
	}
	
	public render() {
		const {state} = this.props
		
		return (
			<div>
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
						<div className="leaderboard-box">
							{
								(state.leaderboardList) && (state.leaderboardList.length === 0) && (
									<span className="empty-notice">There are no contestants for this contest yet.</span>
								)
							}
							{
								(state.leaderboardList) && (state.leaderboardList.length > 0) && (
									<div>
										<div className="leaderboard_header">
											<div className="header_tr">
												<div className="header-cell leftarrow_heading"/>
												<div className="header-cell countNumber_heading">Rank</div>
												<div className="header-cell username_heading"/>
												<div className="header-cell design_heading">Design</div>
												<div className="header-cell">Functionality</div>
												<div className="header-cell usability_heading">Usability</div>
												<div className="header-cell">Market Potential</div>
												<div className="header-cell">Average</div>
												<div className="header-cell trofy_heading"/>
											</div>
										</div>
										<div className="leaderboard_body">
											{
												state.leaderboardList.map((op: ContestLeaderBoardRecord, i: number) =>
													<div className="body_tr" key={i}>
														<div className="tr_cell leftarrow_td" data-header="">
															<div>
																{
																	((op.previousRank === 0 && op.currentRank > op.previousRank)
																		|| op.currentRank < op.previousRank) && <img src="/images/icon/up_arrow.png"/>}
																{
																	(op.previousRank > 0 && (op.previousRank < op.currentRank))
																	&& <img src="/images/icon/down_arrow.png"/>}
															</div>
														</div>
														<div className="tr_cell countNumber_td" data-header="Rank">
															{op.currentRank > 0 ? op.currentRank : '-'}
														</div>
														<div className="tr_cell username_td" data-header="">
															<div className="username_td_inner">
																<img src={op.thumbnailImageUrl}/>
																<div className="name">{op.fullName}</div>
															</div>
														</div>
														<div className="tr_cell design_td" data-header="Design">
															{ (op.rating && op.rating.design >= 0) ? op.rating.design.toFixed(2) : '-'}
														</div>
														<div className="tr_cell" data-header="Functionality">
															{ (op.rating && op.rating.functionality >= 0) ? op.rating.functionality.toFixed(2) : '-'}
														</div>
														<div className="tr_cell usability_td" data-header="Usability">
															{ (op.rating && op.rating.usability >= 0) ? op.rating.usability.toFixed(2) : '-'}
														</div>
														<div className="tr_cell" data-header="Market Potential">
															{ (op.rating && op.rating.marketPotential >= 0) ? op.rating.marketPotential.toFixed(2) : '-'}
														</div>
														<div className="tr_cell" data-header="Average"><strong>
															{ (op.rating && op.rating.average >= 0) ? op.rating.average.toFixed(2) : '-'}</strong></div>
														<div className="tr_cell trofy_td" data-header="">
															{op.currentRank > 0 && op.currentRank <= 3
															&& <div><img src={`/images/icon/standing-${op.currentRank}.png`}/></div>}
														</div>
													</div>
												)
											}
										</div>
									</div>
								)
							}
						</div>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.leaderBoard
})

export default connect(mapStateToProps, {
	fetchLeaderboard
})(LeaderBoard)