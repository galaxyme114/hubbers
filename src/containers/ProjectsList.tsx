import * as React from 'react'
import { connect } from 'react-redux'

import { fetchProjects } from '../actions/projects'
import ProjectTile from '../components/ProjectTile'
import { ActionTypeStates } from '../constants/action-types'
import { ProjectRecord } from '../constants/models'
import { RootState } from '../reducers/index'
import { State as ProjectsListDataState } from '../reducers/projectsList'

const Spinner = require('react-spinkit')

export interface ProjectsListProps {
	state: ProjectsListDataState
	fetchProjects: any
}

class ProjectsList extends React.Component<ProjectsListProps, {}> {
	public componentDidMount() {
		this.props.fetchProjects()
	}
	
	public render() {
		const {state} = this.props
		
		return (
			<div className="desk-section__wrap">
				<h2 className="desk-section__title">
					My Projects
					{
						(state.status === ActionTypeStates.INPROGRESS && state.projectsList.length > 0) &&
						<Spinner name="three-dots" fadeIn="none"/>
					}
				</h2>
				<div className="desk-section">
					{
						(state.projectsList.length > 0) &&
						state.projectsList.map((op: ProjectRecord) => <ProjectTile key={op._id} {...op}/>)
					}
					{
						(state.status === ActionTypeStates.INPROGRESS && state.projectsList.length === 0) &&
						<Spinner name="three-dots" fadeIn="none"/>
					}
					{
						(state.status === ActionTypeStates.SUCCESS && state.projectsList.length === 0) &&
						<span className="empty-notice">You have no projects</span>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.projectsList
})

export default connect(mapStateToProps, {
	fetchProjects
})(ProjectsList)