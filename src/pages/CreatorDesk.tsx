import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouterProps } from 'react-router'
import { Link } from 'react-router-dom'

import { createProject } from '../actions/projects'
import Expertise from '../components/Expertise'
import Icon from '../components/Icon'
import ProjectCreateModal from '../components/ProjectCreateModal'
import { ExpertiseRecord, ProjectRecord } from '../constants/models'
import ProjectsList from '../containers/ProjectsList'
import { RootState } from '../reducers/index'

interface CreatorDeskProps extends RouterProps {
	createProject: any
}

class CreatorDesk extends React.Component<CreatorDeskProps, {}> {
	public render() {
		const ongoingTasks: ReadonlyArray<ExpertiseRecord> = []
		
		return (
			<div className="desk">
				<Helmet>
					<title>Creator Desk | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="desk-inner">
					{ /* Ongoing Tasks */
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
					
					{/* List of projects for a single user */}
					<ProjectsList/>
					
					{/* Pending Product Launch Assessment */}
					
					{/* Create a new project */}
					<div className="desk-section__wrap">
						<div className="desk-section desk-section--new-project">
							<div className="desk-section__content">
								<Icon name="paperplane"/>
								<h3>Start your project</h3>
								<p>
									Have an amazing project ? <br/>
									Just click on start a project and get access to great experts &amp; resources
								</p>
								<div className="cta">
									<button
										className="btn btn-rounded"
										onClick={() => {
											document.body.classList.add('show-project-create-modal')
										}}>
										Start your project
									</button>
								</div>
							</div>
							<div className="desk-section__footer">
								<Link to={'/product-launcher'}><Icon name="idea"/> Validate your idea</Link>
								<Link to={'/expert-marketplace'}><Icon name="find-expert"/> Find an expert</Link>
							</div>
						</div>
					</div>
					
					{/* New Project Modal */}
					<ProjectCreateModal onSubmit={(name: string, category: string) => {
						this.props.createProject(name)
							.then((response: any) => response.payload.project)
							.then((project: ProjectRecord) => {
								this.props.history.push(`/projects/${project.shortId}/${project.slug}`)
							})
					}}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, {
	createProject
})(CreatorDesk)