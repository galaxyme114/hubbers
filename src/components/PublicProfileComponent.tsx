import * as React from 'react'
import * as moment from 'moment'
import Icon from './Icon'
import { ProfileRecord } from '../constants/models'
import { ActionTypeStates } from '../constants/action-types'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
export interface PublicProfileComponentProps {
	profileDetail: ProfileRecord
	stateProfile: any
}

export interface PublicProfileComponentState {
}

export default class PublicProfileComponent extends React.Component<PublicProfileComponentProps, PublicProfileComponentState> {
	public constructor(props: PublicProfileComponentProps) {
		super(props)
		
	}
	
	public render() {
		const { profileDetail, stateProfile } = this.props;
		return (
			<div id="public-profile-popover" className="public-profile-popover">
				<div className="tooltip-arrow"></div>
				<div className="public-profile-popover__body">
					{/* <div className="close-modal-icon" onClick={this.handleClose}><Icon name="close" /></div> */}
					{
						stateProfile === ActionTypeStates.INPROGRESS && (
							<div className="page-loading">
								<div>
									<em>Loading ...</em>
									<Spinner name="three-dots" fadeIn="none"/>
								</div>
							</div>
						)
					}
					
					{

						stateProfile !== ActionTypeStates.INPROGRESS && (
						<div className="public-profile__content">
							<div className="public-profile__content_row">
								<div className="public-profile__thumbnail" style={{ backgroundImage: 'url(' + profileDetail.thumbnailImageUrl + ')'}}></div>
								<div className="public-profile__main_containt">
									<div className="username">{profileDetail.fullName}</div>
									<div className="member-since">Member since {moment(profileDetail.createdAt).fromNow()}</div>
									<div className="user-location">Germany, Burlin Community </div>
									<div className="see-activity">See Activity </div>
								</div>
							</div>
							<div className="public-profile__content_bottom">
								<div className="send-message">
									<button> <img src="/images/icon/comment_icon_green.png" alt="" /> <span>Send Message</span></button>
								</div>
								<div className="view-profile">
									<Link to={`/profile/${profileDetail._id}/${profileDetail.fullName}`}>
									<button className="btn">View profile</button>
									</Link>
								</div>
							</div>
						</div>
						)
					}
				</div>
			</div>
		)
	}
	
	public handleRootClick(e: any) {
		// const isRoot = e.target.className === 'public-profile-modal'
		
		// if (isRoot) {
		// 	document.body.classList.remove('show-public-profile-modal')
		// }
	}
	
	public handleClose() {
		// document.body.classList.remove('show-public-profile-modal')
	}
}