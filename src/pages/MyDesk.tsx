import * as React from 'react'
import { connect } from 'react-redux'
import { RouterProps } from 'react-router'

import { RootState } from '../reducers/index'
import CreatorDesk from './CreatorDesk'
import ExpertDesk from './ExpertDesk'
import { ActionTypeStates } from '../constants/action-types'
import Spinner from '../components/Spinner'

interface MyDeskProps extends RouterProps {
	authenticateState: any
}

class MyDesk extends React.Component<MyDeskProps, {}> {
	public render() {
		const {authenticateState} = this.props
		let isExpert = false
		
		if (authenticateState.user) {
			isExpert = authenticateState.user.role === 'expert' && authenticateState.user.expert
		}
		
		return (
			<div>
				{
					authenticateState.status === ActionTypeStates.INPROGRESS && (
						<div className="page-loading">
							<div>
								<Spinner name="three-dots" fadeIn="none"/>
							</div>
						</div>
					)
				}
				{
					authenticateState.status === ActionTypeStates.SUCCESS && isExpert && (
						<ExpertDesk {...this.props}/>
					)
				}
				{
					authenticateState.status === ActionTypeStates.SUCCESS && !isExpert && (
						<CreatorDesk {...this.props}/>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate
})

export default connect(mapStateToProps, {})(MyDesk)