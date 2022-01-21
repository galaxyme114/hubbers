import { Range } from 'rc-slider'
import * as React from 'react'
import { doGetExpertiseCategory } from '../actions/categories'
import { doFetchProjects } from '../actions/projects'
import { InputType } from '../constants/enums'
import { ExpertiseCategoryRecord, ProjectRecord } from '../constants/models'
import Icon from './Icon'
import Input from './Input'

export interface BusinessNeedsCreateModalProps {
	project?: ProjectRecord
	onSubmit: any
}

export interface BusinessNeedsCreateModalState {
	project: ProjectRecord
	category: ExpertiseCategoryRecord
	description: string
	budgetMin: number
	budgetMax: number
	tags: string[]
}

export default class BusinessNeedsCreateModal
	extends React.Component<BusinessNeedsCreateModalProps, BusinessNeedsCreateModalState> {
	
	private static handleRootClick(e: any) {
		const isRoot = e.target.className === 'business-needs-create-modal'
		
		if (isRoot) {
			document.body.classList.remove('show-business-needs-create-modal')
		}
	}
	
	private static handleClose() {
		document.body.classList.remove('show-business-needs-create-modal')
	}
	
	public constructor(props: BusinessNeedsCreateModalProps) {
		super(props)
		
		this.state = {
			project: this.props.project || null,
			category: null,
			description: '',
			budgetMin: 500,
			budgetMax: 5000,
			tags: []
		}
	}
	
	public componentWillReceiveProps(nextProps: BusinessNeedsCreateModalProps) {
		if (nextProps.project) {
			this.setState({project: nextProps.project})
		}
	}
	
	public render() {
		const {onSubmit} = this.props
		const {project, category, description, budgetMin, budgetMax, tags} = this.state
		
		return (
			<div
				id="business-needs-create-modal"
				className="business-needs-create-modal"
				onClick={BusinessNeedsCreateModal.handleRootClick}>
				<div className="business-needs-create-modal__body">
					<h3 className="business-needs-create-modal__title">
						<Icon name="paperplane"/> Create a business need
					</h3>
					{
						(!this.props.project) && (
							<Input
								name="project"
								placeholder="Select Project"
								value={project}
								type={InputType.ASYNC_SELECT}
								options={doFetchProjects}
								onChange={(v: any) => this.setState({project: v})}/>
						)
					}
					<Input
						name="category"
						value={category}
						type={InputType.ASYNC_SELECT}
						placeholder="Select a category"
						options={doGetExpertiseCategory}
						onChange={(v: any) => {
							this.setState({category: v})
						}}/>
					<Input
						name="description"
						placeholder="Description"
						value={description}
						type={InputType.TEXTAREA}
						onChange={(v: string) => this.setState({description: v})}/>
					<div className="input span-1">
						<label>Budget</label>
						<div className="price-range">
							<span className="price-range__label">${budgetMin}</span>
							<Range
								allowCross={false}
								min={0}
								max={8000}
								defaultValue={[budgetMin, budgetMax]}
								onChange={(budget: any) => {
									this.setState({budgetMin: budget[0], budgetMax: budget[1]})
								}}/>
							<span className="price-range__label last">${budgetMax}</span>
						</div>
					</div>
					<Input
						name="tags"
						placeholder="Enter up to 5 tags"
						value={tags}
						type={InputType.TAGS}
						onChange={(v: any) => {
							this.setState({tags: v})
						}}/>
					<div className="business-needs-create-modal__actions">
						<button
							className="btn btn-rounded btn-outline"
							disabled={description.length === 0 || !category || !project || tags.length === 0}
							onClick={() => {
								BusinessNeedsCreateModal.handleClose()
								onSubmit({
									projectId: project._id,
									categoryId: category._id,
									description,
									tags: tags.join(','),
									budgetMin,
									budgetMax
								})
							}}>Create
						</button>
					</div>
				</div>
			</div>
		)
	}
}