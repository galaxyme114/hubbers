import * as React from 'react'
import { connect } from 'react-redux'
import { RouterProps } from 'react-router'

import { Helmet } from 'react-helmet'
import { doCreateExpertise, fetchMyExpertise } from '../actions/expertise'
import Expertise from '../components/Expertise'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import { ExpertiseRecord } from '../constants/models'
import { State as ExpertDeskDataState } from '../reducers/expertDesk'
import { RootState } from '../reducers/index'
import { ActionTypeStates } from '../constants/action-types'

interface ExpertDeskProps extends RouterProps {
	state: ExpertDeskDataState
	fetchMyExpertise: any
}

interface ExpertDeskState {
	isCreatingExpertise: boolean
}

class ExpertDesk extends React.Component<ExpertDeskProps, ExpertDeskState> {
	public constructor(props: ExpertDeskProps) {
		super(props)
		
		this.state = {
			isCreatingExpertise: false
		}
	}
	
	public componentDidMount() {
		this.props.fetchMyExpertise()
	}
	
	public render() {
		const {state} = this.props
		const ongoingTasks: any = []
		
		return (
			<div className="desk">
				<Helmet>
					<title>Expert Desk | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="desk-inner">
					{
						ongoingTasks.length > 0 && (
							<div className="desk-section__wrap">
								<h2 className="desk-section__title">Ongoing Tasks</h2>
								<div className="desk-section">
									{
										ongoingTasks.map((ot: any) => <Expertise {...ot}/>)
									}
								</div>
							</div>
						)
					}
					<div className="desk-section__wrap">
						<h2 className="desk-section__title">My Expertise</h2>
						<div className="desk-section">
							{
								state.status === ActionTypeStates.INPROGRESS && (
									<div className="page-loading">
										<div>
											<Spinner name="three-dots" fadeIn="none"/>
										</div>
									</div>
								)
							}
							{
								state.status !== ActionTypeStates.INPROGRESS && (
									<div className="expertise-list">
										{
											state.myExpertise.length > 0 && state.myExpertise.map((me: ExpertiseRecord, i: number) =>
												<Expertise
													key={i}
													{...me}
													isMicro={true}
													onClick={() => {
														this.props.history.push(`/expertise/${me.shortId}/edit`)
													}}/>)
										}
										{
											state.myExpertise.length === 0 && (
												<span className="empty-notice">You have no expertise, create one below!</span>
											)
										}
									</div>
								)
							}
						</div>
					</div>
					
					{/* Create a new project */}
					<div className="desk-section__wrap">
						<div className="desk-section desk-section--new-project">
							<div className="desk-section__content">
								<Icon name="paperplane"/>
								<h3>Create a new Expertise</h3>
								{
									this.state.isCreatingExpertise && (
										<div className="page-loading">
											<div>
												<Spinner name="three-dots" fadeIn="none"/>
											</div>
										</div>
									)
								}
								{
									!this.state.isCreatingExpertise && (
										<div className="cta">
											<button
												className="btn btn-rounded"
												onClick={() => {
													this.createExpertise()
												}}>Create
											</button>
										</div>
									)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private createExpertise() {
		this.setState({isCreatingExpertise: true})
		
		doCreateExpertise()
			.then((expertise: ExpertiseRecord) => {
				this.setState({isCreatingExpertise: false})
				this.props.history.push(`/expertise/${expertise.shortId}/edit`)
			}).catch(() => {
			this.setState({isCreatingExpertise: false})
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.expertDesk
})

export default connect(mapStateToProps, {
	fetchMyExpertise
})(ExpertDesk)