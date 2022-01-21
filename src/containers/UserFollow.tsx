import * as React from 'react'
import { connect } from 'react-redux'
import { authenticateUser } from '../actions/authenticate'
import { doCheckFollow, doFollow, doUnFollow } from '../actions/profile'
import { State as AuthenticateState } from '../reducers/authenticate'
import { RootState } from '../reducers/index'

import { ActionTypeStates } from '../constants/action-types'

export interface UserFollowProps {
	authenticateState: AuthenticateState
	authenticateUser: any
	targetId: string
}

interface UserFollowState {
	followingStatus: ActionTypeStates
	isFollow: boolean
}

class UserFollow extends React.Component<UserFollowProps, UserFollowState> {
	public constructor(props: UserFollowProps) {
		super(props)
		
		this.state = {
			followingStatus: ActionTypeStates.INPROGRESS,
			isFollow: false
		}
	}
	
	public componentDidMount() {
		// Check if the user is authenticated
		this.props.authenticateUser()
		
		doCheckFollow(this.props.targetId)
			.then((res: any) => {
				this.setState({followingStatus: ActionTypeStates.FAILED, isFollow: res.following})
			}).catch(() => {
			this.setState({followingStatus: ActionTypeStates.FAILED, isFollow: false})
		})
	}
	
	public render() {
		const {authenticateState} = this.props
		const {followingStatus, isFollow} = this.state
		
		return (
			<div>
				{
					authenticateState.user && !isFollow && (
						<button
							className="btn"
							disabled={followingStatus === ActionTypeStates.INPROGRESS}
							onClick={() => {
								this.submitFollow()
							}}>Follow</button>
					)
				}
				{
					authenticateState.user && isFollow && (
						<button
							className="btn"
							disabled={followingStatus === ActionTypeStates.INPROGRESS}
							onClick={() => {
								this.submitUnFollow()
							}}>Unfollow</button>
					)
				}
				{
					!authenticateState.user && (
						<button className="btn" disabled={true}>Follow</button>
					)
				}
			</div>
		)
	}
	
	private submitFollow() {
		this.setState({followingStatus: ActionTypeStates.INPROGRESS})
		
		doFollow(this.props.targetId)
			.then(() => {
				this.setState({followingStatus: ActionTypeStates.SUCCESS, isFollow: true})
			}).catch(() => {
			this.setState({followingStatus: ActionTypeStates.FAILED})
		})
	}
	
	private submitUnFollow() {
		doUnFollow(this.props.targetId)
			.then(() => {
				this.setState({followingStatus: ActionTypeStates.SUCCESS, isFollow: false})
			}).catch(() => {
			this.setState({followingStatus: ActionTypeStates.FAILED})
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {
	authenticateUser
})(UserFollow)