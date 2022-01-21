import * as React from 'react'

import { InputType } from '../constants/enums'
import { ProjectRecord } from '../constants/models'
import { countries, languages, profileInnovationCategories, profileProductCategories } from '../constants/selectOptions'
import Icon from './Icon'
import ImageCropUpload from './ImageCropUpload'
import Input from './Input'

export interface ProjectDetailsStepProps {
	project: ProjectRecord
	onUpdate: any
}

export interface ProjectDetailsStepState {
	projectData: ProjectRecord
}

export default class ProjectDetailsStep extends React.Component<ProjectDetailsStepProps, ProjectDetailsStepState> {
	constructor(props: ProjectDetailsStepProps) {
		super(props)
		
		this.state = {
			projectData: props.project
		}
	}
	
	public render() {
		return (
			<div>
				<div className="project-details-step">
					<div className="project-details-step__fields__wrap">
						<div className="project-details-step__fields">
							<Input
								name="name"
								value={this.state.projectData.name}
								type={InputType.TEXT}
								label="Your great idea name"
								description=" Your project name is the first thing that outside world will see. make it attractive,
								descriptive, mysterious, easy to remember and short. Keep it under 100 characters. "
								placeholder="Project name ..."
								onChange={(v: string) => this.updateProjectData('name', v)}
								onFocusLost={() => {
									this.onFocusLost()
								}}/>
							<Input
								name="description"
								value={this.state.projectData.description}
								type={InputType.TEXTAREA}
								label="Describe your idea"
								description="Here you have to be more specific about your product. Give details about your product
								features, size, colors. Tell how you think your product will change the world or what
								you are going to bring that is different."
								placeholder="Project description ..."
								onChange={(v: string) => this.updateProjectData('description', v)}
								onFocusLost={() => {
									this.onFocusLost()
								}}/>
							<Input
								name="productCategory"
								value={this.state.projectData.productCategory}
								type={InputType.SELECT}
								label="Product Category"
								description="Please pick up the category that matches best your product idea.
								Select several categories if you think it fits to several product universe."
								placeholder="Choose a product category ..."
								options={profileProductCategories}
								simpleValue={true}
								onChange={(v: string) => this.updateProjectData('productCategory', v)}
								onFocusLost={() => {
									this.onFocusLost()
								}}/>
							<Input
								name="innovationCategory"
								value={this.state.projectData.innovationCategory}
								type={InputType.SELECT}
								label="Innovation Category"
								description="Innovation is where you are here. Select what type of innovation your product idea brings."
								placeholder="Choose an innovation category ..."
								options={profileInnovationCategories}
								simpleValue={true}
								onChange={(v: string) => this.updateProjectData('innovationCategory', v)}
								onFocusLost={() => {
									this.onFocusLost()
								}}/>
							<Input
								name="market"
								value={this.state.projectData.market}
								type={InputType.TEXTAREA}
								label="Market"
								description="Here you describe the people who according to you will say 'whoaou' to your project.
								How you see them: Age, gender, occupations. Reasons they will like it."
								placeholder="Market description ..."
								onChange={(v: string) => this.updateProjectData('market', v)}
								onFocusLost={() => {
									this.onFocusLost()
								}}/>
							<Input
								name="price"
								value={this.state.projectData.price}
								type={InputType.TEXT}
								label="Price (USD)"
								description="Here you can make some assumptions about what would look like a
								good market price for your target audience."
								placeholder=""
								onChange={(v: string) => this.updateProjectData('price', v)}
								onFocusLost={() => {
									this.onFocusLost()
								}}/>
							<Input
								name="geography"
								value={this.state.projectData.geography}
								type={InputType.SELECT}
								label="Geography"
								description="Where you want the team to be from?"
								placeholder="Choose a country ..."
								options={countries}
								onChange={(v: string) => this.updateProjectData('geography', v)}
								onFocusLost={() => {
									this.onFocusLost()
								}}/>
							<Input
								name="language"
								value={this.state.projectData.language}
								type={InputType.SELECT}
								label="Language"
								description="Which language you would prefer to deal with?"
								placeholder="Choose a language ..."
								options={languages}
								onChange={(v: string) => this.updateProjectData('language', v)}
								onFocusLost={() => {
									this.onFocusLost()
								}}/>
							{/* Submit */}
							<div className="project-details-step__submit">
								{
									this.state.projectData.state === 0.9 && (
										<div className="project-details-step__submit__progress">
											<Icon name="clock"/> Your project is currently being reviewed
										</div>
									)
								}
								
								<button
									disabled={!this.validateProjectDetail()}
									onClick={() => {
										this.updateProjectData('state', 0.9)
										setTimeout(() => {
											this.onFocusLost()
										}, 250)
									}}
									className="btn btn-rounded btn-outline">
									{this.state.projectData.state >= 0.9 ? 'Save' : 'Submit'}
								</button>
							</div>
						</div>
						<div className="project-details-step__attachments">
							<ImageCropUpload
								imageUrl={this.state.projectData.featuredImageUrl}
								onSubmit={(imageUrl: string) => {
									this.updateProjectData('featuredImageUrl', imageUrl)
									setTimeout(() => {
										this.onFocusLost()
									}, 250)
								}}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private validateProjectDetail() {
		let isValid = true
		const keys = ['name', 'description', 'product_category', 'innovation_category', 'market', 'geography', 'language']
		
		if (!this.state.projectData) {
			isValid = false
		} else {
			keys.map(k => {
				if (!(this.state.projectData as any)[k] || ((this.state.projectData as any)[k] instanceof Array
					&& (this.state.projectData as any)[k].length === 0)) {
					isValid = false
				}
			})
		}
		
		return isValid
	}
	
	private updateProjectData(name: string, value: any) {
		const projectData: any = {...this.state.projectData}
		projectData[name] = value
		
		this.setState({projectData})
	}
	
	private onFocusLost() {
		this.props.onUpdate(this.state.projectData)
	}
}