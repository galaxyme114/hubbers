import * as React from 'react'
import { connect } from 'react-redux'

import { createProject } from '../actions/projects'
import { RootState } from '../reducers/index'
import Icon from './Icon'
import { ProjectRecord } from '../constants/models'
import { Link } from 'react-router-dom'

interface RegistrationCreateProjectProps {
	createProject: any
}

interface RegistrationCreateProjectState {
	projectName: string,
	projectNameValidation: any
}

class RegistrationCreateProject extends React.Component<RegistrationCreateProjectProps, RegistrationCreateProjectState> {
	public constructor(props: RegistrationCreateProjectProps) {
		super(props)
		
		this.state = {
			projectName: '',
			projectNameValidation: null
		}
	}
	
	public render() {
		const {} = this.state
		
		return (
			<div className="registration">
				<div>
					<h3 className="registration__title">Start your amazing project</h3>
					<div className="registration__inputs">
						<input
							className="form-input"
							name="registration-email"
							placeholder="Project Name"
							type="text"
							value={this.state.projectName}
							onChange={(e: any) => this.setState({projectName: e.target.value})}/>
					</div>
					<div className="registration__footer">
						<div className="registration__submit">
							<button
								className="btn btn-rounded btn-outline"
								disabled={this.state.projectName.length === 0}
								onClick={() => {
									this.props.createProject(this.state.projectName)
										.then((response: any) => response.payload.project)
										.then((project: ProjectRecord) => {
											window.location.href = `https://hubbers.io/projects/${project.shortId}/${project.slug}`
										})
								}}>
								Create Now
							</button>
						</div>
						<div className="registration__validation">
							<Link to={'/my-desk'}>Go to all projects <Icon name="chevron-right"/></Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, {
	createProject
})(RegistrationCreateProject)