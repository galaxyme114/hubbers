import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { ActionTypeStates } from '../constants/action-types'

import { fetchProfile } from '../actions/profile'
import { RootState } from '../reducers'
import { State as ProfileDataState } from '../reducers/profile'

import * as moment from 'moment'
import Spinner from '../components/Spinner'
import UserFollow from '../containers/UserFollow'

interface PublicProfileProps {
	state: ProfileDataState
	fetchProfile: any
	id: number
}

interface PublicProfileState {
}

class PublicUserProfile extends React.Component<PublicProfileProps, PublicProfileState> {
	public constructor(props: PublicProfileProps) {
		super(props)
		this.state = {}
	}
	
	public componentDidMount() {
		this.props.fetchProfile(this.props.id)
	}
	
	public componentWillReceiveProps(nextProps: PublicProfileProps) {
		if (this.props.id !== nextProps.id) {
			this.props.fetchProfile(nextProps.id)
		}
	}
	
	public render() {
		const {state} = this.props
		const profile = state.profile
		
		return (
			<div className="page-public-profile">
				<Helmet>
					<title>{(profile && profile.fullName) ? profile.fullName : 'Profile'} | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="public_profile">
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
						(state.status === ActionTypeStates.SUCCESS && profile) && (
							<div className="container">
								<div className="public_profile_row">
									<div className="public_profile_sidebar">
										<div className="public_profile_sidebar_topsection">
											<div className="sidebar_topsection_inner">
												<div className="thumbnail__image" style={{ backgroundImage: 'url(' + profile.thumbnailImageUrl + ')' }}/>
												<div className="sidebar_user_name">{profile.fullName}</div>
												{/*<div className="sidebar_user_address">{profile.address}</div>*/}
												<div className="sidebar_user_follows">
													<span className="user_follow">follows
														<span className="user_follow_count">{profile.followers.length}</span>
													</span>
													<span className="user_follow_seperater">|</span>
													<span className="user_following">following
														<span className="user_following_count">{profile.following.length}</span>
													</span>
												</div>
												<div className="followbtn"><UserFollow targetId={profile._id}/></div>
												{
													(profile && profile.innovationCategories.length > 0) && (
														<div className="user_interested">
															<label>Interested In</label>
															<div><span>{profile.innovationCategories.join(', ')}</span></div>
														</div>
													)
												}
												{
													(profile && profile.productCategories.length > 0) && (
														<div className="user_interested">
															<label>Technology Follow</label>
															<div><span>{profile.productCategories.join(', ')}</span></div>
														</div>
													)
												}
											</div>
										</div>
										<div className="public_profile_sidebar_bottom-section">
											<div className="bottom-section__inner_heading">Latest Activities</div>
											{
												(profile && profile.activities.length === 0) && <span>No recent activity</span>
											}
											{
												(profile && profile.activities.length > 0) &&
												profile.activities.splice(0, 5).map((activity: any, i: number) => (
													<div className="bottom-section__inner_content" key={i + activity.id}>
														<label>{activity.message}</label>
														<p>{moment(activity.time).format('DD.MM.YYYY')}</p>
													</div>
												))
											}
										</div>
									</div>
									
									<div className="public_profile_main_content">
										{
											// (profile && profile.projects.length > 1) && (
											// 	<div>
											// 		<div className="profile_main_content__project_title">Projects</div>
											// 		<div className="profile-contest-list__items">
											// 			{
											// 				profile.projects.map((p: any, i: number) => <ProjectTile key={i} {...p}/>)
											// 			}
											// 		</div>
											// 	</div>
											// )
										}
										
										{
											// (profile && profile.contests.length > 0) && (
											// 	<div>
											// 		<div className="profile_main_content__contents_title">Contests</div>
											// 		<div className="profile-contest-list__items">
											// 			{
											// 				profile.contests.map((c: any, i: number) => <ContestTile key={i} {...c} unLinkable={true}/>)
											// 			}
											// 		</div>
											// 	</div>
											// )
										}
									</div>
								</div>
							</div>
						)
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.profile
})

export default connect(mapStateToProps, {
	fetchProfile
})(PublicUserProfile)