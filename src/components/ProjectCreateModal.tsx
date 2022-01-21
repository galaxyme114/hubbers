import * as React from 'react'
import Input from './Input'
import { InputType } from '../constants/enums'
import Icon from './Icon'

export interface ProjectCreateModalProps {
	onSubmit: any
}

export interface ProjectCreateModalState {
	projectName: string
	projectCategory: string
	projectStage: string
}

export default class ProjectCreateModal extends React.Component<ProjectCreateModalProps, ProjectCreateModalState> {
	public constructor(props: ProjectCreateModalProps) {
		super(props)
		
		this.state = {
			projectName: '',
			projectCategory: '',
			projectStage: ''
		}
	}
	
	public render() {
		const {onSubmit} = this.props
		
		return (
			<div id="project-create-modal" className="project-create-modal" onClick={this.handleRootClick}>
				<div className="project-create-modal__body">
					<h3 className="project-create-modal__title">
						<Icon name="paperplane"/>
						Start your project
					</h3>
					<Input
						name="name"
						placeholder="Enter your name"
						value={this.state.projectName}
						type={InputType.TEXT}
						onChange={(v: string) => this.setState({projectName: v})}/>
					{/*<Input*/}
					{/*name="category"*/}
					{/*placeholder="Choose a category"*/}
					{/*value={this.state.projectCategory}*/}
					{/*type={InputType.TEXT}*/}
					{/*onChange={(v: string) => this.setState({ projectCategory: v })}/>*/}
					<div className="project-create-modal__actions">
						<button
							className="btn btn-rounded btn-outline"
							disabled={this.state.projectName.length === 0}
							onClick={() => {
								this.handleClose()
								onSubmit(this.state.projectName, this.state.projectCategory, this.state.projectStage)
							}}>Create
						</button>
					</div>
				</div>
			</div>
		)
	}
	
	private handleRootClick(e: any) {
		const isRoot = e.target.className === 'project-create-modal'
		
		if (isRoot) {
			document.body.classList.remove('show-project-create-modal')
		}
	}
	
	private handleClose() {
		document.body.classList.remove('show-project-create-modal')
	}
}