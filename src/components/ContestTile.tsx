import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { doLikeContest } from '../actions/homepage'
import { ContestRecord } from '../constants/models'
import { RootState } from '../reducers'
import { State as AuthenticateState } from '../reducers/authenticate'
import { formattedDuration } from '../utils/dates'
import FloatingShare from './FloatingShare'
import Icon from './Icon'

export interface ContestTileProps extends ContestRecord {
	unLinkable?: boolean
	authenticateState: AuthenticateState
}

export interface ContestTileState {
}

class ContestTile extends React.Component<ContestTileProps, ContestTileState> {
	public static doLike(contestId: string) {
		const data = { like: true }
		return doLikeContest(contestId, data)
	}
	
	public constructor(props: ContestTileProps) {
		super(props)
		
		this.state = {}
	}

	public render() {
		const {authenticateState} = this.props
		const {
			_id, shortId, slug, name, featuredImageUrl, likes, sharesCount, likesCount, viewCount, endTime, duration,
			numContestants, numJudges, memberApplication, unLinkable
		} = this.props
		
		const daysToGoFormatted = formattedDuration(endTime, duration)
		
		let memberApplicationType = null
		let memberApplicationStatus = null
		
		if (memberApplication) {
			memberApplicationType = memberApplication.type.toUpperCase()
			if (memberApplication.type === 'judge') {
				memberApplicationStatus = memberApplication.isPending ?
					'/images/contest-judging-pending.png' : '/images/contest-judging.png'
			} else if (memberApplication.type === 'contestant') {
				memberApplicationStatus = memberApplication.isPending ?
					'/images/contest-participating-pending.png' : '/images/contest-participating.png'
			}
		}
		
		return (
			<div className={'contest-tile__wrap ' + (unLinkable ? 'unlink' : '')}>
				<Link to={'/contests/' + shortId + '/'}>
					<div className="contest-tile">
						<div className="contest-tile__image" style={{backgroundImage: 'url(' + featuredImageUrl + ')'}}>
							
						</div>
						<div className="contest-tile__info">
							<div className={'contest-tile__info__meta ' +
							((memberApplicationType && memberApplicationStatus) ? 'contest-tile__info__meta--padding' : '')}>
								<div className="contest-tile__name">{name}</div>
								<div className="contest-tile__date">{daysToGoFormatted}</div>
								<div className="contest-tile__info__title">
									{numContestants} CONTESTANTS &nbsp; &nbsp; &nbsp; {numJudges} JUDGES
								</div>
								<div className="contest-tile__details">
									<div className="contest-tile__stats">
										<div className="contest-tile__stats--view"><Icon name="eye"/> {viewCount}</div>
										{
											(authenticateState.user)  &&
											likes.indexOf(authenticateState.user._id) === -1 &&
											<div
												className="contest-tile__stats--likes"
												onClick={() => {ContestTile.doLike(_id)}}>
												<Icon name="heart-empty"/> {likesCount}
											</div>
										}
										{
											(authenticateState.user)  &&
											likes.indexOf(authenticateState.user._id) !== -1 &&
											<div
												className="contest-tile__stats--likes"
												onClick={(e: any) => {
													e.preventDefault()
												}}>
												<Icon name="heart"/> {likesCount}
											</div>
										}
										{
											(!authenticateState.user) &&
											<div
												className="contest-tile__stats--likes">
												<Icon name="heart-empty"/> {likesCount}
											</div>
										}
										<FloatingShare
											shareURL={'https://hubbers.io/contests/' + shortId + '/' + slug + '?_escaped_fragment_='}>
											<div className="contest-tile__stats--shares"><Icon name="share"/> {sharesCount}</div>
										</FloatingShare>
									</div>
								</div>
							</div>
							{/* {
								(memberApplicationType && memberApplicationStatus) && (
									<div className="contest-tile__info__application">
										<img src={memberApplicationStatus}/>
										<span>{memberApplicationType}</span>
									</div>
								)
							} */}
						</div>
					</div>
				</Link>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {})(ContestTile)