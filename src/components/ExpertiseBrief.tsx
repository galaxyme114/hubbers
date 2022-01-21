import * as React from 'react'
import { InputType } from '../constants/enums'
import { BriefDataRecord, BriefTemplateFieldRecord, BriefTemplateRecord } from '../constants/models'
import { slugify } from '../utils/stringUtils'
import Input from './Input'

export interface ExpertiseBriefProps {
	briefTemplate: BriefTemplateRecord
	briefData: BriefDataRecord
	onSubmit: any
}

export interface ExpertiseBriefState {
	briefData: BriefDataRecord
}

export default class ExpertiseBrief extends React.Component<ExpertiseBriefProps, ExpertiseBriefState> {
	constructor(props: ExpertiseBriefProps) {
		super(props)
		
		this.state = {
			briefData: props.briefData
		}
	}
	
	public render() {
		const {briefTemplate} = this.props
		
		const renderBriefTemplateField = (f: BriefTemplateFieldRecord) => {
			const name = slugify(f.name)
			const span = (f.formType === InputType.TEXTAREA || name === 'name') ? 2 : 1
			let inputValue = {value: ''}
			
			if (this.state.briefData && this.state.briefData.fields) {
				const briefDataField = this.state.briefData.fields.find(bdf => bdf.name === name)
				if (briefDataField) {
					inputValue = briefDataField
				}
			}
			
			return (
				<Input
					key={name} name={name} placeholder={f.name}
					value={inputValue.value} type={f.formType} span={span}
					onChange={(v: string) => {
						this.updateBriefFieldData(name, v)
					}}
				/>
			)
		}
		
		return (
			<div>
				<div className="expertise-brief">
					<p className="expertise-brief__description">
						Enter the detail of your project so expert can give you an exact quotation.
					</p>
					
					<div className="expertise-brief__fields__wrap">
						<div className="expertise-brief__fields">
							{
								briefTemplate.fields.map(f => renderBriefTemplateField(f))
							}
							<div className="expertise-brief__fields__meta">
								<div className="expertise-brief__fields__nda">
									<label htmlFor="signNda">
										<input
											id="signNda" type="checkbox" checked={(this.state.briefData && this.state.briefData.nda) || false}
											onChange={(e) => this.updateNda(e.target.checked)}/>
										I accept the terms and conditions <a href="#">(view TOC)</a>
									</label>
								</div>
								
								<div className="expertise-brief__fields__submit">
									<button
										onClick={() => {
											this.props.onSubmit(this.state.briefData)
										}}
										disabled={!this.state.briefData || (this.state.briefData && !this.state.briefData.nda)}
										className="btn btn-rounded btn-outline">
										{
											!this.props.briefData && <span>Submit</span>
										}
										{
											this.props.briefData && <span>Save</span>
										}
									</button>
								</div>
							</div>
						</div>
						<div className="expertise-brief__attachments">
							<p className="expertise-brief__attachments__notice">
								Drag and drop your attachments or <u>select a file</u>
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private updateBriefFieldData(name: string, value: string) {
		let briefData = {...this.state.briefData}
		
		if (!briefData) {
			briefData = {nda: false, fields: [] as any}
		} else if (!briefData.fields) {
			briefData.fields = [] as any
		}
		
		const foundBriefField = briefData.fields.find(bdf => bdf.name === name)
		if (foundBriefField) {
			foundBriefField.value = value
		} else {
			briefData.fields.push({name, value})
		}
		
		this.setState({briefData})
	}
	
	private updateNda(isNdaChecked: boolean) {
		let briefData = {...this.state.briefData}
		
		if (!briefData) {
			briefData = {nda: false, fields: [] as any}
		}
		
		briefData.nda = isNdaChecked
		
		this.setState({briefData})
	}
}